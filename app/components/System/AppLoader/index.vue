<template>
  <span
    class="app-loader inline-block animate-spin rounded-full border-2 border-current border-t-transparent"
    :style="{ width: `${props.size}px`, height: `${props.size}px`, color: props.color }"
  />
</template>

<script setup lang="ts">
import type { IProps } from './index.types'

const props = withDefaults(defineProps<IProps>(), {
  size: 25,
  color: undefined,
})
</script>
