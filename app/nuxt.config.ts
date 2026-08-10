import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
    }
  },

  imports: {
    dirs: [
      'views/*/api',
      'views/*/stores'
    ]
  },

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  components: [
    { path: '~/components/System', pathPrefix: false, ignore: ['**/*.types.ts', '**/*.test.ts'] },
    '~/components',
  ],

  css: ['~/assets/styles/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true
  },

  ssr: true
})
