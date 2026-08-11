import { normalizeApiError } from '~/services'
import type { IInvoice, IInvoiceListParams } from '~/views/invoices/domain'
import { useInvoiceApi } from '~/views/invoices/api/useInvoiceApi'

const DEFAULT_PER_PAGE = 15

export function useInvoices(params: IInvoiceListParams = {}) {
  const invoiceApi = useInvoiceApi()

  const page = ref(params.page ?? 1)
  const perPage = ref(params.per_page ?? DEFAULT_PER_PAGE)

  const { data, status, error: rawError, refresh } = useAsyncData(
    'invoices',
    () => invoiceApi.list({ page: page.value, per_page: perPage.value }),
    { watch: [page, perPage] }
  )

  const invoices = computed<IInvoice[]>(() => data.value?.data ?? [])
  const meta = computed(() => data.value?.meta ?? null)

  const total = computed(() => meta.value?.total ?? 0)
  const lastPage = computed(() => meta.value?.last_page ?? 1)
  const hasNextPage = computed(() => page.value < lastPage.value)
  const hasPrevPage = computed(() => page.value > 1)

  const isLoading = computed(() => status.value === 'pending')
  const error = computed(() => rawError.value ? normalizeApiError(rawError.value) : null)

  function setPage(value: number) {
    page.value = Math.min(Math.max(1, value), lastPage.value)
  }

  function setPerPage(value: number) {
    perPage.value = value
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
