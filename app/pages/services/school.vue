<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('school.seo.title'),
  description: () => t('school.seo.description')
})

useSchemaOrg([
  defineCourse({
    name: 'Cours de kitesurf débutant',
    description: 'Apprenez le kitesurf avec nos instructeurs certifiés à Québec.',
    provider: { '@id': '#identity' }
  })
])

const includedItems = computed(() => {
  const raw = tm('school.included.items')
  if (!Array.isArray(raw)) return []
  return raw.map(item => rt(item))
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('school.title')"
      :description="t('school.subtitle')"
      :links="[
        { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const }
      ]"
    />

    <!-- Intro -->
    <UPageSection>
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-lg text-muted">
          {{ t('school.intro') }}
        </p>
      </div>
    </UPageSection>

    <!-- Lesson Levels -->
    <UPageSection :title="t('school.levels.title')">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Beginner -->
        <UPageCard
          :title="t('school.levels.beginner.title')"
          :description="t('school.levels.beginner.description')"
        >
          <template #header>
            <div class="w-full h-32 bg-elevated flex items-center justify-center">
              <UIcon name="i-lucide-baby" class="text-4xl text-primary" />
            </div>
          </template>
          <template #footer>
            <UBadge color="primary" variant="subtle">
              {{ t('school.levels.beginner.duration') }}
            </UBadge>
          </template>
        </UPageCard>

        <!-- Intermediate -->
        <UPageCard
          :title="t('school.levels.intermediate.title')"
          :description="t('school.levels.intermediate.description')"
        >
          <template #header>
            <div class="w-full h-32 bg-elevated flex items-center justify-center">
              <UIcon name="i-lucide-trending-up" class="text-4xl text-primary" />
            </div>
          </template>
          <template #footer>
            <UBadge color="primary" variant="subtle">
              {{ t('school.levels.intermediate.duration') }}
            </UBadge>
          </template>
        </UPageCard>

        <!-- Advanced -->
        <UPageCard
          :title="t('school.levels.advanced.title')"
          :description="t('school.levels.advanced.description')"
        >
          <template #header>
            <div class="w-full h-32 bg-elevated flex items-center justify-center">
              <UIcon name="i-lucide-rocket" class="text-4xl text-primary" />
            </div>
          </template>
          <template #footer>
            <UBadge color="primary" variant="subtle">
              {{ t('school.levels.advanced.duration') }}
            </UBadge>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <!-- What's Included -->
    <UPageSection :title="t('school.included.title')">
      <div class="max-w-2xl mx-auto">
        <ul class="space-y-3">
          <li v-for="(item, index) in includedItems" :key="index" class="flex items-center gap-3">
            <UIcon name="i-lucide-check-circle" class="text-primary shrink-0" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </UPageSection>

    <!-- Pricing -->
    <UPageSection>
      <UPageCTA
        :title="t('school.pricing.title')"
        :description="t('school.pricing.note')"
        :links="[
          { label: t('bookNow'), to: '#', target: '_blank', trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const }
        ]"
      />
    </UPageSection>
  </div>
</template>
