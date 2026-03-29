<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.team'), to: localePath('/team') },
  { label: t('nav.school'), to: localePath('/school') },
  { label: t('nav.trips'), to: localePath('/trips') },
  { label: t('nav.contact'), to: localePath('/contact') }
])
</script>

<template>
  <UFooter>
    <template #left>
      <div class="flex flex-col gap-1">
        <p class="font-bold text-default">
          Kite Aventure
        </p>
        <p class="text-sm text-muted">
          {{ t('footer.tagline') }}
        </p>
        <p class="text-sm text-muted">
          {{ t('contact.info.address') }}
        </p>
        <!-- <p class="text-sm text-muted">
          {{ t('contact.info.phone') }}
        </p> -->
        <!-- <p class="text-sm text-muted">
          {{ t('contact.info.email') }}
        </p> -->
        <div class="flex items-center gap-2 mt-2">
          <UButton
            to="https://www.facebook.com/kiteaventureqc"
            target="_blank"
            icon="i-simple-icons-facebook"
            color="primary"
            variant="ghost"
            size="lg"
            aria-label="Facebook"
          />
          <UButton
            to="https://www.instagram.com/kiteaventureqc/"
            target="_blank"
            icon="i-simple-icons-instagram"
            color="primary"
            variant="ghost"
            size="lg"
            aria-label="Instagram"
          />
        </div>
      </div>
    </template>

    <template #center>
      <nav class="flex flex-wrap gap-4 justify-center">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-muted hover:text-default transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </template>

    <template #right>
      <p class="text-sm text-muted">
        {{ t('footer.copyright') }}
      </p>
    </template>
  </UFooter>
</template>
