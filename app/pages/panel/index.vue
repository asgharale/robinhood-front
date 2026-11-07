<script setup lang="ts">
definePageMeta({ layout: 'panel' })
const { t } = useI18n()
useHead({ title: () => t('nav.dashboard') })

const stats = [
  { key: 'visits', value: '1,284' },
  { key: 'messages', value: '86' },
  { key: 'tickets', value: '5' },
]
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold">{{ $t('nav.dashboard') }}</h1>

    <div class="grid gap-4 sm:grid-cols-3">
      <div v-for="s in stats" :key="s.key" class="card">
        <p class="text-sm text-muted">{{ $t(`dashboard.${s.key}`) }}</p>
        <p class="mt-1 text-2xl font-semibold">{{ s.value }}</p>
      </div>
    </div>

    <!-- status colors preview, delete later -->
    <div class="mt-6 flex flex-wrap gap-2">
      <span class="badge badge-success">{{ $t('status.success') }}</span>
      <span class="badge badge-danger">{{ $t('status.error') }}</span>
      <span class="badge badge-warning">{{ $t('status.warning') }}</span>
      <span class="badge badge-info">{{ $t('status.info') }}</span>
    </div>
  </div>
</template>