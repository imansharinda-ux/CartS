import { defineStore } from 'pinia'
import dummy from '../data/dummy.json'

export const useProductStore = defineStore('products', {
  state: () => ({
    items: dummy.products
  }),
  getters: {
    categories: (state) => {
      const set = new Set(state.items.map((p) => p.category))
      return Array.from(set)
    },
    newDeals: (state) => state.items.filter((p) => p.isNew),
    byCategory: (state) => (category) =>
      category === 'all' ? state.items : state.items.filter((p) => p.category === category),
    getById: (state) => (id) => state.items.find((p) => p.id === Number(id))
  }
})
