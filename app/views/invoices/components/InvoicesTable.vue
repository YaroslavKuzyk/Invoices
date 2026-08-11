<template>
  <div class="overflow-x-auto rounded-md border border-border">
    <table class="w-full border-collapse text-left text-sm">
      <thead class="bg-surface text-text-secondary">
        <tr>
          <th class="px-md py-sm font-medium">Number</th>
          <th class="px-md py-sm font-medium">Supplier</th>
          <th class="px-md py-sm text-right font-medium">Gross amount</th>
          <th class="px-md py-sm font-medium">Status</th>
          <th class="px-md py-sm font-medium">Due date</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="invoice in props.invoices"
          :key="invoice.id"
          class="border-t border-divider"
        >
          <td class="px-md py-sm font-medium">
            <NuxtLink :to="`/invoices/${invoice.id}`" class="app-link">
              {{ invoice.number }}
            </NuxtLink>
          </td>
          <td class="px-md py-sm text-text-secondary">
            {{ invoice.supplier_name }}
          </td>
          <td class="px-md py-sm text-right whitespace-nowrap tabular-nums">
            {{ formatMoney(invoice.gross_amount, invoice.currency) }}
          </td>
          <td class="px-md py-sm">
            <InvoiceStatusBadge :status="invoice.status" />
          </td>
          <td class="px-md py-sm whitespace-nowrap text-text-secondary">
            {{ formatDate(invoice.due_date) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { formatDate, formatMoney } from "~/services";
import type { IInvoice } from "~/views/invoices/domain";
import InvoiceStatusBadge from "./InvoiceStatusBadge.vue";

const props = defineProps<{ invoices: IInvoice[] }>();
</script>
