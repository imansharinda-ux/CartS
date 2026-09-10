<template>
  <div class="chatbot-wrap">
    <transition name="pop">
      <div v-if="open" class="chat-panel card">
        <div class="chat-header">
          <div>
            <p class="chat-title">CartS Assistant</p>
            <p class="chat-sub">Ask me about any product</p>
          </div>
          <button class="close-btn" @click="open = false">✕</button>
        </div>

        <div class="chat-body" ref="bodyRef">
          <div v-for="(m, i) in messages" :key="i" class="msg" :class="m.from">
            <p v-html="m.text"></p>
          </div>
        </div>

        <div class="quick-chips">
          <button v-for="q in quickPrompts" :key="q" @click="ask(q)">{{ q }}</button>
        </div>

        <form class="chat-input" @submit.prevent="ask(draft)">
          <input v-model="draft" type="text" placeholder="e.g. Do you have leather wallets under 5000?" />
          <button type="submit" class="btn btn-primary">➤</button>
        </form>
      </div>
    </transition>

    <button class="fab" @click="open = !open">
      <span v-if="!open">💬</span>
      <span v-else>✕</span>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useProductStore } from '../store/products'

const productStore = useProductStore()
const open = ref(false)
const draft = ref('')
const bodyRef = ref(null)

const quickPrompts = [
  'Show me new deals',
  'Cheapest leather item',
  'Selfcare products',
  'Do you ship in Sri Lanka?'
]

const messages = ref([
  {
    from: 'bot',
    text: "Hi! I'm the CartS assistant 👋 I can help you find products, check prices, or answer questions about categories and shipping. Try asking about accessories, clothing, selfcare or leather goods!"
  }
])

function formatProduct(p) {
  return `<strong>${p.name}</strong> — Rs. ${p.offerPrice.toLocaleString()} <span style="opacity:.6">(was Rs. ${p.price.toLocaleString()})</span><br/><span style="font-size:12px;opacity:.75">${p.category} · ⭐ ${p.rating} (${p.reviews} reviews)</span>`
}

function ask(text) {
  const q = (text || draft.value).trim()
  if (!q) return
  messages.value.push({ from: 'user', text: q })
  draft.value = ''
  scrollDown()

  setTimeout(() => {
    messages.value.push({ from: 'bot', text: buildReply(q) })
    scrollDown()
  }, 400)
}

function buildReply(question) {
  const q = question.toLowerCase()

  if (q.includes('ship') || q.includes('deliver')) {
    return 'Yes! CartS ships island-wide across Sri Lanka. Colombo orders usually arrive within 1-2 days, and other districts within 3-5 days. All prices shown are in Sri Lankan Rupees (LKR).'
  }

  if (q.includes('new deal') || q.includes('new arrival')) {
    const items = productStore.newDeals.slice(0, 3)
    if (!items.length) return "We don't have any new deals right now, please check back soon!"
    return 'Here are some of our newest deals:<br/><br/>' + items.map(formatProduct).join('<br/><br/>')
  }

  const categories = productStore.categories
  const matchedCategory = categories.find((c) => q.includes(c))
  if (matchedCategory) {
    const items = productStore.byCategory(matchedCategory).slice(0, 3)
    return `Here are some ${matchedCategory} items we have:<br/><br/>` + items.map(formatProduct).join('<br/><br/>')
  }

  if (q.includes('cheap') || q.includes('under') || q.includes('budget')) {
    const priceMatch = q.match(/\d+/)
    const budget = priceMatch ? Number(priceMatch[0]) : null
    let pool = productStore.items
    if (q.includes('leather')) pool = pool.filter((p) => p.category === 'leather goods')
    if (budget) pool = pool.filter((p) => p.offerPrice <= budget)
    const sorted = [...pool].sort((a, b) => a.offerPrice - b.offerPrice).slice(0, 3)
    if (!sorted.length) return "I couldn't find anything matching that, try a different budget or category!"
    return 'Here you go:<br/><br/>' + sorted.map(formatProduct).join('<br/><br/>')
  }

  const nameMatch = productStore.items.find((p) => q.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()))
  if (nameMatch) {
    return formatProduct(nameMatch) + `<br/><br/>${nameMatch.description}`
  }

  return `I can help with product prices, categories (accessories, clothing, selfcare, leather goods), new deals, and shipping info. Could you rephrase your question, or try one of the quick options below?`
}

function scrollDown() {
  nextTick(() => {
    if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
  })
}
</script>

<style scoped>
.chatbot-wrap {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}

.fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: var(--color-navy);
  color: var(--color-bg);
  font-size: 24px;
  box-shadow: var(--shadow-soft);
}
[data-theme='dark'] .fab { color: var(--color-bg-alt); }

.chat-panel {
  width: 320px;
  max-height: 460px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--color-navy);
  color: var(--color-bg);
}
[data-theme='dark'] .chat-header { color: var(--color-bg-alt); }
.chat-title { margin: 0; font-weight: 700; font-size: 14px; }
.chat-sub { margin: 2px 0 0; font-size: 11.5px; opacity: 0.8; }
.close-btn {
  background: none;
  border: none;
  color: inherit;
  font-size: 15px;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.msg p {
  margin: 0;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12.8px;
  line-height: 1.5;
  max-width: 90%;
}
.msg.bot p {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
}
.msg.user {
  display: flex;
  justify-content: flex-end;
}
.msg.user p {
  background: var(--color-navy);
  color: var(--color-bg);
}
[data-theme='dark'] .msg.user p { color: var(--color-bg-alt); }

.quick-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 14px 10px;
}
.quick-chips button {
  font-size: 10.8px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
}
.quick-chips button:hover {
  background: var(--color-navy-soft);
}

.chat-input {
  display: flex;
  border-top: 1px solid var(--color-border);
  padding: 10px;
  gap: 8px;
}
.chat-input input {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12.5px;
  background: var(--color-bg);
  color: var(--color-text);
  outline: none;
}
.chat-input .btn {
  width: 38px;
  height: 38px;
  padding: 0;
  border-radius: 50%;
}

.pop-enter-active, .pop-leave-active { transition: all 0.2s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(12px) scale(0.98); }

@media (max-width: 480px) {
  .chat-panel { width: 88vw; }
}
</style>
