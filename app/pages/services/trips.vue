<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('trips.seo.title'),
  description: () => t('trips.seo.description')
})

const destinations = computed(() => {
  const raw = tm('trips.destinations.items')
  if (!Array.isArray(raw)) return []
  return raw.map(d => ({
    name: rt(d.name),
    description: rt(d.description),
    season: rt(d.season)
  }))
})

const includedItems = computed(() => {
  const raw = tm('trips.included.items')
  if (!Array.isArray(raw)) return []
  return raw.map(item => rt(item))
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('trips.title')"
      :description="t('trips.subtitle')"
      :links="[
        /* { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const } */
        { label: t('contactUs'), to: localePath('/contact'), trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const }
      ]"
    />

    <!-- Intro -->
    <UPageSection>
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-lg text-muted">
          {{ t('trips.intro') }}
        </p>
      </div>
    </UPageSection>

    <!-- Destinations -->
    <UPageSection :title="t('trips.destinations.title')">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UPageCard
          v-for="(dest, index) in destinations"
          :key="index"
          :title="dest.name"
          :description="dest.description"
        >
          <template #header>
            <div
              class="w-full h-48 bg-elevated flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-palmtree"
                class="text-5xl text-primary"
              />
            </div>
          </template>
          <template #footer>
            <UBadge
              color="primary"
              variant="subtle"
              icon="i-lucide-calendar"
            >
              {{ dest.season }}
            </UBadge>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <!-- What's Included -->
    <UPageSection :title="t('trips.included.title')">
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
    </UPageSection>

    <!-- CTA -->
    <UPageSection>
      <UPageCTA
        :title="t('home.cta')"
        :description="t('home.ctaDescription')"
        :links="[
          /* { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const } */
          { label: t('contactUs'), to: localePath('/contact'), trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const }
        ]"
      />
    </UPageSection>
  </div>
</template>
