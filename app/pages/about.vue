<script setup lang="ts">
const { t } = useI18n()
useHead({ title: () => t('nav.about') })
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="mb-4 text-2xl font-semibold">{{ $t('about.title') }}</h1>
    <p class="leading-8 text-muted">{{ $t('about.body') }}</p>
  </div>
</template>