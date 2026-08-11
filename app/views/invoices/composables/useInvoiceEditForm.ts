import type { Ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  EInvoiceStatus,
  createInvoiceEditSchema,
  round2,
  type IInvoice,
  type IInvoicePayload,
  type InvoiceEditFormValues
} from '~/views/invoices/domain'
import { useInvoiceMutations } from '~/views/invoices/composables/useInvoiceMutations'

interface IOptions {
  onSaved?: (invoice: IInvoice) => void
}

export function useInvoiceEditForm(invoice: Ref<IInvoice | null>, options: IOptions = {}) {
  const { updateInvoice, isSubmitting, error, resetError } = useInvoiceMutations()

  const isEditable = computed(() => invoice.value?.status === EInvoiceStatus.PENDING)

  const validationSchema = computed(() =>
    toTypedSchema(createInvoiceEditSchema(invoice.value?.issue_date ?? ''))
  )

  const form = useForm<InvoiceEditFormValues>({
    validationSchema,
    initialValues: {
      net_amount: 0,
      vat_amount: 0,
      due_date: ''
    }
  })

  watch(invoice, (value) => {
    if (!value) return

    form.resetForm({
      values: {
        net_amount: Number(value.net_amount),
        vat_amount: Number(value.vat_amount),
        due_date: value.due_date
      }
    })
  }, { immediate: true })

  const grossAmount = computed(() => {
    const net = Number(form.values.net_amount)
    const vat = Number(form.values.vat_amount)

    if (!Number.isFinite(net) || !Number.isFinite(vat)) return 0

    return round2(net + vat)
  })

  const canSubmit = computed(() => isEditable.value && form.meta.value.dirty && !isSubmitting.value)

  const onSubmit = form.handleSubmit(async (values) => {
    const current = invoice.value

    if (!current || !isEditable.value) return

    const payload: IInvoicePayload = {
      number: current.number,
      supplier_name: current.supplier_name,
      supplier_tax_id: current.supplier_tax_id,
      net_amount: values.net_amount,
      vat_amount: values.vat_amount,
      gross_amount: grossAmount.value,
      currency: current.currency,
      status: current.status,
      issue_date: current.issue_date,
      due_date: values.due_date
    }

    const updated = await updateInvoice(current.id, payload)

    if (!updated) {
      if (Object.keys(error.value?.fields ?? {}).length) {
        form.setErrors(error.value!.fields)
      }
      return
    }

    options.onSaved?.(updated)
  })

  return {
    form,
    grossAmount,
    isEditable,
    isSubmitting,
    canSubmit,
    error,
    resetError,
    onSubmit
  }
}
