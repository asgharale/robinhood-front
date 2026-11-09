export interface ChatSource { title: string; url?: string }
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: ChatSource[]
  error?: boolean
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export function useChat() {
  const { $api } = useNuxtApp()
  const { t } = useI18n()

  const messages = useState<ChatMessage[]>('chat:messages', () => [])
  const loading = useState('chat:loading', () => false)
  const pending = useState<string | null>('chat:pending', () => null)

  async function send(text: string) {
    const content = text.trim()
    if (!content || loading.value) return

    const history = messages.value
      .filter(m => !m.error)
      .slice(-10)
      .map(({ role, content }) => ({ role, content }))

    messages.value.push({ id: uid(), role: 'user', content })
    loading.value = true

    try {
      const res = await $api<{ answer: string; sources?: ChatSource[] }>('/chat/', {
        method: 'POST',
        body: { message: content, history },
      })
      messages.value.push({ id: uid(), role: 'assistant', content: res.answer, sources: res.sources })
    } catch {
      messages.value.push({ id: uid(), role: 'assistant', content: t('chat.error'), error: true })
    } finally {
      loading.value = false
    }
  }

  function reset() {
    messages.value = []
    pending.value = null
  }

  return { messages, loading, pending, send, reset }
}