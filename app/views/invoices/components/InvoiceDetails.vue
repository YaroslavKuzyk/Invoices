<template>
  <dl
    class="grid grid-cols-1 gap-md rounded-md border border-border p-md sm:grid-cols-2"
  >
    <div v-for="row in rows" :key="row.label" class="flex flex-col gap-3xs">
      <dt class="text-sm text-text-tertiary">
        {{ row.label }}
      </dt>
      <dd
        class="text-text-primary"
        :class="row.strong ? 'text-lg font-semibold' : ''"
      >
        {{ row.value }}
      </dd>
    </div>
  </dl>
</template>

<script lang="ts" setup>
import { formatDate, formatMoney } from "~/services";
import type { IInvoice } from "~/views/invoices/domain";

const props = defineProps<{ invoice: IInvoice }>();

const rows = computed(() => [
  { label: "Number", value: props.invoice.number },
  { label: "Currency", value: props.invoice.currency },
  { label: "Supplier", value: props.invoice.supplier_name },
  { label: "Supplier tax ID", value: props.invoice.supplier_tax_id },
  {
    label: "Net amount",
    value: formatMoney(props.invoice.net_amount, props.invoice.currency),
  },
  {
    label: "VAT amount",
    value: formatMoney(props.invoice.vat_amount, props.invoice.currency),
  },
  {
    label: "Gross amount",
    value: formatMoney(props.invoice.gross_amount, props.invoice.currency),
    strong: true,
  },
  { label: "Issue date", value: formatDate(props.invoice.issue_date) },
  { label: "Due date", value: formatDate(props.invoice.due_date) },
]);
</script>
