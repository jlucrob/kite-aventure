<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('home.seo.title'),
  description: () => t('home.seo.description')
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <img
        src="/images/IMG_8539_compressed.jpg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover object-[center_45%]"
      >
      <div class="absolute inset-0 bg-white/30" />
      <UPageHero
        class="relative"
        :title="t('home.hero')"
        :description="t('home.heroSubtitle')"
        :links="[
          /* { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const }, */
          { label: t('contactUs'), to: localePath('/contact'), trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const },
          // { label: t('nav.school'), to: localePath('/school'), size: 'xl' as const, color: 'neutral' as const, variant: 'subtle' as const },
          // { label: t('nav.trips'), to: localePath('/trips'), size: 'xl' as const, color: 'neutral' as const, variant: 'subtle' as const }
        ]"
        :ui="{
          title: 'text-gray-900',
          description: 'text-gray-900'
        }"
      />
    </div>

    <!-- Intro Section -->
    <UPageSection>
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-lg text-muted">
          {{ t('home.intro') }}
        </p>
      </div>
    </UPageSection>

    <!-- Highlights Section -->
    <UPageSection
      :title="t('home.highlights.title')"
      :features="[
        {
          icon: 'i-lucide-award',
          title: t('home.highlights.certified.title'),
          description: t('home.highlights.certified.description')
        },
        {
          icon: 'i-lucide-package',
          title: t('home.highlights.equipment.title'),
          description: t('home.highlights.equipment.description')
        },
        {
          icon: 'i-lucide-map-pin',
          title: t('home.highlights.locations.title'),
          description: t('home.highlights.locations.description')
        }
      ]"
    />

    <!-- CTA Section -->
    <UPageSection>
      <UPageCTA
        :title="t('home.cta')"
        :description="t('home.ctaDescription')"
        :links="[
          /* { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const }, */
          { label: t('contactUs'), to: localePath('/contact'), trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const }
        ]"
      />
    </UPageSection>
  </div>
</template>
