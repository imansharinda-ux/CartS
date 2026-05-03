<template>
  <div v-if="product" class="product-detail container">
    <div class="pd-grid">
      <div class="pd-image">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="pd-info">
        <p class="category">{{ product.category }}</p>
        <h1>{{ product.name }}</h1>

        <div class="rating">
          <span class="stars">{{ starString }}</span>
          <span>{{ product.rating }} · {{ product.reviews }} reviews</span>
        </div>

        <div class="price-block">
          <span v-if="product.offerPrice < product.price" class="price-strike">
            Rs. {{ product.price.toLocaleString() }}
          </span>
          <span class="price-final large">Rs. {{ product.offerPrice.toLocaleString() }}</span>
          <span v-if="discountPercent > 0" class="badge badge-offer">-{{ discountPercent }}%</span>
        </div>

        <p class="description">{{ product.description }}</p>

        <p class="stock">
          <span :class="product.stock > 0 ? 'in-stock' : 'out-stock'">
            {{ product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock' }}
          </span>
        </p>

        <div class="qty-row">
          <div class="qty-selector">
            <button @click="qty = Math.max(1, qty - 1)">−</button>
            <span>{{ qty }}</span>
            <button @click="qty++">+</button>
          </div>
          <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
          <button class="btn btn-outline wish" @click="wishlistStore.toggle(product)">
            {{ isWishlisted ? '♥ Wishlisted' : '♡ Wishlist' }}
          </button>
        </div>

        <ul class="perks">
          <li>🚚 Island-wide delivery, 1–5 business days</li>
          <li>🔄 7-day easy returns</li>
          <li>💰 Cash on delivery available</li>
        </ul>
      </div>
    </div>

    <hr class="divider" />

    <section class="related">
      <h3>You might also like</h3>
      <div class="related-grid">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
  <div v-else class="container not-found">
    <p>Product not found.</p>
    <router-link to="/shop" class="btn btn-primary">Back to Shop</router-link>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { useWishlistStore } from '../store/wishlist'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const qty = ref(1)
const product = computed(() => productStore.getById(route.params.id))
const isWishlisted = computed(() => product.value && wishlistStore.isWishlisted(product.value.id))

watch(() => route.params.id, () => { qty.value = 1; window.scrollTo(0, 0) })

const discountPercent = computed(() => {
  if (!product.value || product.value.offerPrice >= product.value.price) return 0
  return Math.round(((product.value.price - product.value.offerPrice) / product.value.price) * 100)
})

const starString = computed(() => {
  if (!product.value) return ''
  const full = Math.round(product.value.rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
})

const related = computed(() => {
  if (!product.value) return []
  return productStore.byCategory(product.value.category)
    .filter((p) => p.id !== product.value.id)
    .slice(0, 3)
})

function addToCart() {
  for (let i = 0; i < qty.value; i++) cartStore.add(product.value)
}
</script>

<style scoped>
.product-detail { padding: 48px 24px 80px; }
.pd-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}
.pd-image img {
  width: 100%;
  border-radius: var(--radius-lg);
  aspect-ratio: 1/1;
  object-fit: cover;
  box-shadow: var(--shadow-soft);
}
.category {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent-dark);
  margin: 0 0 6px;
}
.pd-info h1 { font-size: 30px; margin-bottom: 12px; }
.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 18px;
}
.stars { color: var(--color-accent); }
.price-block {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.price-final.large { font-size: 26px; }
.description {
  color: var(--color-text-muted);
  line-height: 1.8;
  font-size: 14.5px;
  margin-bottom: 16px;
}
.stock { margin-bottom: 20px; font-size: 13.5px; }
.in-stock { color: var(--color-success); font-weight: 600; }
.out-stock { color: var(--color-danger); font-weight: 600; }

.qty-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 26px;
  flex-wrap: wrap;
}
.qty-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}
.qty-selector button {
  width: 36px;
  height: 40px;
  background: var(--color-bg-alt);
  border: none;
  font-size: 16px;
}
.qty-selector span {
  width: 34px;
  text-align: center;
  font-weight: 600;
}

.perks {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.related h3 { margin-bottom: 20px; }
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.not-found { text-align: center; padding: 100px 24px; }

@media (max-width: 860px) {
  .pd-grid { grid-template-columns: 1fr; }
  .related-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .related-grid { grid-template-columns: 1fr; }
}
</style>
