import type { IHomeStat } from '../domain'

export function useHome() {
  const title = ref('Nuxt 4 + Tailwind')

  const stats = computed<IHomeStat[]>(() => [
    { id: 'views', title: 'Views', value: '1' },
    { id: 'components', title: 'System components', value: '2' },
    { id: 'layouts', title: 'Layouts', value: '1' },
  ])

  return {
    title,
    stats,
  }
}
