// عامل الخدمة: يجعل التطبيق قابلاً للتثبيت على الهاتف ويفتح دون إنترنت، ويعرض الإشعارات.
// صفحات التطبيق تُجلب من الشبكة أولاً (لتصل التحديثات فوراً) ومن النسخة المخزنة عند انقطاع الاتصال.
const CACHE = 'alawi-v2';
const SHELL = ['./', 'index.html', 'firebase-config.js', 'manifest.webmanifest', 'assets/college-logo-192.png', 'assets/college-logo.webp', 'assets/favicon-64.png', 'assets/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  const own = url.origin === location.origin;
  // مكتبات Firebase والخطوط ثابتة الإصدار: من المخزن أولاً
  const lib = /^(www\.gstatic\.com|fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)$/.test(url.hostname);
  if (!own && !lib) return;
  if (lib) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)) } return res })));
    return;
  }
  e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)) } return res })
    .catch(() => caches.match(req).then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()))));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = new URL(e.notification.data?.url || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const w = list.find(c => c.url.startsWith(self.registration.scope));
    return w ? w.focus() : self.clients.openWindow(target);
  }));
});
