<template>
  <div
    class="flex items-center justify-center py-2xl text-text-tertiary"
    role="status"
    aria-live="polite"
  >
    <LoaderCircle class="size-6 animate-spin" />
    <span class="sr-only">Loading</span>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";
</script>
