<template>
  <div class="cart-page container">
    <h1>Your Cart</h1>

    <div v-if="cartStore.items.length" class="cart-layout">
      <div class="cart-list">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item card">
          <img :src="item.image" :alt="item.name" />
          <div class="item-info">
            <p class="cat">{{ item.category }}</p>
            <h4>{{ item.name }}</h4>
            <p class="unit-price">Rs. {{ item.offerPrice.toLocaleString() }} each</p>
          </div>
          <div class="qty-selector">
            <button @click="cartStore.updateQty(item.id, item.qty - 1)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="cartStore.updateQty(item.id, item.qty + 1)">+</button>
          </div>
          <p class="line-total">Rs. {{ (item.offerPrice * item.qty).toLocaleString() }}</p>
          <button class="remove-btn" @click="cartStore.remove(item.id)">✕</button>
        </div>
      </div>

      <div class="summary card">
        <h3>Order Summary</h3>
        <div class="row"><span>Subtotal</span><span>Rs. {{ cartStore.totalPrice.toLocaleString() }}</span></div>
        <div class="row"><span>Delivery</span><span>{{ deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}` }}</span></div>
        <hr class="divider" />
        <div class="row total"><span>Total</span><span>Rs. {{ (cartStore.totalPrice + deliveryFee).toLocaleString() }}</span></div>
        <button class="btn btn-primary full" @click="checkout">Proceed to Checkout</button>
        <p v-if="message" class="msg-note">{{ message }}</p>
      </div>
    </div>

    <div v-else class="empty card">
      <p>Your cart is empty.</p>
      <router-link to="/shop" class="btn btn-primary">Browse Products</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()
const message = ref('')

const deliveryFee = computed(() => (cartStore.totalPrice >= 10000 || cartStore.totalPrice === 0 ? 0 : 350))

function checkout() {
  message.value = 'This is a demo checkout — order placed successfully! 🎉'
  cartStore.clear()
}
</script>

<style scoped>
.cart-page { padding: 48px 24px 80px; }
.cart-page h1 { margin-bottom: 28px; }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cart-item {
  display: grid;
  grid-template-columns: 70px 1fr auto auto auto;
  align-items: center;
  gap: 16px;
  padding: 14px;
}
.cart-item img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
.item-info .cat {
  margin: 0;
  font-size: 10.5px;
  text-transform: uppercase;
  color: var(--color-accent-dark);
  font-weight: 600;
}
.item-info h4 { margin: 2px 0; font-size: 14.5px; }
.unit-price { margin: 0; font-size: 12px; color: var(--color-text-muted); }

.qty-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
}
.qty-selector button {
  width: 28px;
  height: 32px;
  background: none;
  border: none;
  font-size: 14px;
}
.qty-selector span { width: 26px; text-align: center; font-size: 13px; }

.line-total {
  font-weight: 700;
  color: var(--color-navy);
  white-space: nowrap;
}
[data-theme='dark'] .line-total { color: var(--color-accent-dark); }

.remove-btn {
  background: none;
  border: none;
  color: var(--color-danger);
  font-size: 15px;
}

.summary {
  padding: 24px;
  position: sticky;
  top: 90px;
}
.summary h3 { margin-bottom: 16px; }
.row {
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;
  margin-bottom: 10px;
  color: var(--color-text-muted);
}
.row.total {
  color: var(--color-text);
  font-weight: 700;
  font-size: 15px;
}
.full { width: 100%; margin-top: 10px; padding: 13px; }
.msg-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--color-success);
  text-align: center;
}

.empty {
  text-align: center;
  padding: 60px;
}
.empty p { margin-bottom: 18px; color: var(--color-text-muted); }

@media (max-width: 860px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-item { grid-template-columns: 60px 1fr; grid-template-areas: "img info" "qty total"; }
}
</style>
