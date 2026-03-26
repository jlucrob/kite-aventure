<script setup lang="ts">
const { t } = useI18n()
const formStatus = ref('')

const handleSubmit = async (event: Event) => {
  try {
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const submitterName = formData.get('name') as string
    formData.set('subject', `Kite Aventure - Formulaire de contact - Par ${submitterName}`)
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
    })
    formStatus.value = 'success'
    form.reset()
  } catch {
    formStatus.value = 'error'
  }
}
</script>

<template>
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    class="flex flex-col gap-5 max-w-lg"
    @submit.prevent="handleSubmit"
  >
    <input
      type="hidden"
      name="subject"
      value=""
    />
    <input
      type="hidden"
      name="form-name"
      value="contact"
    >
    <input
      type="hidden"
      name="bot-field"
    >

    <UFormField :label="t('contact.form.name')">
      <UInput
        name="name"
        type="text"
        required
        class="w-full"
      />
    </UFormField>

    <UFormField :label="t('contact.form.email')">
      <UInput
        name="email"
        type="email"
        required
        class="w-full"
      />
    </UFormField>

    <UFormField :label="t('contact.form.phone')">
      <UInput
        name="phone"
        type="tel"
        class="w-full"
      />
    </UFormField>

    <UFormField :label="t('contact.form.message')">
      <UTextarea
        name="message"
        required
        class="w-full"
        :rows="5"
      />
    </UFormField>

    <UButton
      type="submit"
      color="primary"
      size="xl"
      class="self-end uppercase"
    >
      {{ t('contact.form.submit') }}
    </UButton>

    <UAlert
      v-if="formStatus === 'success'"
      color="success"
      icon="i-lucide-check-circle"
      :title="t('contact.form.success')"
    />
    <UAlert
      v-if="formStatus === 'error'"
      color="error"
      icon="i-lucide-alert-circle"
      :title="t('contact.form.error')"
    />
  </form>
</template>
