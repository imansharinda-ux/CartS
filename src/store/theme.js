import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: localStorage.getItem('carts-theme') || 'light'
  }),
  actions: {
    toggle() {
      this.mode = this.mode === 'light' ? 'dark' : 'light'
      this.apply()
    },
    apply() {
      document.documentElement.setAttribute('data-theme', this.mode)
      localStorage.setItem('carts-theme', this.mode)
    }
  }
})
