<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('error.404.title'),
  description: () => t('error.404.description'),
  robots: 'noindex, follow'
})

const handleHome = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UPageHero
        :title="t('error.404.title')"
        :description="t('error.404.description')"
      >
        <template #links>
          <UButton
            :label="t('error.404.backHome')"
            size="xl"
            @click="handleHome"
          />
        </template>
      </UPageHero>
    </NuxtLayout>
  </UApp>
</template>
