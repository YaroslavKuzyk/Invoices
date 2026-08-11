<template>
  <form
    class="flex flex-col gap-md rounded-md border border-border p-md"
    novalidate
    @submit="onSubmit"
  >
    <AppAlert v-if="bannerError" title="Could not create invoice">
      {{ bannerError }}
    </AppAlert>

    <div class="grid grid-cols-1 gap-md sm:grid-cols-2">
      <AppInput v-model="number" label="Number" :error="errors.number" />

      <AppSelect
        v-model="currency"
        label="Currency"
        :options="CURRENCY_OPTIONS"
        :error="errors.currency"
      />

      <AppInput
        v-model="supplierName"
        label="Supplier name"
        :error="errors.supplier_name"
      />

      <AppInput
        v-model="supplierTaxId"
        label="Supplier tax ID"
        :error="errors.supplier_tax_id"
      />

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
        v-model="issueDate"
        label="Issue date"
        type="date"
        :error="errors.issue_date"
      />

      <AppInput
        v-model="dueDate"
        label="Due date"
        type="date"
        :min="issueDate"
        :error="errors.due_date"
      />

      <AppSelect
        v-model="status"
        label="Status"
        :options="STATUS_OPTIONS"
        :error="errors.status"
      />
    </div>

    <div
      class="flex flex-wrap items-center justify-between gap-sm border-t border-divider pt-md"
    >
      <div class="flex flex-col gap-3xs">
        <span class="text-sm text-text-tertiary">Gross amount</span>
        <span class="text-xl font-semibold tabular-nums">
          {{ formatMoney(grossAmount, currency) }}
        </span>
      </div>

      <div class="flex items-center gap-sm">
        <AppButton variant="secondary" @click="router.back()">
          Cancel
        </AppButton>

        <AppButton type="submit" :disabled="!canSubmit" :loading="isSubmitting">
          {{ isSubmitting ? "Creating…" : "Create invoice" }}
        </AppButton>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { formatMoney } from "~/services";
import { useInvoiceCreateForm } from "~/views/invoices/composables/useInvoiceCreateForm";
import {
  EInvoiceCurrency,
  EInvoiceStatus,
  type IInvoice,
} from "~/views/invoices/domain";

const emit = defineEmits<{ created: [invoice: IInvoice] }>();

const router = useRouter();

const CURRENCY_OPTIONS = Object.values(EInvoiceCurrency).map((value) => ({
  value,
  label: value,
}));

const STATUS_LABELS: Record<EInvoiceStatus, string> = {
  [EInvoiceStatus.PENDING]: "Pending",
  [EInvoiceStatus.APPROVED]: "Approved",
  [EInvoiceStatus.REJECTED]: "Rejected",
};

const STATUS_OPTIONS = Object.values(EInvoiceStatus).map((value) => ({
  value,
  label: STATUS_LABELS[value],
}));

const { form, grossAmount, isSubmitting, canSubmit, error, onSubmit } =
  useInvoiceCreateForm({
    onCreated: (invoice) => emit("created", invoice),
  });

const { value: number } = useField<string>("number");
const { value: supplierName } = useField<string>("supplier_name");
const { value: supplierTaxId } = useField<string>("supplier_tax_id");
const { value: netAmount } = useField<number>("net_amount");
const { value: vatAmount } = useField<number>("vat_amount");
const { value: currency } = useField<EInvoiceCurrency>("currency");
const { value: status } = useField<EInvoiceStatus>("status");
const { value: issueDate } = useField<string>("issue_date");
const { value: dueDate } = useField<string>("due_date");

const errors = form.errors;

const bannerError = computed(() => {
  if (!error.value) return null;
  return Object.keys(error.value.fields).length ? null : error.value.message;
});
</script>
