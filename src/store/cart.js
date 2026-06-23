import { defineStore } from 'pinia'

const STORAGE_KEY = 'carts-cart'

function persist(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, i) => sum + i.qty * (i.offerPrice || i.price), 0)
  },
  actions: {
    add(product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.qty += 1
      } else {
        this.items.push({ ...product, qty: 1 })
      }
      persist(this.items)
    },
    remove(id) {
      this.items = this.items.filter((i) => i.id !== id)
      persist(this.items)
    },
    updateQty(id, qty) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.qty = Math.max(1, qty)
      persist(this.items)
    },
    clear() {
      this.items = []
      persist(this.items)
    }
  }
})
