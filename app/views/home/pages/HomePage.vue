<template>
  <section class="app-container flex flex-col gap-xl">
    <header class="flex items-center gap-sm">
      <LogoIcon :size="32" class="text-primary" />
      <h1 class="text-2xl font-extrabold tracking-tight">{{ title }}</h1>
    </header>

    <div class="grid gap-md sm:grid-cols-3">
      <article
        v-for="stat in stats"
        :key="stat.id"
        class="rounded-lg border border-border bg-surface p-md"
      >
        <p class="text-sm text-text-secondary">{{ stat.title }}</p>
        <p class="text-xl font-bold">{{ stat.value }}</p>
      </article>
    </div>

    <div class="flex flex-wrap gap-sm">
      <AppButton>Primary</AppButton>
      <AppButton variant="secondary">Secondary</AppButton>
      <AppButton variant="ghost" loading>Loading</AppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import LogoIcon from '~/icons/LogoIcon.vue'
import { useHome } from '../composables'

const { title, stats } = useHome()
</script>
