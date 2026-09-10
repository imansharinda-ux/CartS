<template>
  <div class="product-card card">
    <router-link :to="`/product/${product.id}`" class="thumb-wrap">
      <img :src="product.image" :alt="product.name" class="thumb" />
      <span v-if="product.isNew" class="badge badge-new corner">New</span>
      <span v-if="discountPercent > 0" class="badge badge-offer corner corner-right">
        -{{ discountPercent }}%
      </span>
      <button class="wish-btn" :class="{ active: isWishlisted }" @click.prevent="toggleWishlist" title="Add to wishlist">
        {{ isWishlisted ? '♥' : '♡' }}
      </button>
    </router-link>

    <div class="info">
      <p class="category">{{ product.category }}</p>
      <router-link :to="`/product/${product.id}`">
        <h4 class="name">{{ product.name }}</h4>
      </router-link>
      <p class="desc">{{ product.description }}</p>

      <div class="rating">
        <span class="stars">{{ starString }}</span>
        <span class="rating-num">{{ product.rating }}</span>
        <span class="reviews">({{ product.reviews }} reviews)</span>
      </div>

      <div class="price-row">
        <div>
          <span v-if="product.offerPrice < product.price" class="price-strike">
            Rs. {{ product.price.toLocaleString() }}
          </span>
          <span class="price-final">Rs. {{ product.offerPrice.toLocaleString() }}</span>
        </div>
        <button class="btn btn-primary add-btn" @click="cartStore.add(product)">Add</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../store/cart'
import { useWishlistStore } from '../store/wishlist'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isWishlisted = computed(() => wishlistStore.isWishlisted(props.product.id))

const discountPercent = computed(() => {
  if (!props.product.price || props.product.offerPrice >= props.product.price) return 0
  return Math.round(((props.product.price - props.product.offerPrice) / props.product.price) * 100)
})

const starString = computed(() => {
  const full = Math.round(props.product.rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
})

function toggleWishlist() {
  wishlistStore.toggle(props.product)
}
</script>

<style scoped>
.product-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
}

.thumb-wrap {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3.2;
  overflow: hidden;
  background: var(--color-bg-alt);
}
.thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card:hover .thumb { transform: scale(1.06); }

.corner {
  position: absolute;
  top: 10px;
  left: 10px;
}
.corner-right {
  left: auto;
  right: 10px;
}

.wish-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  color: var(--color-danger);
  font-size: 16px;
}
.wish-btn.active {
  background: var(--color-danger);
  color: #fff;
}

.info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.category {
  margin: 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-accent-dark);
  font-weight: 600;
}

.name {
  margin: 0;
  font-size: 16.5px;
  line-height: 1.3;
}

.desc {
  margin: 0;
  font-size: 12.5px;
  color: var(--color-text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}
.stars { color: var(--color-accent); letter-spacing: 1px; }
.rating-num { font-weight: 600; }
.reviews { color: var(--color-text-muted); }

.price-row {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
}

.add-btn {
  padding: 8px 16px;
  font-size: 12.5px;
}
</style>
