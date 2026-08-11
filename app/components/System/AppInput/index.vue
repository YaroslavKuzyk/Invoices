<template>
  <label class="flex flex-col gap-2xs">
    <span v-if="props.label" class="text-sm font-medium text-text-secondary">{{
      props.label
    }}</span>

    <input
      v-model="model"
      :type="props.type"
      :step="props.step"
      :min="props.min"
      :disabled="props.disabled"
      :readonly="props.readOnly"
      class="h-input-md rounded-sm border px-sm text-text-primary outline-none transition-colors placeholder:text-placeholder focus:border-primary disabled:cursor-not-allowed disabled:bg-surface-alt disabled:text-text-tertiary read-only:bg-surface read-only:text-text-secondary"
      :class="props.error ? 'border-danger' : 'border-border'"
    />

    <span v-if="props.error" class="text-xs text-danger">{{
      props.error
    }}</span>
    <span v-else-if="props.hint" class="text-xs text-text-tertiary">{{
      props.hint
    }}</span>
  </label>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  type: "text",
  disabled: false,
  readOnly: false,
});

const model = defineModel<string | number | null>();
</script>
