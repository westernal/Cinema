

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
    swSrc: 'sw.js',
  },
})

module.exports = {
  images: {
      domains: ['m.media-amazon.com'],
  },
}

