<template>
  <AppBadge :variant="variant">
    {{ label }}
  </AppBadge>
</template>

<script lang="ts" setup>
import { EInvoiceStatus } from "~/views/invoices/domain";
import type { IProps as IBadgeProps } from "~/components/System/AppBadge/index.types";

const props = defineProps<{ status: EInvoiceStatus }>();

const STATUS_VARIANT: Record<EInvoiceStatus, IBadgeProps["variant"]> = {
  [EInvoiceStatus.PENDING]: "warning",
  [EInvoiceStatus.APPROVED]: "success",
  [EInvoiceStatus.REJECTED]: "danger",
};

const STATUS_LABEL: Record<EInvoiceStatus, string> = {
  [EInvoiceStatus.PENDING]: "Pending",
  [EInvoiceStatus.APPROVED]: "Approved",
  [EInvoiceStatus.REJECTED]: "Rejected",
};

const variant = computed(() => STATUS_VARIANT[props.status] ?? "basic");
const label = computed(() => STATUS_LABEL[props.status] ?? props.status);
</script>
