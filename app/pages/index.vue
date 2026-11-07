<script setup lang="ts">
const { t } = useI18n()
useHead({ title: () => t('nav.home') })

const features = [
  { key: 'fast', icon: 'lucide:zap' },
  { key: 'secure', icon: 'lucide:shield-check' },
  { key: 'bilingual', icon: 'lucide:languages' },
]
</script>

<template>
  <div class="space-y-16">
    <section class="py-10 text-center">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{{ $t('home.title') }}</h1>
      <p class="mx-auto mt-4 max-w-xl text-muted">{{ $t('home.subtitle') }}</p>
      <div class="mt-8 flex justify-center gap-3">
        <NuxtLinkLocale to="/panel/auth" class="btn btn-primary">{{ $t('home.cta') }}</NuxtLinkLocale>
        <NuxtLinkLocale to="/about" class="btn">{{ $t('home.learnMore') }}</NuxtLinkLocale>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3">
      <div v-for="f in features" :key="f.key" class="card">
        <Icon :name="f.icon" class="size-6 text-brand-500" />
        <h3 class="mt-3 font-semibold">{{ $t(`home.features.${f.key}.title`) }}</h3>
        <p class="mt-1 text-sm text-muted">{{ $t(`home.features.${f.key}.text`) }}</p>
      </div>
    </section>
  </div>
</template>