import { defineStore } from 'pinia'
import dummy from '../data/dummy.json'

const STORAGE_KEY = 'carts-users'
const SESSION_KEY = 'carts-session'

function loadUsers() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummy.users))
  return dummy.users
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: loadUsers(),
    currentUser: JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
    isAdmin: (state) => state.currentUser?.role === 'admin'
  },
  actions: {
    login(email, password) {
      const user = this.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )
      if (!user) return { success: false, message: 'Invalid email or password.' }
      this.currentUser = user
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
      return { success: true, user }
    },
    register({ name, email, password }) {
      const exists = this.users.some((u) => u.email.toLowerCase() === email.toLowerCase())
      if (exists) return { success: false, message: 'An account with this email already exists.' }
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: 'customer',
        joined: new Date().toISOString().slice(0, 10)
      }
      this.users.push(newUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
      this.currentUser = newUser
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
      return { success: true, user: newUser }
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem(SESSION_KEY)
    }
  }
})
