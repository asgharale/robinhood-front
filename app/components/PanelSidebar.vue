<script setup lang="ts">
const items = [
  { to: '/panel', label: 'nav.dashboard', icon: 'lucide:layout-dashboard' },
  { to: '/chat', label: 'nav.chat', icon: 'lucide:message-circle' },
  { to: '/panel/profile', label: 'nav.profile', icon: 'lucide:user' },
]
</script>

<template>
  <nav class="flex gap-1 overflow-x-auto md:flex-col">
    <NuxtLinkLocale
      v-for="i in items" :key="i.to" :to="i.to"
      class="nav-link whitespace-nowrap" active-class="nav-link-active"
    >
      <Icon :name="i.icon" /> {{ $t(i.label) }}
    </NuxtLinkLocale>
  </nav>
</template>