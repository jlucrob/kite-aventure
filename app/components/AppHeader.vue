<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()
const mobileMenuOpen = ref(false)

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
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <img src="/logo.svg" alt="Kite Aventure" class="w-auto" style="height: calc(var(--ui-header-height) - 0.5rem);" />
      </NuxtLink>
    </template>

    <template #center>
      <UNavigationMenu :items="navLinks.map(link => ({ label: link.label, to: link.to }))" class="hidden lg:flex" />
    </template>

    <template #right>
      <LanguageSwitcher />
      <BookNowButton />
      <UColorModeButton class="hidden lg:inline-flex" />
      <UButton
        class="lg:hidden"
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        aria-label="Menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      />
    </template>
  </UHeader>

  <!-- Mobile navigation -->
  <div v-if="mobileMenuOpen" class="lg:hidden border-b border-default bg-default">
    <nav class="container mx-auto px-4 py-4 flex flex-col gap-2">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="block py-2 px-3 rounded-md hover:bg-elevated text-default"
        @click="mobileMenuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </div>
</template>
