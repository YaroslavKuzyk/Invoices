import { z } from 'zod'
import { EInvoiceCurrency, EInvoiceStatus } from './invoice.types'

const round2 = (value: number) => Math.round(value * 100) / 100

export const invoiceSchema = z.object({
  number: z.string().min(1, 'Number is required').max(255),
  supplier_name: z.string().min(1, 'Supplier name is required').max(255),
  supplier_tax_id: z.string().min(1, 'Supplier tax ID is required').max(255),
  net_amount: z.number().gt(0, 'Net amount must be greater than 0'),
  vat_amount: z.number().min(0, 'VAT amount cannot be negative'),
  gross_amount: z.number(),
  currency: z.nativeEnum(EInvoiceCurrency),
  status: z.nativeEnum(EInvoiceStatus),
  issue_date: z.string().min(1, 'Issue date is required'),
  due_date: z.string().min(1, 'Due date is required'),
})
  .refine(
    values => round2(values.net_amount + values.vat_amount) === round2(values.gross_amount),
    { message: 'Gross amount must equal net amount plus VAT amount', path: ['gross_amount'] }
  )
  .refine(
    values => values.due_date >= values.issue_date,
    { message: 'Due date must be on or after issue date', path: ['due_date'] }
  )

export type InvoiceFormValues = z.infer<typeof invoiceSchema>
