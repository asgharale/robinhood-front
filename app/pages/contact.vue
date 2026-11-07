<script setup lang="ts">
const { t } = useI18n()
const { $api } = useNuxtApp()
useHead({ title: () => t('nav.contact') })

const form = reactive({ name: '', email: '', message: '' })
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

async function submit() {
  status.value = 'loading'
  try {
    await $api('/contact/', { method: 'POST', body: form })
    Object.assign(form, { name: '', email: '', message: '' })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg">
    <h1 class="mb-6 text-2xl font-semibold">{{ $t('contact.title') }}</h1>
    <form class="card space-y-4" @submit.prevent="submit">
      <div>
        <label class="label" for="name">{{ $t('contact.name') }}</label>
        <input id="name" v-model="form.name" class="input" required>
      </div>
      <div>
        <label class="label" for="email">{{ $t('contact.email') }}</label>
        <input id="email" v-model="form.email" type="email" class="input" required>
      </div>
      <div>
        <label class="label" for="message">{{ $t('contact.message') }}</label>
        <textarea id="message" v-model="form.message" rows="5" class="input" required />
      </div>
      <button class="btn btn-primary w-full" :disabled="status === 'loading'">
        {{ status === 'loading' ? $t('common.loading') : $t('common.send') }}
      </button>
      <p v-if="status === 'success'" class="text-sm text-success">{{ $t('contact.sent') }}</p>
      <p v-if="status === 'error'" class="text-sm text-danger">{{ $t('common.error') }}</p>
    </form>
  </div>
</template>