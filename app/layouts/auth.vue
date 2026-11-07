<template>
  <div class="relative grid min-h-dvh place-items-center px-4">
    <div class="absolute end-4 top-4 flex gap-2"><LangSwitcher /><ThemeToggle /></div>
    <main class="w-full max-w-sm"><slot /></main>
  </div>
</template>