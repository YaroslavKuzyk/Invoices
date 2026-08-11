<template>
  <nav class="flex items-center gap-3xs" aria-label="Pagination">
    <button
      type="button"
      class="flex size-9 items-center justify-center rounded-2xs border border-border text-text-secondary transition-colors hover:bg-background-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      :disabled="props.disabled || props.page <= 1"
      aria-label="Previous page"
      @click="go(props.page - 1)"
    >
      <ChevronLeft class="size-4" />
    </button>

    <template v-for="(item, index) in items" :key="`${item}-${index}`">
      <span
        v-if="item === ELLIPSIS"
        class="flex size-9 items-center justify-center text-text-tertiary"
        >…</span
      >

      <button
        v-else
        type="button"
        class="flex size-9 items-center justify-center rounded-2xs border text-sm transition-colors disabled:cursor-not-allowed"
        :class="
          item === props.page
            ? 'border-primary bg-primary text-white'
            : 'border-border text-text-secondary hover:bg-background-hover disabled:opacity-40'
        "
        :disabled="props.disabled"
        :aria-current="item === props.page ? 'page' : undefined"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      type="button"
      class="flex size-9 items-center justify-center rounded-2xs border border-border text-text-secondary transition-colors hover:bg-background-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      :disabled="props.disabled || props.page >= props.lastPage"
      aria-label="Next page"
      @click="go(props.page + 1)"
    >
      <ChevronRight class="size-4" />
    </button>
  </nav>
</template>

<script lang="ts" setup>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import type { IProps } from "./index.types";

const ELLIPSIS = "…";

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  siblings: 1,
});

const emit = defineEmits<{ "update:page": [page: number] }>();

const items = computed<(number | string)[]>(() => {
  const { page, lastPage, siblings } = props;

  const maxVisible = siblings * 2 + 5;

  if (lastPage <= maxVisible) {
    return range(1, lastPage);
  }

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, lastPage);

  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < lastPage - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, siblings * 2 + 3), ELLIPSIS, lastPage];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, ELLIPSIS, ...range(lastPage - (siblings * 2 + 2), lastPage)];
  }

  return [1, ELLIPSIS, ...range(left, right), ELLIPSIS, lastPage];
});

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function go(page: number) {
  if (props.disabled) return;
  if (page < 1 || page > props.lastPage || page === props.page) return;

  emit("update:page", page);
}
</script>
