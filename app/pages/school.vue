<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

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

const conditionItems = computed(() => {
  const raw = tm('school.conditions.items') as string[]
  if (!Array.isArray(raw)) return []
  return raw.map((item: string) => rt(item))
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('school.title')"
      :description="t('school.subtitle')"
      :ui="{ container: 'pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-4 lg:pb-6 gap-4 sm:gap-6' }"
    />

    <!-- Pricing Section -->
    <UPageSection :title="t('school.pricing.title')">
      <div class="max-w-3xl mx-auto space-y-8">

        <!-- Intro paragraph -->
        <p class="text-lg text-muted">
          {{ t('school.pricing.intro') }}
        </p>

        <!-- Prerequisites -->
        <div>
          <h3 class="text-lg font-semibold mb-4">
            {{ t('school.conditions.title') }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="(item, index) in conditionItems"
              :key="index"
              class="flex items-start gap-3"
            >
              <UIcon
                name="i-lucide-check-circle"
                class="text-primary shrink-0 mt-0.5"
              />
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Equipment included note -->
        <p class="text-muted font-bold">
          {{ t('school.included.note') }}
        </p>

        <!-- Pricing table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th class="border border-default bg-elevated px-4 py-2 text-left" />
                <th class="border border-default bg-elevated px-4 py-2 text-center font-semibold">
                  3h
                </th>
                <th class="border border-default bg-elevated px-4 py-2 text-center font-semibold">
                  6h
                </th>
                <th class="border border-default bg-elevated px-4 py-2 text-center font-semibold">
                  9h
                </th>
                <th class="border border-default bg-elevated px-4 py-2 text-center font-semibold">
                  {{ t('school.pricing.additionalHour') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-default px-4 py-2 font-medium">
                  {{ t('school.pricing.private') }}
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  400$
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  750$
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  1 050$
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  140$/h
                </td>
              </tr>
              <tr>
                <td class="border border-default px-4 py-2 font-medium">
                  {{ t('school.pricing.double') }}*
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  600$
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  1 100$
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  1 500$
                </td>
                <td class="border border-default px-4 py-2 text-center">
                  210$/h
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Double note -->
        <p class="text-sm text-muted">
          {{ t('school.pricing.doubleNote') }}
        </p>

        <!-- Capacity note -->
        <p class="font-semibold text-primary">
          {{ t('school.pricing.capacityNote') }}
        </p>
      </div>
    </UPageSection>

    <!-- How to Register -->
    <UPageSection :title="t('school.register.title')">
      <div class="max-w-2xl mx-auto space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
          <p class="text-muted pt-0.5">
            <NuxtLink
              to="#"
              class="text-primary underline"
            >
              {{ t('school.register.step1.label') }}
            </NuxtLink>
          </p>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
          <p class="text-muted pt-0.5">
            <NuxtLink
              to="#"
              class="text-primary underline"
            >
              {{ t('school.register.step2.label') }}
            </NuxtLink>
          </p>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
          <p class="text-muted pt-0.5">
            {{ t('school.register.step3') }}
          </p>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</span>
          <p class="text-muted pt-0.5">
            {{ t('school.register.step4') }}
          </p>
        </div>
      </div>
    </UPageSection>

    <!-- Contact CTA -->
    <UPageSection>
      <div class="flex justify-center">
        <UButton
          :label="t('contactUs')"
          :to="localePath('/contact')"
          trailing-icon="i-lucide-arrow-right"
          size="lg"
        />
      </div>
    </UPageSection>
  </div>
</template>
