<template>
  <form
    class="flex flex-col gap-md rounded-md border border-border p-md"
    novalidate
    @submit="onSubmit"
  >
    <div class="flex flex-col gap-3xs">
      <h2 class="text-lg font-semibold">Edit invoice</h2>
      <p class="text-sm text-text-tertiary">
        Gross amount is recalculated automatically from net and VAT.
      </p>
    </div>

    <AppAlert v-if="!isEditable" variant="warning" title="Editing is locked">
      Only invoices with status <em>pending</em> can be edited.
    </AppAlert>

    <AppAlert
      v-else-if="bannerError"
      variant="danger"
      :title="
        error?.isConflict
          ? 'Invoice is no longer editable'
          : 'Could not save changes'
      "
    >
      {{ bannerError }}
    </AppAlert>

    <fieldset
      class="grid grid-cols-1 gap-md sm:grid-cols-3"
      :disabled="!isEditable"
    >
      <AppInput
        v-model="netAmount"
        label="Net amount"
        type="number"
        step="0.01"
        min="0"
        :error="errors.net_amount"
      />

      <AppInput
        v-model="vatAmount"
        label="VAT amount"
        type="number"
        step="0.01"
        min="0"
        :error="errors.vat_amount"
      />

      <AppInput
        v-model="dueDate"
        label="Due date"
        type="date"
        :min="props.invoice.issue_date"
        :error="errors.due_date"
      />
    </fieldset>

    <div
      class="flex flex-wrap items-center justify-between gap-sm border-t border-divider pt-md"
    >
      <div class="flex flex-col gap-3xs">
        <span class="text-sm text-text-tertiary">Gross amount</span>
        <span class="text-xl font-semibold tabular-nums">
          {{ formatMoney(grossAmount, props.invoice.currency) }}
        </span>
      </div>

      <AppButton type="submit" :disabled="!canSubmit" :loading="isSubmitting">
        {{ isSubmitting ? "Saving…" : "Save changes" }}
      </AppButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { formatMoney } from "~/services";
import { useInvoiceEditForm } from "~/views/invoices/composables/useInvoiceEditForm";
import type { IInvoice } from "~/views/invoices/domain";

const props = defineProps<{ invoice: IInvoice }>();

const emit = defineEmits<{ saved: [invoice: IInvoice] }>();

const invoiceRef = computed(() => props.invoice);

const {
  form,
  grossAmount,
  isEditable,
  isSubmitting,
  canSubmit,
  error,
  onSubmit,
} = useInvoiceEditForm(invoiceRef, {
  onSaved: (invoice) => emit("saved", invoice),
});

const { value: netAmount } = useField<number>("net_amount");
const { value: vatAmount } = useField<number>("vat_amount");
const { value: dueDate } = useField<string>("due_date");

const errors = form.errors;

const bannerError = computed(() => {
  if (!error.value) return null;
  return Object.keys(error.value.fields).length ? null : error.value.message;
});
</script>
