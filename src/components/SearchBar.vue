<template>
  <form class="search-form" @submit.prevent="runSearch">
    <span class="search-icon">🔍</span>
    <input
      v-model="query"
      type="text"
      placeholder="Search products..."
      @focus="showResults = true"
      @blur="hideDelayed"
    />
    <ul v-if="showResults && query && matches.length" class="results">
      <li v-for="p in matches" :key="p.id" @mousedown="goToProduct(p.id)">
        <img :src="p.image" :alt="p.name" />
        <div>
          <p class="r-name">{{ p.name }}</p>
          <p class="r-price">Rs. {{ p.offerPrice.toLocaleString() }}</p>
        </div>
      </li>
    </ul>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../store/products'

const query = ref('')
const showResults = ref(false)
const router = useRouter()
const productStore = useProductStore()

const matches = computed(() => {
  if (!query.value.trim()) return []
  const q = query.value.toLowerCase()
  return productStore.items
    .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    .slice(0, 5)
})

function goToProduct(id) {
  router.push(`/product/${id}`)
  query.value = ''
}

function runSearch() {
  if (query.value.trim()) {
    router.push({ path: '/shop', query: { q: query.value } })
    showResults.value = false
  }
}

function hideDelayed() {
  setTimeout(() => (showResults.value = false), 150)
}
</script>

<style scoped>
.search-form {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0 14px;
  height: 40px;
}
.search-icon {
  font-size: 13px;
  opacity: 0.6;
  margin-right: 6px;
}
.search-form input {
  border: none;
  outline: none;
  background: none;
  font-family: var(--font-body);
  font-size: 13.5px;
  color: var(--color-text);
  width: 100%;
}
.results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  list-style: none;
  margin: 0;
  padding: 6px;
  z-index: 50;
}
.results li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.results li:hover {
  background: var(--color-navy-soft);
}
.results img {
  width: 34px;
  height: 34px;
  object-fit: cover;
  border-radius: 6px;
}
.r-name {
  margin: 0;
  font-size: 12.5px;
  font-weight: 500;
}
.r-price {
  margin: 0;
  font-size: 11.5px;
  color: var(--color-text-muted);
}
</style>
