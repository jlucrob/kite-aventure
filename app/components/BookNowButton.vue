<script setup>
const { t } = useI18n()
</script>

<template>
  <UButton
    href="#"
    target="_blank"
    rel="noopener"
    color="primary"
    size="sm"
    icon="i-lucide-calendar"
  >
    {{ t('bookNow') }}
  </UButton>
</template>
