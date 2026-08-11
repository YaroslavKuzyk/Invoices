<template>
  <div
    class="flex flex-col gap-3xs rounded-sm p-sm text-sm"
    :class="variantClass"
    role="alert"
  >
    <span v-if="props.title" class="font-semibold">{{ props.title }}</span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  variant: "danger",
});

const VARIANT_CLASSES: Record<NonNullable<IProps["variant"]>, string> = {
  danger: "bg-danger-bg text-danger",
  warning: "bg-warning-bg text-warning",
  primary: "bg-primary-bg text-primary",
};

const variantClass = computed(() => VARIANT_CLASSES[props.variant]);
</script>
