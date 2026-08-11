import type { IApiError } from '~/domain'
import type { IInvoice, IInvoicePayload } from '~/views/invoices/domain'
import { normalizeApiError } from '~/services'
import { useInvoiceApi } from '~/views/invoices/api/useInvoiceApi'

export function useInvoiceMutations() {
  const invoiceApi = useInvoiceApi()

  const isSubmitting = ref(false)
  const error = ref<IApiError | null>(null)

  async function submit(request: () => Promise<IInvoice>): Promise<IInvoice | null> {
    isSubmitting.value = true
    error.value = null

    try {
      return await request()
    } catch (e: unknown) {
      error.value = normalizeApiError(e)
      return null
    } finally {
      isSubmitting.value = false
    }
  }

  const createInvoice = (payload: IInvoicePayload) => submit(() => invoiceApi.create(payload))

  const updateInvoice = (id: string, payload: IInvoicePayload) => submit(() => invoiceApi.update(id, payload))

  function resetError() {
    error.value = null
  }

  return {
    isSubmitting: readonly(isSubmitting),
    error: readonly(error),
    createInvoice,
    updateInvoice,
    resetError
  }
}
