import { defineStore } from 'pinia'

const STORAGE_KEY = 'carts-wishlist'

function persist(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }),
  getters: {
    isWishlisted: (state) => (id) => state.items.some((i) => i.id === id),
    count: (state) => state.items.length
  },
  actions: {
    toggle(product) {
      const exists = this.items.find((i) => i.id === product.id)
      if (exists) {
        this.items = this.items.filter((i) => i.id !== product.id)
      } else {
        this.items.push(product)
      }
      persist(this.items)
    },
    remove(id) {
      this.items = this.items.filter((i) => i.id !== id)
      persist(this.items)
    }
  }
})
