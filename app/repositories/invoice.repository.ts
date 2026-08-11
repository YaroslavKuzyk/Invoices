import type { $Fetch } from 'ofetch'
import type {
  IInvoice,
  IInvoiceList,
  IInvoiceListParams,
  IInvoicePayload,
  IInvoiceRepository
} from '~/views/invoices'

export class InvoiceRepository implements IInvoiceRepository {
  constructor(private readonly api: $Fetch) {}

  list(params: IInvoiceListParams = {}) {
    return this.api<IInvoiceList>('/invoices', {
      query: params
    })
  }

  show(id: string) {
    return this.api<IInvoice>(`/invoices/${id}`)
  }

  create(payload: IInvoicePayload) {
    return this.api<IInvoice>('/invoices', {
      method: 'POST',
      body: payload
    })
  }

  update(id: string, payload: IInvoicePayload) {
    return this.api<IInvoice>(`/invoices/${id}`, {
      method: 'PUT',
      body: payload
    })
  }
}
