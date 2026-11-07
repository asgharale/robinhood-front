<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <div class="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 md:grid-cols-[14rem_1fr]">
      <aside class="md:sticky md:top-20 md:self-start"><PanelSidebar /></aside>
      <main class="min-w-0"><slot /></main>
    </div>
  </div>
</template>