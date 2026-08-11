<template>
  <section class="app-container flex flex-col gap-lg">
    <NuxtLink
      :to="listRoute"
      class="app-link inline-flex w-fit items-center gap-3xs text-sm"
    >
      <ArrowLeft class="size-4" />
      Back to invoices
    </NuxtLink>

    <AppLoader v-if="isLoading && !invoice" />

    <AppAlert
      v-else-if="error"
      :title="error.isNotFound ? 'Invoice not found' : 'Could not load invoice'"
    >
      <span>{{ error.message }}</span>
      <div v-if="!error.isNotFound" class="pt-xs">
        <AppButton variant="secondary" @click="refresh()">
          Try again
        </AppButton>
      </div>
    </AppAlert>

    <template v-else-if="invoice">
      <header class="flex flex-wrap items-center justify-between gap-sm">
        <div class="flex items-center gap-sm">
          <h1 class="text-2xl font-semibold">
            {{ invoice.number }}
          </h1>
          <InvoiceStatusBadge :status="invoice.status" />
        </div>

        <span class="text-sm text-text-tertiary">
          Last updated {{ formatDateTime(invoice.updated_at) }}
        </span>
      </header>

      <InvoiceDetails :invoice="invoice" />

      <InvoiceEditForm :invoice="invoice" @saved="onSaved" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { ArrowLeft } from "lucide-vue-next";
import { formatDateTime } from "~/services";
import { useInvoice } from "~/views/invoices/composables/useInvoice";
import { useInvoicesListQuery } from "~/views/invoices/composables/useInvoicesListQuery";
import {
  InvoiceDetails,
  InvoiceEditForm,
  InvoiceStatusBadge,
} from "~/views/invoices/components";

const route = useRoute();

const { listRoute } = useInvoicesListQuery();

const invoiceId = computed(() => String(route.params.id));

const { invoice, isLoading, error, refresh } = useInvoice(invoiceId);

function onSaved() {
  return navigateTo(listRoute.value);
}

useHead(() => ({
  title: invoice.value ? `Invoice ${invoice.value.number}` : "Invoice",
}));
</script>
