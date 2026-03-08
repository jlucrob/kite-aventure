<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.team'), to: localePath('/team') },
  { label: t('nav.services'), to: localePath('/services') },
  { label: t('nav.contact'), to: localePath('/contact') }
])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-2"
      >
        <img
          src="/logo.svg"
          alt="Kite Aventure"
          class="w-auto"
          style="height: calc(var(--ui-header-height) - 0.5rem);"
        >
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="navLinks.map(link => ({ label: link.label, to: link.to }))"
      :ui="{ link: 'text-base' }"
    />

    <template #right>
      <LanguageSwitcher />
      <!-- <BookNowButton /> -->
    </template>

    <template #body>
      <UNavigationMenu
        :items="navLinks.map(link => ({ label: link.label, to: link.to }))"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>
