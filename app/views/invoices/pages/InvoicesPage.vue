<template>
  <section class="app-container flex flex-col gap-lg">
    <header class="flex flex-wrap items-start justify-between gap-sm">
      <div class="flex flex-col gap-3xs">
        <h1 class="text-2xl font-semibold">Invoices</h1>
        <p class="text-sm text-text-tertiary">
          <template v-if="total">
            {{ total }} invoice{{ total === 1 ? "" : "s" }}
          </template>
        </p>
      </div>

      <AppButton @click="goToCreate"> New invoice </AppButton>
    </header>

    <AppLoader v-if="isLoading && !invoices.length" />

    <AppAlert v-else-if="error" title="Could not load invoices">
      <span>{{ error.message }}</span>
      <div class="pt-xs">
        <AppButton variant="secondary" @click="refresh()">
          Try again
        </AppButton>
      </div>
    </AppAlert>

    <div
      v-else-if="!total"
      class="flex flex-col items-center gap-sm rounded-md border border-dashed border-border p-2xl text-center text-text-tertiary"
    >
      <span>No invoices yet.</span>
      <AppButton variant="secondary" @click="goToCreate">
        Create the first one
      </AppButton>
    </div>

    <template v-else>
      <InvoicesTable v-if="invoices.length" :invoices="invoices" />

      <div
        v-else
        class="rounded-md border border-dashed border-border p-2xl text-center text-text-tertiary"
      >
        This page is empty.
      </div>

      <div class="flex flex-wrap items-center justify-between gap-md">
        <span class="text-sm text-text-secondary">
          Showing {{ from }}–{{ to }} of {{ total }}
        </span>

        <AppPagination
          :page="page"
          :last-page="lastPage"
          :disabled="isLoading"
          @update:page="setPage"
        />

        <label class="flex items-center gap-xs text-sm text-text-secondary">
          Per page
          <AppSelect
            :model-value="String(perPage)"
            :options="PER_PAGE_OPTIONS"
            :disabled="isLoading"
            @update:model-value="onPerPageChange"
          />
        </label>
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { useInvoices } from "~/views/invoices/composables/useInvoices";
import { InvoicesTable } from "~/views/invoices/components";

const PER_PAGE_OPTIONS = [15, 25, 50, 100].map((value) => ({
  value: String(value),
  label: String(value),
}));

const {
  invoices,
  page,
  perPage,
  lastPage,
  total,
  from,
  to,
  isLoading,
  error,
  setPage,
  setPerPage,
  refresh,
} = useInvoices();

function onPerPageChange(value: string | undefined) {
  if (value) setPerPage(Number(value));
}

function goToCreate() {
  return navigateTo("/invoices/create");
}

useHead({ title: "Invoices" });
</script>
