import { InvoiceRepository } from '~/repositories'
import type { IInvoiceListParams, IInvoicePayload } from '~/views/invoices/domain'

export function useInvoiceApi() {
  const { $api } = useNuxtApp()

  const invoiceRepo = new InvoiceRepository($api)

  return {
    list: (params?: IInvoiceListParams) => invoiceRepo.list(params),
    show: (id: string) => invoiceRepo.show(id),
    create: (payload: IInvoicePayload) => invoiceRepo.create(payload),
    update: (id: string, payload: IInvoicePayload) => invoiceRepo.update(id, payload)
  }
}
