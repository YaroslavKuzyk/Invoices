import type { LocationQueryRaw } from 'vue-router'

const LIST_PATH = '/invoices'

export function useInvoicesListQuery() {
  const listQuery = useState<LocationQueryRaw>('invoices-list-query', () => ({}))

  const listRoute = computed(() => ({ path: LIST_PATH, query: listQuery.value }))

  function rememberListQuery(query: LocationQueryRaw) {
    listQuery.value = query
  }

  return {
    listQuery,
    listRoute,
    rememberListQuery
  }
}
