<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="container nav-inner">
      <router-link to="/" class="brand">
        <img src="/logo.svg" alt="CartS logo" class="brand-logo" />
        <span class="brand-name">Cart<em>S</em></span>
      </router-link>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/shop" @click="closeMenu">Shop</router-link>
        <router-link to="/about" @click="closeMenu">About</router-link>
        <router-link to="/contact" @click="closeMenu">Contact</router-link>
      </nav>

      <div class="nav-search">
        <SearchBar />
      </div>

      <div class="nav-actions">
        <button class="icon-btn" title="Toggle night mode" @click="themeStore.toggle()">
          <span v-if="themeStore.mode === 'light'">🌙</span>
          <span v-else>☀️</span>
        </button>

        <router-link class="icon-btn" to="/wishlist" title="Wishlist">
          ♡
          <span v-if="wishlistStore.count" class="count-badge">{{ wishlistStore.count }}</span>
        </router-link>

        <router-link class="icon-btn" to="/cart" title="Cart">
          🛍
          <span v-if="cartStore.totalItems" class="count-badge">{{ cartStore.totalItems }}</span>
        </router-link>

        <div class="account-menu">
          <router-link v-if="!authStore.isLoggedIn" to="/login" class="btn btn-outline nav-login">
            Login
          </router-link>
          <div v-else class="account-dropdown">
            <button class="btn btn-outline nav-login">Hi, {{ firstName }}</button>
            <div class="dropdown-panel">
              <router-link v-if="authStore.isAdmin" to="/admin">Admin Dashboard</router-link>
              <router-link to="/wishlist">My Wishlist</router-link>
              <router-link to="/cart">My Cart</router-link>
              <button @click="handleLogout">Logout</button>
            </div>
          </div>
        </div>

        <button class="burger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../store/theme'
import { useCartStore } from '../store/cart'
import { useWishlistStore } from '../store/wishlist'
import { useAuthStore } from '../store/auth'
import SearchBar from './SearchBar.vue'

const themeStore = useThemeStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()
const router = useRouter()

const menuOpen = ref(false)
const scrolled = ref(false)

const firstName = computed(() => authStore.currentUser?.name?.split(' ')[0] || '')

function closeMenu() {
  menuOpen.value = false
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid transparent;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
.navbar.scrolled {
  box-shadow: var(--shadow-soft);
  border-color: var(--color-border);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.brand-logo {
  width: 42px;
  height: 42px;
}
.brand-name {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-navy);
  letter-spacing: 0.5px;
}
.brand-name em {
  font-style: normal;
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  gap: 26px;
  margin-right: auto;
  margin-left: 12px;
}
.nav-links a {
  font-size: 14.5px;
  font-weight: 500;
  color: var(--color-text);
  position: relative;
  padding: 6px 0;
}
.nav-links a.router-link-exact-active {
  color: var(--color-navy);
  font-weight: 700;
}
[data-theme='dark'] .nav-links a.router-link-exact-active { color: var(--color-accent-dark); }
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0%;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.25s ease;
}
.nav-links a:hover::after { width: 100%; }

.nav-search { width: 240px; }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-size: 17px;
  color: var(--color-text);
  transition: background 0.2s ease, transform 0.2s ease;
}
.icon-btn:hover {
  background: var(--color-navy-soft);
  transform: translateY(-1px);
}

.count-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-danger);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-login {
  padding: 9px 18px;
  font-size: 13.5px;
  white-space: nowrap;
}

.account-dropdown {
  position: relative;
}
.dropdown-panel {
  display: none;
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  min-width: 180px;
  padding: 8px;
  flex-direction: column;
}
.account-dropdown:hover .dropdown-panel,
.account-dropdown:focus-within .dropdown-panel {
  display: flex;
}
.dropdown-panel a,
.dropdown-panel button {
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-text);
  font-family: var(--font-body);
}
.dropdown-panel a:hover,
.dropdown-panel button:hover {
  background: var(--color-navy-soft);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  padding: 8px;
}
.burger span {
  width: 22px;
  height: 2px;
  background: var(--color-text);
}

@media (max-width: 980px) {
  .nav-search { display: none; }
}

@media (max-width: 860px) {
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: 16px 24px;
    display: none;
    gap: 14px;
  }
  .nav-links.open { display: flex; }
  .burger { display: flex; }
  .nav-login span { display: none; }
}
</style>
