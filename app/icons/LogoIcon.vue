<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 2h9l5 5v15H6z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path d="M14 2v6h6M9 13h6M9 17h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number | string }>(), { size: 24 })
</script>
