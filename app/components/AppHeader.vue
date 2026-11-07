<script setup lang="ts">
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const links = [
  { to: '/', label: 'nav.home', icon: 'lucide:house' },
  { to: '/about', label: 'nav.about', icon: 'lucide:info' },
  { to: '/contact', label: 'nav.contact', icon: 'lucide:mail' },
  { to: '/chat', label: 'nav.chat', icon: 'lucide:message-circle' },
  { to: '/panel', label: 'nav.panel', icon: 'lucide:layout-dashboard' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
    <div class="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
      <NuxtLinkLocale to="/" class="flex items-center gap-2 font-semibold">
        <span class="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
          <Icon name="lucide:feather" />
        </span>
        {{ $t('app.name') }}
      </NuxtLinkLocale>

      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLinkLocale
          v-for="l in links" :key="l.to" :to="l.to"
          class="nav-link" active-class="nav-link-active"
        >
          <Icon :name="l.icon" /> {{ $t(l.label) }}
        </NuxtLinkLocale>
      </nav>

      <div class="ms-auto flex items-center gap-2">
        <LangSwitcher />
        <ThemeToggle />
        <NuxtLinkLocale to="/panel/auth" class="btn btn-primary hidden sm:inline-flex">
          {{ $t('nav.login') }}
        </NuxtLinkLocale>
        <button class="btn px-2 md:hidden" @click="open = !open">
          <Icon :name="open ? 'lucide:x' : 'lucide:menu'" />
        </button>
      </div>
    </div>

    <nav v-if="open" class="flex flex-col gap-1 border-t border-line p-2 md:hidden">
      <NuxtLinkLocale
        v-for="l in links" :key="l.to" :to="l.to"
        class="nav-link" active-class="nav-link-active"
      >
        <Icon :name="l.icon" /> {{ $t(l.label) }}
      </NuxtLinkLocale>
    </nav>
  </header>
</template>