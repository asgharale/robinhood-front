<script setup lang="ts">
definePageMeta({ layout: 'auth' })
const { t } = useI18n()
useHead({ title: () => t('auth.title') })

const form = reactive({ username: '', password: '' })
// TODO: POST to Django (JWT or session) via $api
</script>

<template>
  <div class="card">
    <h1 class="mb-5 text-xl font-semibold">{{ $t('auth.title') }}</h1>
    <form class="space-y-4" @submit.prevent>
      <div>
        <label class="label">{{ $t('auth.username') }}</label>
        <input v-model="form.username" class="input" dir="ltr" autocomplete="username">
      </div>
      <div>
        <label class="label">{{ $t('auth.password') }}</label>
        <input v-model="form.password" type="password" class="input" dir="ltr" autocomplete="current-password">
      </div>
      <button class="btn btn-primary w-full">{{ $t('auth.submit') }}</button>
    </form>
  </div>
</template>