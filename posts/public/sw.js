const CACHE_NAME = 'vitepress-v1'

// 安装
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

// 激活
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    )
  )
  self.clients.claim()
})

// 请求拦截
self.addEventListener('fetch', (event) => {
  const req = event.request

  if (req.method !== 'GET') return

  const url = new URL(req.url)

  // 👉 1. HTML：Network First（保证更新）
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy))
          return res
        })
        .catch(() => caches.match(req))
    )
    return
  }

  // 👉 2. 静态资源：Cache First（极快）
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        return (
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy))
            return res
          })
        )
      })
    )
    return
  }

  // 👉 3. 其他请求：直接走网络
})
