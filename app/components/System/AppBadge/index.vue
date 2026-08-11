<template>
  <span
    class="inline-flex items-center justify-center rounded-2xs px-xs py-3xs text-sm font-medium"
    :class="variantClass"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  variant: "basic",
});

const VARIANT_CLASSES: Record<NonNullable<IProps["variant"]>, string> = {
  basic: "bg-surface-alt text-text-secondary",
  primary: "bg-primary-bg text-primary",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
};

const variantClass = computed(() => VARIANT_CLASSES[props.variant]);
</script>
