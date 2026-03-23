/* Root-Seite: Redirect nach Sprach-Erkennung.
   Dies ist ein SERVER-Component (kein "use client"!) —
   damit wird der Code NICHT in shared JS-Chunks gebündelt.
   Die Spracherkennung passiert über ein Inline-Script. */

export default function RootRedirect() {
  return (
    <>
      {/* Inline-Script für Spracherkennung — wird NICHT von Next.js gebündelt */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var locales = ["de", "en", "fr", "es"];
              var path = window.location.pathname;
              if (path !== "/" && path !== "") return;
              try {
                var saved = localStorage.getItem("preferred-locale");
                if (saved && locales.indexOf(saved) !== -1) {
                  window.location.replace("/" + saved + "/");
                  return;
                }
              } catch(e) {}
              var langs = navigator.languages || [navigator.language];
              for (var i = 0; i < langs.length; i++) {
                var lang = langs[i].split("-")[0].toLowerCase();
                if (locales.indexOf(lang) !== -1) {
                  window.location.replace("/" + lang + "/");
                  return;
                }
              }
              window.location.replace("/de/");
            })();
          `,
        }}
      />
      {/* Noscript-Fallback */}
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/de/" />
      </noscript>
      <p style={{ textAlign: "center", marginTop: "40vh", color: "#697B7B" }}>
        Weiterleitung...
      </p>
    </>
  );
}
