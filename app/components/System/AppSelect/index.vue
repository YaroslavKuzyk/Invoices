<template>
  <label class="flex flex-col gap-2xs">
    <span v-if="props.label" class="text-sm font-medium text-text-secondary">{{
      props.label
    }}</span>

    <div class="relative">
      <select
        v-model="model"
        :disabled="props.disabled"
        class="peer h-input-md w-full cursor-pointer appearance-none rounded-sm border bg-background py-0 pl-sm pr-xl text-text-primary outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-surface-alt disabled:text-text-tertiary"
        :class="props.error ? 'border-danger' : 'border-border'"
      >
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <ChevronDown
        class="pointer-events-none absolute top-1/2 right-sm size-4 -translate-y-1/2 text-text-tertiary transition-colors peer-focus:text-primary peer-disabled:opacity-50"
      />
    </div>

    <span v-if="props.error" class="text-xs text-danger">{{
      props.error
    }}</span>
  </label>
</template>

<script lang="ts" setup>
import { ChevronDown } from "lucide-vue-next";
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
});

const model = defineModel<string>();
</script>
