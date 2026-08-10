<template>
  <component
    :is="componentTag"
    class="app-button relative inline-flex cursor-pointer items-center justify-center border border-transparent font-semibold no-underline transition-all duration-300 outline-3 outline-transparent focus-visible:outline-primary"
    :class="[
      `app-button--${props.variant}`,
      `app-button--${props.size}`,
      variantClasses,
      sizeClasses,
      { 'app-button--loading': props.loading },
      { 'app-button--disabled cursor-default opacity-50': props.disabled },
      { 'app-button--square aspect-square p-xs': props.square },
    ]"
    :disabled="isButton ? props.disabled : undefined"
    :to="props.as === 'nuxt-link' ? props.to : undefined"
    :href="props.as === 'a' ? props.href : undefined"
  >
    <span
      class="app-button__content flex items-center gap-xs transition-opacity duration-200"
      :class="{ 'opacity-0': props.loading }"
    >
      <component :is="props.iconLeft" v-if="props.iconLeft" :size="getIconSize" />
      <slot />
      <component :is="props.iconRight" v-if="props.iconRight" :size="getIconSize" />
    </span>

    <span
      v-if="props.loading"
      class="app-button__loader absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2"
    >
      <AppLoader :size="getLoaderSize" />
    </span>
  </component>
</template>

<script setup lang="ts">
import type { IProps } from './index.types'
import AppLoader from '../AppLoader/index.vue'

const props = withDefaults(defineProps<IProps>(), {
  variant: 'primary',
  size: 'medium',
  loading: false,
  disabled: false,
  as: 'button',
  square: false,
  to: undefined,
  href: undefined,
  iconLeft: undefined,
  iconRight: undefined,
})

const isButton = computed(() => props.as === 'button')

const componentTag = computed(() => {
  if (props.as === 'nuxt-link') return resolveComponent('NuxtLink')
  if (props.as === 'a') return 'a'
  return 'button'
})

const variantClasses = computed(() => {
  const map: Record<NonNullable<IProps['variant']>, string> = {
    primary: 'bg-primary border-primary text-white hover:bg-primary-hover',
    secondary: 'bg-surface-alt border-border text-text-primary hover:bg-background-hover',
    danger: 'bg-danger/10 border-danger/20 text-danger',
    success: 'bg-success/10 border-success/20 text-success',
    info: 'bg-info/10 border-info/20 text-info',
    purple: 'bg-purple/10 border-purple/20 text-purple',
    transparent: 'bg-transparent border-border text-text-secondary',
    ghost: 'bg-transparent border-transparent text-text-secondary hover:bg-background-hover',
  }
  return map[props.variant]
})

const sizeClasses = computed(() => {
  const map: Record<NonNullable<IProps['size']>, string> = {
    small: 'rounded-sm px-md py-xs text-sm',
    medium: 'rounded-md px-xl py-sm text-sm',
    large: 'rounded-lg px-2xl py-sm text-base',
  }
  return map[props.size]
})

const getIconSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 14
    case 'large':
      return 20
    default:
      return 16
  }
})

const getLoaderSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 20
    case 'large':
      return 30
    default:
      return 25
  }
})
</script>
