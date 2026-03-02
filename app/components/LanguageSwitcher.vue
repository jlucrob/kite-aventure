<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() =>
  locales.value.find(l => l.code !== locale.value)
)
</script>

<template>
  <UButton
    v-if="otherLocale"
    :to="switchLocalePath(otherLocale.code)"
    variant="ghost"
    color="neutral"
    size="sm"
  >
    {{ otherLocale.name }}
  </UButton>
</template>
