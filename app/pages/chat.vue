<script setup lang="ts">
definePageMeta({ layout: 'panel' })
const { t } = useI18n()
useHead({ title: () => t('nav.chat') })

const text = ref('')
const messages = ref<{ id: number; mine: boolean; text: string }[]>([])

function send() {
  const value = text.value.trim()
  if (!value) return
  messages.value.push({ id: Date.now(), mine: true, text: value })
  text.value = ''
}
</script>

<template>
  <div class="card flex h-[70dvh] flex-col p-0">
    <div class="flex-1 space-y-2 overflow-y-auto p-4">
      <p v-if="!messages.length" class="grid h-full place-items-center text-sm text-muted">
        {{ $t('chat.empty') }}
      </p>
      <div
        v-for="m in messages" :key="m.id"
        class="flex" :class="m.mine ? 'justify-end' : 'justify-start'"
      >
        <span
          class="max-w-[80%] rounded-2xl px-3 py-2 text-sm"
          :class="m.mine ? 'bg-brand-600 text-white' : 'border border-line bg-bg'"
        >{{ m.text }}</span>
      </div>
    </div>
    <form class="flex gap-2 border-t border-line p-3" @submit.prevent="send">
      <input v-model="text" class="input" :placeholder="$t('chat.placeholder')">
      <button class="btn btn-primary" type="submit">
        <Icon name="lucide:send" class="rtl:-scale-x-100" />
      </button>
    </form>
  </div>
</template>