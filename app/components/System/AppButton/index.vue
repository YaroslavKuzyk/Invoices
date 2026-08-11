<template>
  <button
    :type="props.type"
    :disabled="isDisabled"
    class="inline-flex h-input-md items-center justify-center rounded-sm px-md text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    :class="variantClass"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  variant: "primary",
  type: "button",
  disabled: false,
  loading: false,
});

const VARIANT_CLASSES: Record<NonNullable<IProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary:
    "border border-border bg-background text-text-primary hover:bg-background-hover",
};

const isDisabled = computed(() => props.disabled || props.loading);
const variantClass = computed(() => VARIANT_CLASSES[props.variant]);
</script>
