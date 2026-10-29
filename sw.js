// VEST-POL — service worker: aplikacja otwiera się szybko i działa jej „szkielet” bez internetu.
// Dane (zamówienia, statusy) zawsze pobierane są na żywo z serwera — nie są zapisywane w pamięci telefonu.
const WERSJA = 'vestpol-v10';
const PLIKI = ['./', 'index.html', 'config.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-64.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(WERSJA).then(c => c.addAll(PLIKI)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== WERSJA).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                              // zapytania do serwera danych — zawsze sieć
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;                    // czcionki itp. — przeglądarka sama
  const strona = req.mode === 'navigate' || /\/(index\.html|config\.js)?$/.test(url.pathname);
  if (strona) {                                                  // najpierw sieć (zawsze najnowsza wersja), bez sieci — kopia
    e.respondWith(fetch(req).then(r => { const k = r.clone(); caches.open(WERSJA).then(c => c.put(req, k)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else {                                                       // ikony itp. — z pamięci
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  }
});
