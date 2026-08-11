import type { MaybeRefOrGetter } from 'vue'
import { EInvoiceStatus } from '~/views/invoices/domain'
import { normalizeApiError } from '~/services'
import { useInvoiceApi } from '~/views/invoices/api/useInvoiceApi'

export function useInvoice(id: MaybeRefOrGetter<string>) {
  const invoiceApi = useInvoiceApi()

  const invoiceId = computed(() => toValue(id))

  const { data: invoice, status, error: rawError, refresh } = useAsyncData(
    computed(() => `invoice-${invoiceId.value}`),
    () => invoiceApi.show(invoiceId.value),
    { watch: [invoiceId] }
  )

  const isLoading = computed(() => status.value === 'pending')
  const error = computed(() => rawError.value ? normalizeApiError(rawError.value) : null)
  const isEditable = computed(() => invoice.value?.status === EInvoiceStatus.PENDING)

  return {
    invoice,
    isLoading,
    isEditable,
    error,
    refresh
  }
}
