<script setup lang="ts">
const { locale } = useI18n()
const dir = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'))
useHead({ htmlAttrs: { lang: locale, dir } })
</script>

<template>
  <NuxtLoadingIndicator color="var(--color-brand-500)" />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>