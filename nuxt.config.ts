import { defineLocalBusiness } from 'nuxt-schema-org/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',

  // Static site generation
  ssr: true,
  nitro: {
    preset: 'static'
  },

  // Modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/fonts'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  // Site config — used by all SEO modules
  site: {
    url: 'https://kiteaventure.ca',
    name: 'Kite Aventure'
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
    identity: defineLocalBusiness({
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
        latitude: 46.8139,
        longitude: -71.2080
      },
      'image': '/og-default.jpg',
      'sameAs': [
        'https://facebook.com/...',
        'https://instagram.com/...'
      ]
    })
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})