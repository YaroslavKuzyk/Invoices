<template>
  <section class="app-container flex flex-col gap-lg">
    <NuxtLink
      :to="listRoute"
      class="app-link inline-flex w-fit items-center gap-3xs text-sm"
    >
      <ArrowLeft class="size-4" />
      Back to invoices
    </NuxtLink>

    <h1 class="text-2xl font-semibold">New invoice</h1>

    <InvoiceCreateForm @created="onCreated" />
  </section>
</template>

<script lang="ts" setup>
import { ArrowLeft } from "lucide-vue-next";
import { InvoiceCreateForm } from "~/views/invoices/components";
import { useInvoicesListQuery } from "~/views/invoices/composables/useInvoicesListQuery";

const { listRoute } = useInvoicesListQuery();

function onCreated() {
  return navigateTo(listRoute.value);
}

useHead({ title: "New invoice" });
</script>
