<script setup>
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true
})

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    dir: head.value.htmlAttrs?.dir
  },
  link: [...(head.value.link || [])],
  meta: [...(head.value.meta || [])]
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter class="mt-14 sm:mt-16 border-t border-default-200" />
  </div>
</template>
