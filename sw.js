const C = "ghost-chat-v3";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(["./", "ghost-icon.svg"]).catch(() => {}))); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const x = r.clone(); caches.open(C).then(c => c.put(e.request, x)); return r; }).catch(() => caches.match(e.request)));
});
self.addEventListener("notificationclick", e => {
  e.notification.close(); const d = e.notification.data || {};
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => {
    if (l.length) { l[0].postMessage(d); return l[0].focus(); }
    return self.clients.openWindow("./");
  }));
});
