import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import Wishlist from '../views/Wishlist.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ProductDetail from '../views/ProductDetail.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/shop', name: 'shop', component: Shop },
  { path: '/product/:id', name: 'product', component: ProductDetail },
  { path: '/about', name: 'about', component: About },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/login', name: 'login', component: Login },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/wishlist', name: 'wishlist', component: Wishlist },
  { path: '/admin', name: 'admin', component: AdminDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
