import { normalizeApiError } from '~/services'
import type { IInvoice, IInvoiceListParams } from '~/views/invoices/domain'
import { useInvoiceApi } from '~/views/invoices/api/useInvoiceApi'
import { useInvoicesListQuery } from '~/views/invoices/composables/useInvoicesListQuery'

const DEFAULT_PER_PAGE = 15

const MAX_PER_PAGE = 100

function toPositiveInt(value: unknown, fallback: number, max?: number): number {
  const parsed = Number(Array.isArray(value) ? value[0] : value)

  if (!Number.isInteger(parsed) || parsed < 1) return fallback

  return max ? Math.min(parsed, max) : parsed
}

export function useInvoices(params: IInvoiceListParams = {}) {
  const invoiceApi = useInvoiceApi()
  const route = useRoute()
  const router = useRouter()
  const { rememberListQuery } = useInvoicesListQuery()

  const page = ref(toPositiveInt(route.query.page, params.page ?? 1))
  const perPage = ref(toPositiveInt(route.query.per_page, params.per_page ?? DEFAULT_PER_PAGE, MAX_PER_PAGE))

  const paginationQuery = computed(() => ({
    ...route.query,
    page: page.value > 1 ? String(page.value) : undefined,
    per_page: perPage.value === DEFAULT_PER_PAGE ? undefined : String(perPage.value)
  }))

  watch(paginationQuery, (query) => {
    router.replace({ query })
    rememberListQuery(query)
  })

  rememberListQuery(paginationQuery.value)

  const { data, status, error: rawError, refresh } = useAsyncData(
    'invoices',
    () => invoiceApi.list({ page: page.value, per_page: perPage.value }),
    { watch: [page, perPage] }
  )

  const invoices = computed<IInvoice[]>(() => data.value?.data ?? [])
  const meta = computed(() => data.value?.meta ?? null)

  const total = computed(() => meta.value?.total ?? 0)
  const lastPage = computed(() => meta.value?.last_page ?? 1)
  const from = computed(() => meta.value?.from ?? 0)
  const to = computed(() => meta.value?.to ?? 0)
  const hasNextPage = computed(() => page.value < lastPage.value)
  const hasPrevPage = computed(() => page.value > 1)

  watch(lastPage, (value) => {
    if (page.value > value) page.value = value
  })

  const isLoading = computed(() => status.value === 'pending')
  const error = computed(() => rawError.value ? normalizeApiError(rawError.value) : null)

  function setPage(value: number) {
    page.value = Math.min(Math.max(1, value), lastPage.value)
  }

  function setPerPage(value: number) {
    perPage.value = Math.min(Math.max(1, value), MAX_PER_PAGE)
    page.value = 1
  }

  function nextPage() {
    if (hasNextPage.value) page.value += 1
  }

  function prevPage() {
    if (hasPrevPage.value) page.value -= 1
  }

  return {
    invoices,
    meta,
    page: readonly(page),
    perPage: readonly(perPage),
    total,
    lastPage,
    from,
    to,
    hasNextPage,
    hasPrevPage,
    isLoading,
    error,
    setPage,
    setPerPage,
    nextPage,
    prevPage,
    refresh
  }
}
