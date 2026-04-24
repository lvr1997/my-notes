const CACHE_NAME = 'vitepress-static-v20260424'
const CACHEABLE_STATIC_EXT = /\.(png|jpg|jpeg|webp|svg|gif|ico|woff|woff2|ttf)$/i

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
          return Promise.resolve()
        })
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  // 只缓存图片/字体，不接管 JS/CSS/HTML，避免构建后 chunk 版本错配
  if (!CACHEABLE_STATIC_EXT.test(url.pathname)) return

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached
      return fetch(req).then((res) => {
        if (!res || res.status !== 200) return res
        const copy = res.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy))
        return res
      })
    })
  )
})
