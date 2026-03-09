<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('team.seo.title'),
  description: () => t('team.seo.description')
})

const members = computed(() => {
  const raw = tm('team.members') as Array<{ name: string, role: string, bio: string }>
  if (!Array.isArray(raw)) return []
  return raw.map((m: { name: string, role: string, bio: string }) => ({
    name: rt(m.name),
    role: rt(m.role),
    bio: rt(m.bio)
  }))
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('team.title')"
      :description="t('team.subtitle')"
    />

    <UPageSection>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UPageCard
          v-for="(member, index) in members"
          :key="index"
          :title="member.name"
          :description="member.bio"
        >
          <template #header>
            <div
              class="w-full h-48 bg-elevated flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-user"
                class="text-5xl text-muted"
              />
            </div>
          </template>
          <template #footer>
            <UBadge
              color="primary"
              variant="subtle"
            >
              {{ member.role }}
            </UBadge>
          </template>
        </UPageCard>
      </div>
    </UPageSection>
  </div>
</template>
