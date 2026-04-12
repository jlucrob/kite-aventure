<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('faq.seo.title'),
  description: () => t('faq.seo.description')
})

const faqItems = computed(() => {
  const raw = tm('faq.items') as Array<{ question: string, answer: string }>
  if (!Array.isArray(raw)) return []
  return raw.map((item: { question: string, answer: string }) => ({
    label: rt(item.question),
    content: rt(item.answer)
  }))
})

const rawFaqItems = tm('faq.items') as Array<{ question: string, answer: string }>
useSchemaOrg([
  {
    '@type': 'FAQPage',
    mainEntity: Array.isArray(rawFaqItems)
      ? rawFaqItems.map(item => ({
          '@type': 'Question',
          name: rt(item.question),
          acceptedAnswer: {
            '@type': 'Answer',
            text: rt(item.answer)
          }
        }))
      : []
  }
])
</script>

<template>
  <div>
    <UPageHero
      :title="t('faq.title')"
      :description="t('faq.subtitle')"
      :ui="{ container: 'pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-4 lg:pb-6 gap-4 sm:gap-6' }"
    />

    <UPageSection>
      <div class="max-w-3xl mx-auto">
        <UAccordion
          :items="faqItems"
          :ui="{
            item: 'border-b border-(--ui-border) last:border-b-0',
            trigger: 'py-5 text-base font-semibold hover:text-primary transition-colors cursor-pointer w-full text-left',
            content: 'pb-5 text-muted leading-relaxed whitespace-pre-line'
          }"
        />
      </div>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        :title="t('faq.cta.title')"
        :description="t('faq.cta.description')"
        :links="[
          { label: t('contactUs'), to: localePath('/contact'), trailingIcon: 'i-lucide-arrow-right', size: 'lg' as const }
        ]"
      />
    </UPageSection>
  </div>
</template>
