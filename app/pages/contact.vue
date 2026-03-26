<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('contact.seo.title'),
  description: () => t('contact.seo.description')
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('contact.title')"
      :description="t('contact.subtitle')"
    />

    <UPageSection>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div>
          <ContactForm />
        </div>

        <!-- Contact Info -->
        <div class="flex flex-col gap-6">
          <h2 class="text-2xl font-bold">
            {{ t('contact.info.title') }}
          </h2>

          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-map-pin"
                class="text-primary text-xl shrink-0"
              />
              <span>{{ t('contact.info.address') }}</span>
            </div>
            <!-- <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-phone"
                class="text-primary text-xl shrink-0"
              />
              <span>{{ t('contact.info.phone') }}</span>
            </div> -->
            <!-- <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-mail"
                class="text-primary text-xl shrink-0"
              />
              <span>{{ t('contact.info.email') }}</span>
            </div> -->
          </div>

          <div class="flex items-center gap-4 mt-2">
            <UButton
              to="https://www.facebook.com/kiteaventureqc"
              target="_blank"
              icon="i-simple-icons-facebook"
              color="primary"
              variant="ghost"
              size="xl"
              aria-label="Facebook"
            />
            <UButton
              to="https://www.instagram.com/kiteaventureqc/"
              target="_blank"
              icon="i-simple-icons-instagram"
              color="primary"
              variant="ghost"
              size="xl"
              aria-label="Instagram"
            />
          </div>

          <!-- Map Placeholder
          <div class="w-full h-64 bg-elevated rounded-lg flex items-center justify-center">
            <div class="text-center text-muted">
              <UIcon name="i-lucide-map" class="text-4xl mb-2" />
              <p>Google Maps</p>
            </div>
          </div>
          -->
        </div>
      </div>
    </UPageSection>
  </div>
</template>
