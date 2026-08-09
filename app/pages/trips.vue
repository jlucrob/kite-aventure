<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('trips.seo.title'),
  description: () => t('trips.seo.description'),
  ogTitle: () => t('trips.seo.title'),
  ogDescription: () => t('trips.seo.description'),
  ogImage: 'https://kiteaventure.ca/images/IMG_8539_compressed.jpg',
  ogType: 'website'
})

// const includedItems = computed(() => {
//   const raw = tm('trips.included.items') as string[]
//   if (!Array.isArray(raw)) return []
//   return raw.map((item: string) => rt(item))
// })
</script>

<template>
  <div>
    <UPageHero
      :title="t('trips.title')"
      :description="t('trips.subtitle')"
      :links="[
        /* { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const } */
        // { label: t('contactUs'), to: localePath('/contact'), trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const }
      ]"
      :ui="{ container: 'pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-4 lg:pb-6 gap-4 sm:gap-6' }"
    />

    <!-- Intro -->
    <UPageSection>
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-lg text-muted">
          {{ t('trips.intro') }}
        </p>
      </div>
    </UPageSection>

    <!-- What's Included -->
    <!-- <UPageSection :title="t('trips.included.title')">
      <div class="max-w-2xl mx-auto">
        <ul class="space-y-3">
          <li
            v-for="(item, index) in includedItems"
            :key="index"
            class="flex items-center gap-3"
          >
            <UIcon
              name="i-lucide-check-circle"
              class="text-primary shrink-0"
            />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </UPageSection> -->

    <!-- CTA -->
    <!-- <UPageSection>
      <UPageCTA
        :title="t('home.cta')"
        :description="t('home.ctaDescription')"
        :links="[
          /* { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const } */
          { label: t('contactUs'), to: localePath('/contact'), trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const }
        ]"
      />
    </UPageSection> -->
  </div>
</template>
