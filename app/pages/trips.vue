<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

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

const itineraryPhases = ['phase1', 'phase2', 'phase3', 'phase5']
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
  phase3: true,
  phase5: true
}
const phaseImages: Record<string, string> = {
  phase2: '/images/PictureForBresil2026/rsz_220241222_155516.jpg',
  phase5: '/images/PictureForBresil2026/IMG-20241130-WA0021.jpg'
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
      :ui="{
        container: 'py-16 sm:py-20 lg:py-28 gap-4 sm:gap-6',
        title: 'text-black',
        description: 'text-black/90'
      }"
    >
      <template #top>
        <div class="absolute inset-0 -z-10">
          <img
            src="/images/PictureForBresil2026/20241116_124447.jpg"
            alt=""
            class="w-full h-full object-cover"
            style="object-position: 50% 65%"
          >
          <div class="absolute inset-0 bg-white/30" />
        </div>
      </template>
    </UPageHero>

    <!-- Intro -->
    <UPageSection :ui="{ container: 'pt-2 sm:pt-4 lg:pt-6' }">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-lg text-muted">
          {{ t('trips.intro') }}
        </p>
        <UButton
          :label="t('trips.bookCta')"
          :to="localePath('/contact')"
          size="xl"
          class="mt-6"
        />
      </div>
    </UPageSection>

    <!-- Itinerary -->
    <UPageSection
      :title="t('trips.itinerary.title')"
      :ui="{ container: 'pt-6 sm:pt-8 lg:pt-10' }"
    >
      <div class="max-w-3xl mx-auto space-y-12">
        <div
          v-for="phase in itineraryPhases"
          :key="phase"
          :class="phaseImages[phase] ? 'lg:grid lg:grid-cols-3 lg:gap-8' : ''"
        >
          <div :class="phaseImages[phase] ? 'lg:col-span-2' : ''">
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
                <div class="font-bold">
                  <p>{{ t(`trips.itinerary.${phase}.priceNote.label`) }}</p>
                  <p>{{ t(`trips.itinerary.${phase}.priceNote.single`) }}</p>
                  <p>{{ t(`trips.itinerary.${phase}.priceNote.double`) }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="phaseImages[phase]"
            class="relative mt-6 lg:mt-0 h-80 lg:h-full rounded-lg overflow-hidden"
          >
            <img
              :src="phaseImages[phase]"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
            >
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- Closing image -->
    <UPageSection>
      <img
        src="/images/PictureForBresil2026/20251027_172009.jpg"
        alt=""
        class="w-full max-w-4xl mx-auto rounded-lg"
      >
      <div class="text-center mt-6">
        <UButton
          :label="t('trips.bookCta')"
          :to="localePath('/contact')"
          size="xl"
        />
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
