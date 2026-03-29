<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('team.seo.title'),
  description: () => t('team.seo.description')
})

const memberImages = [
  { src: '/images/JL_et_SL_compressed.png', position: 'object-top' },
  { src: '/images/DSC06158_compressed.jpg', position: 'object-center' },
  { src: '/images/Benoit.JPG', position: 'object-top' }
]

const members = computed(() => {
  const raw = tm('team.members') as Array<{ name: string, role: string, bio: string }>
  if (!Array.isArray(raw)) return []
  return raw.map((m: { name: string, role: string, bio: string }, i: number) => ({
    name: rt(m.name),
    role: rt(m.role),
    bio: rt(m.bio),
    image: memberImages[i]?.src ?? '',
    imagePosition: memberImages[i]?.position ?? 'object-top'
  }))
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('team.title')"
      :description="t('team.subtitle')"
      :ui="{ container: 'pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-4 lg:pb-6 gap-4 sm:gap-6' }"
    />

    <UPageSection>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UPageCard
          v-for="(member, index) in members"
          :key="index"
          :ui="{ header: 'mb-2' }"
        >
          <template #header>
            <div
              class="w-full overflow-hidden"
              style="aspect-ratio: 4/3"
            >
              <img
                :src="member.image"
                :alt="member.name"
                :class="`w-full h-full object-cover ${member.imagePosition}`"
              >
            </div>
          </template>
          <template #body>
            <div class="flex flex-col gap-3">
              <p class="text-xl font-semibold text-highlighted">
                {{ member.name }}
              </p>
              <UBadge
                color="primary"
                variant="subtle"
                size="lg"
                class="self-start"
              >
                {{ member.role }}
              </UBadge>
              <p class="text-base text-muted">
                {{ member.bio }}
              </p>
            </div>
          </template>
        </UPageCard>
      </div>
    </UPageSection>
  </div>
</template>
