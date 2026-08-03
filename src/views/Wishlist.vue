<template>
  <div class="wishlist-page container">
    <h1>Your Wishlist</h1>

    <div v-if="wishlistStore.items.length" class="wishlist-grid">
      <ProductCard v-for="p in wishlistStore.items" :key="p.id" :product="p" />
    </div>

    <div v-else class="empty card">
      <p>You haven't added anything to your wishlist yet.</p>
      <router-link to="/shop" class="btn btn-primary">Browse Products</router-link>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '../store/wishlist'
import ProductCard from '../components/ProductCard.vue'

const wishlistStore = useWishlistStore()
</script>

<style scoped>
.wishlist-page { padding: 48px 24px 80px; }
.wishlist-page h1 { margin-bottom: 28px; }

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.empty {
  text-align: center;
  padding: 60px;
}
.empty p { margin-bottom: 18px; color: var(--color-text-muted); }

@media (max-width: 980px) {
  .wishlist-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .wishlist-grid { grid-template-columns: 1fr; }
}
</style>
