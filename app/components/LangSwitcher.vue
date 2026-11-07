<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const target = computed(() => (locale.value === 'fa' ? 'en' : 'fa'))
</script>

<template>
  <NuxtLink :to="switchLocalePath(target)" class="btn px-3">
    <Icon name="lucide:languages" />
    {{ target === 'fa' ? 'فارسی' : 'EN' }}
  </NuxtLink>
</template>