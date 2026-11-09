<script setup lang="ts">
const colorMode = useColorMode()
const open = ref(false)
const root = ref<HTMLElement>()

const options = [
  { value: 'system', icon: 'lucide:monitor' },
  { value: 'light', icon: 'lucide:sun' },
  { value: 'dark', icon: 'lucide:moon' },
] as const

const current = computed(() => options.find(o => o.value === colorMode.preference) ?? options[0])

function pick(value: string) {
  colorMode.preference = value // saved automatically; 'system' follows the OS
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (!root.value?.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="root" class="relative" @keydown.esc="open = false">
    <ClientOnly>
      <button
        class="btn gap-1 px-2"
        aria-haspopup="menu"
        :aria-expanded="open"
        :title="$t('theme.label')"
        @click="open = !open"
      >
        <Icon :name="current.icon" />
        <Icon name="lucide:chevron-down" class="size-3.5 text-muted" />
      </button>

      <ul
        v-if="open"
        role="menu"
        class="absolute end-0 z-50 mt-2 w-40 rounded-lg border border-line bg-bg p-1 shadow-lg"
      >
        <li v-for="o in options" :key="o.value" role="none">
          <button
            role="menuitemradio"
            :aria-checked="colorMode.preference === o.value"
            class="nav-link w-full"
            :class="{ 'nav-link-active': colorMode.preference === o.value }"
            @click="pick(o.value)"
          >
            <Icon :name="o.icon" />
            {{ $t(`theme.${o.value}`) }}
            <Icon v-if="colorMode.preference === o.value" name="lucide:check" class="ms-auto text-brand-500" />
          </button>
        </li>
      </ul>

      <template #fallback>
        <span class="btn gap-1 px-2"><Icon name="lucide:monitor" /><Icon name="lucide:chevron-down" class="size-3.5" /></span>
      </template>
    </ClientOnly>
  </div>
</template>