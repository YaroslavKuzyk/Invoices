import { z } from 'zod'
import { EInvoiceCurrency, EInvoiceStatus } from './invoice.types'

export const round2 = (value: number) => Math.round(value * 100) / 100

export const invoiceCreateSchema = z.object({
  number: z.string().min(1, 'Number is required').max(255),
  supplier_name: z.string().min(1, 'Supplier name is required').max(255),
  supplier_tax_id: z.string().min(1, 'Supplier tax ID is required').max(255),
  net_amount: z
    .number({ invalid_type_error: 'Net amount is required' })
    .gt(0, 'Net amount must be greater than 0'),
  vat_amount: z
    .number({ invalid_type_error: 'VAT amount is required' })
    .min(0, 'VAT amount cannot be negative'),
  currency: z.nativeEnum(EInvoiceCurrency),
  status: z.nativeEnum(EInvoiceStatus),
  issue_date: z.string().min(1, 'Issue date is required'),
  due_date: z.string().min(1, 'Due date is required'),
}).refine(
  values => values.due_date >= values.issue_date,
  { message: 'Due date must be on or after issue date', path: ['due_date'] }
)

export type InvoiceCreateFormValues = z.infer<typeof invoiceCreateSchema>

export function createInvoiceEditSchema(issueDate: string) {
  return z.object({
    net_amount: z
      .number({ invalid_type_error: 'Net amount is required' })
      .gt(0, 'Net amount must be greater than 0'),
    vat_amount: z
      .number({ invalid_type_error: 'VAT amount is required' })
      .min(0, 'VAT amount cannot be negative'),
    due_date: z.string().min(1, 'Due date is required'),
  }).refine(
    values => !issueDate || values.due_date >= issueDate,
    { message: 'Due date must be on or after issue date', path: ['due_date'] }
  )
}

export type InvoiceEditFormValues = z.infer<ReturnType<typeof createInvoiceEditSchema>>
