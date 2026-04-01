// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-gtag'
  ],

  // Static site generation
  ssr: true,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      meta: [
        { name: 'google-site-verification', content: '4-d9r3XTP5yGCKCvrgjhcxI4Rh3ml1SZS4eoKG1OBEA' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  // Site config — used by all SEO modules
  site: {
    url: 'https://kiteaventure.ca',
    name: 'Kite Aventure'
  },

  gtag: {
    id: process.env.GTAG_ID
  },

  compatibilityDate: '2025-01-15',
  nitro: {
    preset: 'static'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // i18n config
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-CA', name: 'Français', file: 'fr-CA.json' },
      { code: 'en', language: 'en-CA', name: 'English', file: 'en-CA.json' }
    ],
    defaultLocale: 'fr',
    langDir: '../i18n/locales',
    strategy: 'prefix_except_default',
    baseUrl: 'https://kiteaventure.ca',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  },

  // Schema.org structured data — LocalBusiness for Google local results
  schemaOrg: {
    identity: {
      '@type': 'SportsActivityLocation',
      'name': 'Kite Aventure',
      'description': 'École de kitesurf et agence de voyages kite à Québec',
      'url': 'https://kiteaventure.ca',
      'address': {
        streetAddress: '...',
        addressLocality: 'Québec',
        addressRegion: 'QC',
        postalCode: 'G1...',
        addressCountry: 'CA'
      },
      'telephone': '+1-418-XXX-XXXX',
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 46.8139,
        'longitude': -71.2080
      },
      'image': '/og-default.jpg',
      'sameAs': [
        'https://facebook.com/...',
        'https://instagram.com/...'
      ]
    }
  }
})
