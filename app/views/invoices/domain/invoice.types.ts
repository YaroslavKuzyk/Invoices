import type { IPaginated, IPaginationParams } from '~/domain'

export enum EInvoiceStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum EInvoiceCurrency {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR',
}

export interface IInvoice {
  id: string
  number: string
  supplier_name: string
  supplier_tax_id: string
  net_amount: string
  vat_amount: string
  gross_amount: string
  currency: EInvoiceCurrency
  status: EInvoiceStatus
  issue_date: string
  due_date: string
  created_at: string
  updated_at: string
}

export interface IInvoicePayload {
  number: string
  supplier_name: string
  supplier_tax_id: string
  net_amount: number
  vat_amount: number
  gross_amount: number
  currency: EInvoiceCurrency
  status: EInvoiceStatus
  issue_date: string
  due_date: string
}

export type IInvoiceListParams = IPaginationParams

export type IInvoiceList = IPaginated<IInvoice>

export interface IInvoiceRepository {
  list(params?: IInvoiceListParams): Promise<IInvoiceList>
  show(id: string): Promise<IInvoice>
  create(payload: IInvoicePayload): Promise<IInvoice>
  update(id: string, payload: IInvoicePayload): Promise<IInvoice>
}
