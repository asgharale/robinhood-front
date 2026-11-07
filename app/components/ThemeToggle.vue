<script setup lang="ts">
const colorMode = useColorMode()
const modes = ['system', 'light', 'dark']
const icons: Record<string, string> = {
  system: 'lucide:monitor', light: 'lucide:sun', dark: 'lucide:moon',
}
function next() {
  const i = modes.indexOf(colorMode.preference)
  colorMode.preference = modes[(i + 1) % modes.length]!
}
</script>

<template>
  <ClientOnly>
    <button class="btn px-2" :title="$t(`theme.${colorMode.preference}`)" @click="next">
      <Icon :name="icons[colorMode.preference]!" />
    </button>
    <template #fallback><span class="btn px-2"><Icon name="lucide:monitor" /></span></template>
  </ClientOnly>
</template>