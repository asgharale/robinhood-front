export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',
    onRequest({ options }) {
      options.headers.set('Accept-Language', nuxtApp.$i18n.locale.value)
    },
  })

  return { provide: { api } }
})