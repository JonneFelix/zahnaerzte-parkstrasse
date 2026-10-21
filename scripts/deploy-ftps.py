"""Spiegelt den statischen Export (out/) per FTPS in den Webspace bei Andre Hotzler.

Der FTP-Server (vsftpd) verlangt auf der Datenverbindung TLS-Session-Reuse und nach
Uploads ein sauberes TLS-Ende. lftp und curl hängen daran, Pythons ftplib nicht.

Aufruf: FTP_HOST=… FTP_USER=… FTP_PASSWORD=… python3 scripts/deploy-ftps.py out [--dry-run]
"""

import argparse
import ftplib
import hashlib
import io
import json
import os
import posixpath
import re
import ssl
import sys
import time
from pathlib import Path

MANIFEST = ".deploy-manifest.json"
TMP_PREFIX = ".deploytmp-"
# Gleiche Muster wie die Sperre in public/.htaccess: so etwas darf nie hochgeladen werden.
BLOCKED = re.compile(r"(?i)(^\.|\.(php[0-9]?|pht|phtml|phps|phar|cgi|fcgi|shtml?|stm)(\.|$)|\.(inc|pl|py|sh)$)")
REDIRECT_PATTERN = r"(?i)\.(php[0-9]?|pht|phtml|phps|phar|cgi|fcgi|shtml?|stm)(\.|/|$)"
PHP_BLOCK = (
    f'<FilesMatch "{BLOCKED.pattern}">',
    "Require all denied",
    "</FilesMatch>",
    f'RedirectMatch 403 "{REDIRECT_PATTERN}"',
)
# Alte Assets bleiben eine Weile liegen, damit gecachte Seiten sie noch laden können.
ASSET_RETENTION_SECONDS = 7 * 24 * 3600
# vsftpd-Format von LIST; der Name beginnt nach genau einem Leerzeichen und bleibt unverändert.
LIST_LINE = re.compile(
    r"^([-d])[-rwxsStT]{9}\s+\d+\s+\S+\s+\S+\s+\d+\s+\w{3}\s+\d{1,2}\s+(?:\d{1,2}:\d{2}|\d{4}) (.+)$"
)


class ReusingFTP_TLS(ftplib.FTP_TLS):
    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if getattr(self, "_prot_p", False):
            conn = self.context.wrap_socket(
                conn, server_hostname=self.host, session=getattr(self.sock, "session", None)
            )
        return conn, size


def has_php_block(htaccess: bytes) -> bool:
    # Die Sperre muss vor allen anderen Direktiven stehen, also auch außerhalb von <IfModule>.
    lines = (line.strip() for line in htaccess.decode("utf-8", "replace").splitlines())
    directives = [line for line in lines if line and not line.startswith("#")]
    return directives[: len(PHP_BLOCK)] == list(PHP_BLOCK)


def connect() -> ReusingFTP_TLS:
    ctx = ssl.create_default_context()
    # Mit TLS 1.3 kommt das Session-Ticket zu spät für vsftpds Reuse-Prüfung.
    ctx.maximum_version = ssl.TLSVersion.TLSv1_2
    ftp = ReusingFTP_TLS(context=ctx, timeout=60)
    ftp.connect(os.environ["FTP_HOST"], 21)
    ftp.login(os.environ["FTP_USER"], os.environ["FTP_PASSWORD"])
    ftp.prot_p()
    return ftp


def local_files(root: Path) -> dict[str, str]:
    files = {}
    for path in sorted(root.rglob("*")):
        rel = path.relative_to(root).as_posix()
        if path.is_symlink():
            sys.exit(f"Symlink im Export: {rel}")
        if any(part != part.strip() or not part.isprintable() for part in rel.split("/")):
            sys.exit(f"Dateiname mit Leer- oder Steuerzeichen am Rand: {rel!r}")
        if not path.is_file():
            continue
        if rel != ".htaccess" and BLOCKED.search(path.name):
            sys.exit(f"Gesperrte Datei im Export: {rel}")
        files[rel] = hashlib.sha256(path.read_bytes()).hexdigest()
    if not has_php_block((root / ".htaccess").read_bytes()):
        sys.exit("out/.htaccess enthält die PHP-Sperre nicht, Abbruch")
    return files


def remote_tree(ftp: ftplib.FTP, base: str) -> tuple[set[str], set[str]]:
    files: set[str] = set()
    dirs: set[str] = set()

    def walk(rel: str) -> None:
        lines: list[str] = []
        ftp.cwd(posixpath.join(base, rel) if rel else base)
        ftp.retrlines("LIST -a", lines.append)
        for line in lines:
            if line.startswith("total "):
                continue
            m = LIST_LINE.match(line)
            if not m:
                sys.exit(f"Unbekannter Eintrag im Ziel, bitte von Hand prüfen: {line!r}")
            kind, name = m.groups()
            if name in (".", ".."):
                continue
            child = posixpath.join(rel, name) if rel else name
            if kind == "d":
                dirs.add(child)
                walk(child)
            else:
                files.add(child)

    walk("")
    return files, dirs


def read_remote(ftp: ftplib.FTP, path: str) -> bytes:
    buf = io.BytesIO()
    ftp.retrbinary(f"RETR {path}", buf.write)
    return buf.getvalue()


