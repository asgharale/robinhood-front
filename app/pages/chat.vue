<script setup lang="ts">
definePageMeta({ layout: 'chat' })
const { t } = useI18n()
useHead({ title: () => t('nav.chat') })

const { messages, loading, pending, send, reset } = useChat()
const scroller = ref<HTMLElement>()

function scrollDown() {
  nextTick(() => scroller.value?.scrollTo({ top: scroller.value.scrollHeight, behavior: 'smooth' }))
}
watch([() => messages.value.length, loading], scrollDown)

// a message typed on the home page is sent as soon as this page opens
onMounted(() => {
  if (pending.value) {
    const first = pending.value
    pending.value = null
    send(first)
  }
})
</script>

<template>
  <div class="mx-auto flex h-full w-full max-w-3xl flex-col px-4">
    <div v-if="messages.length" class="flex justify-end pt-3">
      <button class="btn px-3 py-1 text-xs" @click="reset">
        <Icon name="lucide:square-pen" /> {{ $t('chat.new') }}
      </button>
    </div>

    <div ref="scroller" class="flex-1 overflow-y-auto py-6">
      <!-- empty state -->
      <div v-if="!messages.length" class="grid h-full place-items-center text-center">
        <div>
          <span class="mx-auto grid size-12 place-items-center rounded-xl bg-brand-600 text-white">
            <Icon name="lucide:feather" class="size-6" />
          </span>
          <h1 class="mt-4 text-xl font-semibold">{{ $t('chat.emptyTitle') }}</h1>
          <p class="mt-1 text-sm text-muted">{{ $t('chat.emptyHint') }}</p>
        </div>
      </div>

      <!-- messages -->
      <div v-else v-auto-animate class="space-y-5">
        <div
          v-for="m in messages" :key="m.id"
          class="flex gap-3"
          :class="m.role === 'user' ? 'justify-end rtl:justify-start' : ''"
        >
          <!-- user -->
          <p
            v-if="m.role === 'user'" dir="auto"
            class="max-w-[85%] whitespace-pre-wrap rounded-2xl bg-brand-600 px-4 py-2 text-sm text-white"
          >{{ m.content }}</p>

          <!-- assistant -->
          <template v-else>
            <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
              <Icon name="lucide:feather" />
            </span>
            <div class="min-w-0 max-w-[85%]">
              <p dir="auto" class="whitespace-pre-wrap text-sm leading-7" :class="m.error && 'text-danger'">{{ m.content }}</p>
              <div v-if="m.sources?.length" class="mt-2 flex flex-wrap items-center gap-1.5">
                <span class="text-xs text-muted">{{ $t('chat.sources') }}:</span>
                <component
                  :is="s.url ? 'a' : 'span'"
                  v-for="(s, i) in m.sources" :key="i"
                  :href="s.url" target="_blank" rel="noopener"
                  class="badge badge-info"
                >{{ s.title }}</component>
              </div>
            </div>
          </template>
        </div>

        <!-- typing indicator -->
        <div v-if="loading" key="loading" class="flex items-center gap-3">
          <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
            <Icon name="lucide:feather" />
          </span>
          <span class="flex gap-1">
            <i class="size-1.5 animate-bounce rounded-full bg-muted" />
            <i class="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
            <i class="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
          </span>
        </div>
      </div>
    </div>

    <div class="pb-4 pt-2">
      <ChatInput :disabled="loading" autofocus @submit="send" />
      <p class="mt-2 text-center text-xs text-muted">{{ $t('chat.disclaimer') }}</p>
    </div>
  </div>
</template>