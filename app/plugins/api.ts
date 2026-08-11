import type { $Fetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const baseURL = (import.meta.server ? config.apiBase : config.public.apiBase) as string

  const api = $fetch.create({
    baseURL,

    onRequest({ options }) {
      options.headers = new Headers(options.headers)
    },

    onResponseError({ response }) {
      if (import.meta.client && response.status === 401) {
        // TODO: refresh / redirect to login
      }
    }
  })

  return {
    provide: { api: api as $Fetch }
  }
})
