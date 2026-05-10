<template>
  <div class="shop-page">
    <section class="shop-hero">
      <div class="container">
        <span class="eyebrow">The Full Collection</span>
        <h1>Shop All Products</h1>
        <p>Accessories, clothing, selfcare and leather goods — all in Sri Lankan Rupees.</p>
      </div>
    </section>

    <div class="container shop-layout">
      <aside class="filters card">
        <h4>Categories</h4>
        <button
          class="cat-btn"
          :class="{ active: activeCategory === 'all' }"
          @click="setCategory('all')"
        >
          All Products <span>{{ productStore.items.length }}</span>
        </button>
        <button
          v-for="c in productStore.categories"
          :key="c"
          class="cat-btn"
          :class="{ active: activeCategory === c }"
          @click="setCategory(c)"
        >
          {{ c }} <span>{{ productStore.byCategory(c).length }}</span>
        </button>

        <hr class="divider" />

        <h4>Sort By</h4>
        <select v-model="sortBy" class="sort-select">
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </aside>

      <section class="results">
        <div class="results-bar">
          <p>{{ filteredProducts.length }} products found <span v-if="searchQuery">for "{{ searchQuery }}"</span></p>
        </div>

        <div v-if="filteredProducts.length" class="product-grid">
          <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
        </div>
        <div v-else class="empty-state card">
          <p>No products matched your filters. Try a different category or search term.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../store/products'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()

const activeCategory = ref(route.query.category || 'all')
const searchQuery = ref(route.query.q || '')
const sortBy = ref('default')

watch(
  () => route.query,
  (q) => {
    activeCategory.value = q.category || 'all'
    searchQuery.value = q.q || ''
  }
)

function setCategory(cat) {
  activeCategory.value = cat
  router.push({ path: '/shop', query: cat === 'all' ? {} : { category: cat } })
}

const filteredProducts = computed(() => {
  let list = productStore.byCategory(activeCategory.value)

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    )
  }

  const sorted = [...list]
  if (sortBy.value === 'price-asc') sorted.sort((a, b) => a.offerPrice - b.offerPrice)
  if (sortBy.value === 'price-desc') sorted.sort((a, b) => b.offerPrice - a.offerPrice)
  if (sortBy.value === 'rating') sorted.sort((a, b) => b.rating - a.rating)

  return sorted
})
</script>

<style scoped>
.shop-hero {
  background: var(--color-navy);
  color: var(--color-bg);
  padding: 56px 0;
  text-align: center;
}
[data-theme='dark'] .shop-hero { color: var(--color-bg-alt); }
.shop-hero h1 { font-size: 34px; margin-bottom: 8px; }
.shop-hero p { opacity: 0.85; font-size: 14px; }
.eyebrow {
  display: inline-block;
  letter-spacing: 3px;
  font-size: 12px;
  text-transform: uppercase;
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: 10px;
}

.shop-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 32px;
  padding: 48px 24px 80px;
}

.filters {
  padding: 22px;
  align-self: start;
  position: sticky;
  top: 90px;
}
.filters h4 {
  font-size: 14px;
  margin-bottom: 12px;
}
.cat-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  text-transform: capitalize;
  color: var(--color-text);
  margin-bottom: 4px;
}
.cat-btn span {
  color: var(--color-text-muted);
  font-size: 12px;
}
.cat-btn:hover { background: var(--color-navy-soft); }
.cat-btn.active {
  background: var(--color-navy);
  color: var(--color-bg);
}
[data-theme='dark'] .cat-btn.active { color: var(--color-bg-alt); }
.cat-btn.active span { color: inherit; opacity: 0.75; }

.sort-select {
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 13px;
}

.results-bar {
  margin-bottom: 20px;
  font-size: 13.5px;
  color: var(--color-text-muted);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: var(--color-text-muted);
}

@media (max-width: 980px) {
  .shop-layout { grid-template-columns: 1fr; }
  .filters { position: static; }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .product-grid { grid-template-columns: 1fr; }
}
</style>
