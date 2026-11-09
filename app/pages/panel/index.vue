<script setup lang="ts">
const { t } = useI18n()
useHead({ title: () => t('app.name') })

const { reset, pending } = useChat()
const localePath = useLocalePath()
const { isMobile } = useDevice()

const suggestions = ['home.s1', 'home.s2', 'home.s3']
const steps = [
  { key: 'gather', icon: 'lucide:gift' },
  { key: 'donate', icon: 'lucide:hand-heart' },
  { key: 'use', icon: 'lucide:messages-square' },
]
const features = [
  { key: 'sources', icon: 'lucide:book-open-check' },
  { key: 'bilingual', icon: 'lucide:languages' },
  { key: 'free', icon: 'lucide:heart-handshake' },
]

function start(text: string) {
  reset()                 // new conversation
  pending.value = text    // chat page picks this up and sends it
  navigateTo(localePath('/chat'))
}

const scrollToAbout = () =>
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <div>
    <!-- 1. chat first -->
    <section class="flex min-h-[calc(100dvh-10rem)] flex-col items-center justify-center text-center">
      <span class="badge badge-info mb-5">{{ $t('home.badge') }}</span>
      <h1 class="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{{ $t('home.title') }}</h1>
      <p class="mt-4 max-w-xl text-muted">{{ $t('home.subtitle') }}</p>

      <div class="mt-8 w-full max-w-2xl text-start">
        <ChatInput :autofocus="!isMobile" @submit="start" />
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <button
            v-for="s in suggestions" :key="s"
            class="btn rounded-full px-3 py-1 text-xs"
            @click="start($t(s))"
          >{{ $t(s) }}</button>
        </div>
      </div>

      <button class="mt-12 flex items-center gap-1 text-sm text-muted hover:text-fg" @click="scrollToAbout">
        {{ $t('home.scroll') }}
        <Icon name="lucide:chevron-down" class="animate-bounce" />
      </button>
    </section>

    <!-- 2. description -->
    <section id="about" class="scroll-mt-20 space-y-16 border-t border-line py-16">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-semibold">{{ $t('home.about.title') }}</h2>
        <p class="mt-4 leading-8 text-muted">{{ $t('home.about.body') }}</p>
        <p class="mt-6 text-lg font-medium">{{ $t('home.about.quote') }} ❤️</p>
      </div>

      <div>
        <h2 class="mb-6 text-center text-xl font-semibold">{{ $t('home.stepsTitle') }}</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div v-for="(s, i) in steps" :key="s.key" class="card">
            <div class="flex items-center gap-3">
              <span class="grid size-8 place-items-center rounded-full bg-brand-600/15 text-sm font-semibold text-brand-500">{{ i + 1 }}</span>
              <Icon :name="s.icon" class="size-5 text-brand-500" />
            </div>
            <h3 class="mt-3 font-semibold">{{ $t(`home.steps.${s.key}.title`) }}</h3>
            <p class="mt-1 text-sm text-muted">{{ $t(`home.steps.${s.key}.text`) }}</p>
          </div>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <div v-for="f in features" :key="f.key" class="card">
          <Icon :name="f.icon" class="size-6 text-brand-500" />
          <h3 class="mt-3 font-semibold">{{ $t(`home.features.${f.key}.title`) }}</h3>
          <p class="mt-1 text-sm text-muted">{{ $t(`home.features.${f.key}.text`) }}</p>
        </div>
      </div>

      <div class="text-center">
        <button class="btn btn-primary" @click="scrollToTop">
          <Icon name="lucide:message-circle" /> {{ $t('home.cta') }}
        </button>
      </div>
    </section>
  </div>
</template>