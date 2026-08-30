<script setup lang="ts">
const { t, tm, rt } = useI18n()

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

const itineraryPhases = ['phase1', 'phase2', 'phase3', 'phase4', 'phase5']
const phaseLevels: Record<string, 'all' | 'advanced' | 'beginner' | undefined> = {
  phase1: 'all',
  phase2: 'advanced',
  phase3: 'advanced',
  phase5: 'beginner'
}
const phaseLevelColor: Record<'all' | 'advanced' | 'beginner', string> = {
  all: 'text-success',
  advanced: 'text-warning',
  beginner: 'text-info'
}
const phasesWithPriceNote: Record<string, boolean> = {
  phase1: true,
  phase2: true,
  phase3: true
}

function phaseItems(phase: string) {
  const raw = tm(`trips.itinerary.${phase}.items`) as string[]
  if (!Array.isArray(raw)) return []
  return raw.map((item: string) => rt(item))
}
</script>

<template>
  <div>
    <UPageHero
      :title="t('trips.title')"
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

    <!-- Itinerary -->
    <UPageSection :title="t('trips.itinerary.title')">
      <div class="max-w-3xl mx-auto space-y-12">
        <div
          v-for="phase in itineraryPhases"
          :key="phase"
        >
          <h3 class="text-xl font-semibold">
            {{ t(`trips.itinerary.${phase}.title`) }}
          </h3>
          <p class="text-primary font-medium mt-1">
            {{ t(`trips.itinerary.${phase}.dates`) }}
          </p>
          <ul class="space-y-2 mt-3">
            <li
              v-for="(item, index) in phaseItems(phase)"
              :key="index"
              class="flex items-start gap-3"
            >
              <UIcon
                name="i-lucide-circle"
                class="text-muted shrink-0 mt-1.5 size-2"
              />
              <span class="text-muted text-justify">{{ item }}</span>
            </li>
            <li
              v-if="phaseLevels[phase]"
              class="flex items-start gap-3"
            >
              <UIcon
                name="i-lucide-circle"
                class="shrink-0 mt-1.5 size-2"
                :class="phaseLevelColor[phaseLevels[phase]!]"
              />
              <span
                class="font-medium"
                :class="phaseLevelColor[phaseLevels[phase]!]"
              >{{ t(`trips.itinerary.${phase}.level`) }}</span>
            </li>
            <li
              v-if="phasesWithPriceNote[phase]"
              class="flex items-start gap-3"
            >
              <UIcon
                name="i-lucide-circle"
                class="text-muted shrink-0 mt-1.5 size-2"
              />
              <span class="font-bold text-justify">{{ t(`trips.itinerary.${phase}.priceNote`) }}</span>
            </li>
          </ul>
          <!-- Image and pricing to be added -->
        </div>
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
