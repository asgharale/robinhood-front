<script setup lang="ts">
definePageMeta({ layout: 'panel' })
const { t } = useI18n()
useHead({ title: () => t('nav.profile') })

const form = reactive({ firstName: '', lastName: '', email: '', phone: '', bio: '' })
</script>

<template>
  <div class="max-w-xl">
    <h1 class="mb-6 text-2xl font-semibold">{{ $t('profile.title') }}</h1>
    <form class="card space-y-4" @submit.prevent>
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="label">{{ $t('profile.firstName') }}</label>
          <input v-model="form.firstName" class="input">
        </div>
        <div>
          <label class="label">{{ $t('profile.lastName') }}</label>
          <input v-model="form.lastName" class="input">
        </div>
      </div>
      <div>
        <label class="label">{{ $t('profile.email') }}</label>
        <input v-model="form.email" type="email" class="input" dir="ltr">
      </div>
      <div>
        <label class="label">{{ $t('profile.phone') }}</label>
        <input v-model="form.phone" type="tel" class="input" dir="ltr">
      </div>
      <div>
        <label class="label">{{ $t('profile.bio') }}</label>
        <textarea v-model="form.bio" rows="4" class="input" />
      </div>
      <button class="btn btn-primary">{{ $t('common.save') }}</button>
    </form>
  </div>
</template>