import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useThemeStore } from './store/theme'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Apply saved theme on initial load
const themeStore = useThemeStore()
themeStore.apply()
