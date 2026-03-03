<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('services.seo.title'),
  description: () => t('services.seo.description')
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('services.title')"
      :description="t('services.subtitle')"
    />

    <UPageSection>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- School Card -->
        <UPageCard
          :title="t('services.schoolCard.title')"
          :description="t('services.schoolCard.description')"
        >
          <!-- <template #header>
            <div class="w-full h-48 bg-elevated flex items-center justify-center">
              <UIcon name="i-lucide-graduation-cap" class="text-5xl text-primary" />
            </div>
          </template> -->
          <template #footer>
            <UButton
              :to="localePath('/services/school')"
              color="primary"
              variant="subtle"
              trailing-icon="i-lucide-arrow-right"
            >
              {{ t('services.schoolCard.link') }}
            </UButton>
          </template>
        </UPageCard>

        <!-- Trips Card -->
        <UPageCard
          :title="t('services.tripsCard.title')"
          :description="t('services.tripsCard.description')"
        >
          <!-- <template #header>
            <div class="w-full h-48 bg-elevated flex items-center justify-center">
              <UIcon name="i-lucide-plane" class="text-5xl text-primary" />
            </div>
          </template> -->
          <template #footer>
            <UButton
              :to="localePath('/services/trips')"
              color="primary"
              variant="subtle"
              trailing-icon="i-lucide-arrow-right"
            >
              {{ t('services.tripsCard.link') }}
            </UButton>
          </template>
        </UPageCard>
      </div>
    </UPageSection>
  </div>
</template>
