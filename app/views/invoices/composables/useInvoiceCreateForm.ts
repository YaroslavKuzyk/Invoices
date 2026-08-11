import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  EInvoiceCurrency,
  EInvoiceStatus,
  invoiceCreateSchema,
  round2,
  type IInvoice,
  type IInvoicePayload,
  type InvoiceCreateFormValues
} from '~/views/invoices/domain'
import { useInvoiceMutations } from '~/views/invoices/composables/useInvoiceMutations'

interface IOptions {
  onCreated?: (invoice: IInvoice) => void
}

export function useInvoiceCreateForm(options: IOptions = {}) {
  const { createInvoice, isSubmitting, error, resetError } = useInvoiceMutations()

  const form = useForm<InvoiceCreateFormValues>({
    validationSchema: toTypedSchema(invoiceCreateSchema),
    initialValues: {
      number: '',
      supplier_name: '',
      supplier_tax_id: '',
      currency: EInvoiceCurrency.UAH,
      status: EInvoiceStatus.PENDING,
      issue_date: '',
      due_date: ''
    }
  })

  const grossAmount = computed(() => {
    const net = Number(form.values.net_amount)
    const vat = Number(form.values.vat_amount)

    if (!Number.isFinite(net) || !Number.isFinite(vat)) return 0

    return round2(net + vat)
  })

  const canSubmit = computed(() => !isSubmitting.value)

  const onSubmit = form.handleSubmit(async (values) => {
    const payload: IInvoicePayload = {
      ...values,
      gross_amount: grossAmount.value
    }

    const created = await createInvoice(payload)

    if (!created) {
      if (Object.keys(error.value?.fields ?? {}).length) {
        form.setErrors(error.value!.fields)
      }
      return
    }

    options.onCreated?.(created)
  })

  return {
    form,
    grossAmount,
    isSubmitting,
    canSubmit,
    error,
    resetError,
    onSubmit
  }
}