def put_atomic(ftp: ftplib.FTP, base: str, rel: str, data: io.BufferedIOBase, known_dirs: set[str]) -> None:
    parent, name = posixpath.split(rel)
    missing = []
    while parent and parent not in known_dirs:
        missing.append(parent)
        parent = posixpath.dirname(parent)
    for d in reversed(missing):
        ftp.mkd(posixpath.join(base, d))
        known_dirs.add(d)
    # Der Punkt am Anfang hält halbe Uploads per .htaccess-Sperre aus dem Web heraus.
    tmp = posixpath.join(base, posixpath.dirname(rel), f"{TMP_PREFIX}{name}")
    ftp.storbinary(f"STOR {tmp}", data)
    ftp.rename(tmp, posixpath.join(base, rel))


def write_manifest(ftp: ftplib.FTP, base: str, files: dict, retired: dict, known_dirs: set[str]) -> None:
    data = json.dumps({"files": files, "retired": retired}, indent=0).encode()
    put_atomic(ftp, base, MANIFEST, io.BytesIO(data), known_dirs)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("export", type=Path)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    base = os.environ.get("FTP_DIR", "/htdocs/new2017")
    if not re.fullmatch(r"/htdocs/[A-Za-z0-9._-]+", base):
        sys.exit(f"FTP_DIR muss ein Docroot unter /htdocs/ sein, nicht {base!r}")

    local = local_files(args.export)
    ftp = connect()
    ftp.cwd(base)
    if ftp.pwd() != base:
        sys.exit(f"Ziel aufgelöst zu {ftp.pwd()!r} statt {base!r}, Abbruch")
    remote, remote_dirs = remote_tree(ftp, base)
    if ".htaccess" in remote and not has_php_block(read_remote(ftp, posixpath.join(base, ".htaccess"))):
        sys.exit("Die .htaccess im Ziel enthält die PHP-Sperre nicht, Abbruch")

    manifest = json.loads(read_remote(ftp, posixpath.join(base, MANIFEST))) if MANIFEST in remote else {}
    # Erstes Format war ein flaches {Pfad: Hash}.
    known = manifest.get("files", manifest)
    retired_before = manifest.get("retired", {})

    stale_tmp = sorted(f for f in remote if posixpath.basename(f).startswith(TMP_PREFIX))
    remote -= set(stale_tmp)
    uploads = [rel for rel, digest in local.items() if rel not in remote or known.get(rel) != digest]
    # Erst die Sperre, dann die Assets, zuletzt die Seiten, die auf neue Assets verweisen.
    uploads.sort(key=lambda rel: (rel != ".htaccess", not rel.startswith("_next/"), rel))

    now = int(time.time())
    deletes, retired = [], {}
    for rel in sorted(remote - local.keys() - {MANIFEST}):
        since = retired_before.get(rel, now)
        if rel.startswith("_next/") and now - since < ASSET_RETENTION_SECONDS:
            retired[rel] = since
        else:
            deletes.append(rel)
    keep_parents = set()
    for rel in [*local, *retired]:
        parent = posixpath.dirname(rel)
        while parent:
            keep_parents.add(parent)
            parent = posixpath.dirname(parent)
    # Tiefste Ordner zuerst, sonst scheitert RMD an noch vorhandenen Unterordnern.
    empty_dirs = sorted(remote_dirs - keep_parents, key=lambda d: -d.count("/"))

    print(f"Ziel {base}: {len(local)} Dateien lokal, {len(remote)} im Ziel")
    print(
        f"Hochladen: {len(uploads)}, löschen: {len(deletes)} Dateien und {len(empty_dirs)} Ordner, "
        f"alte Assets vorgehalten: {len(retired)}, Temp-Reste: {len(stale_tmp)}"
    )
    for rel in deletes:
        print(f"  - {rel}")
    for d in empty_dirs:
        print(f"  - {d}/")
    if args.dry_run:
        ftp.quit()
        return

    known_dirs = set(remote_dirs)
    for rel in stale_tmp:
        ftp.delete(posixpath.join(base, rel))
    # Bricht der Lauf ab, fehlen die betroffenen Dateien im Manifest und werden beim
    # nächsten Lauf neu hochgeladen, statt anhand alter Hashes übersprungen zu werden.
    # Wieder benutzte Assets verlieren ihr altes Ausmusterungsdatum schon jetzt.
    touched = set(uploads) | set(deletes)
    write_manifest(
        ftp,
        base,
        {k: v for k, v in known.items() if k not in touched},
        {k: v for k, v in retired_before.items() if k not in local},
        known_dirs,
    )
    for i, rel in enumerate(uploads, 1):
        with open(args.export / rel, "rb") as f:
            put_atomic(ftp, base, rel, f, known_dirs)
        if i % 100 == 0:
            print(f"  {i}/{len(uploads)} hochgeladen")
    for rel in deletes:
        ftp.delete(posixpath.join(base, rel))
    for d in empty_dirs:
        ftp.rmd(posixpath.join(base, d))
    write_manifest(ftp, base, local, retired, known_dirs)
    ftp.quit()
    print("Deploy OK")


if __name__ == "__main__":
    main()
