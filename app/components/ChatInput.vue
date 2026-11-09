<script setup lang="ts">
const props = defineProps<{ disabled?: boolean; autofocus?: boolean }>()
const emit = defineEmits<{ submit: [text: string] }>()

const text = ref('')
const el = ref<HTMLTextAreaElement>()

function submit() {
  const value = text.value.trim()
  if (!value || props.disabled) return
  emit('submit', value)
  text.value = ''
}

// Enter sends, Shift+Enter = new line; ignore Enter while an IME is composing
function onEnter(e: KeyboardEvent) {
  if (e.isComposing) return
  e.preventDefault()
  submit()
}

onMounted(() => { if (props.autofocus) el.value?.focus() })
</script>

<template>
  <form
    class="flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30"
    @submit.prevent="submit"
  >
    <textarea
      ref="el"
      v-model="text"
      dir="auto"
      rows="1"
      :placeholder="$t('chat.placeholder')"
      class="field-sizing-content max-h-40 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted"
      @keydown.enter.exact="onEnter"
    />
    <button
      type="submit"
      class="btn btn-primary size-10 shrink-0 p-0 disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="disabled || !text.trim()"
      :aria-label="$t('common.send')"
    >
      <Icon name="lucide:arrow-up" />
    </button>
  </form>
</template>