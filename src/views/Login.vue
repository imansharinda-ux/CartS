<template>
  <div class="login-page">
    <div class="login-visual">
      <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="CartS" />
      <div class="overlay">
        <img src="/logo.svg" class="overlay-logo" alt="CartS" />
        <h2>Welcome to CartS</h2>
        <p>Sign in to track orders, save your wishlist and enjoy a faster checkout.</p>
      </div>
    </div>

    <div class="login-form-wrap">
      <div class="form-card">
        <div class="tabs">
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Login</button>
          <button :class="{ active: mode === 'register' }" @click="mode = 'register'">Register</button>
        </div>

        <form v-if="mode === 'login'" @submit.prevent="handleLogin">
          <label>Email</label>
          <input v-model="loginForm.email" type="email" required placeholder="you@example.com" />
          <label>Password</label>
          <input v-model="loginForm.password" type="password" required placeholder="••••••••" />
          <p v-if="error" class="error-text">{{ error }}</p>
          <button type="submit" class="btn btn-primary full">Login</button>
          <p class="hint">
            Try admin: <code>admin@carts.lk</code> / <code>admin123</code><br />
            Or customer: <code>nimasha@carts.lk</code> / <code>user123</code>
          </p>
        </form>

        <form v-else @submit.prevent="handleRegister">
          <label>Full Name</label>
          <input v-model="registerForm.name" type="text" required placeholder="Your name" />
          <label>Email</label>
          <input v-model="registerForm.email" type="email" required placeholder="you@example.com" />
          <label>Password</label>
          <input v-model="registerForm.password" type="password" required placeholder="Create a password" />
          <p v-if="error" class="error-text">{{ error }}</p>
          <button type="submit" class="btn btn-primary full">Create Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const mode = ref('login')
const error = ref('')

const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ name: '', email: '', password: '' })

function handleLogin() {
  error.value = ''
  const result = authStore.login(loginForm.email, loginForm.password)
  if (!result.success) {
    error.value = result.message
    return
  }
  router.push(result.user.role === 'admin' ? '/admin' : '/')
}

function handleRegister() {
  error.value = ''
  const result = authStore.register(registerForm)
  if (!result.success) {
    error.value = result.message
    return
  }
  router.push('/')
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 300px);
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.login-visual {
  position: relative;
}
.login-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11,37,69,0.55), rgba(11,37,69,0.85));
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
}
.overlay-logo { width: 64px; height: 64px; margin-bottom: 18px; }
.overlay h2 { color: #fff; font-size: 26px; margin-bottom: 10px; }
.overlay p { font-size: 13.5px; opacity: 0.9; max-width: 320px; }

.login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}
.form-card {
  width: 100%;
  max-width: 380px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 26px;
}
.tabs button {
  flex: 1;
  background: none;
  border: none;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  border-bottom: 2px solid transparent;
}
.tabs button.active {
  color: var(--color-navy);
  border-color: var(--color-accent);
}
[data-theme='dark'] .tabs button.active { color: var(--color-accent-dark); }

form label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-text-muted);
}
form input {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 13.5px;
}
.full { width: 100%; padding: 13px; }

.error-text {
  color: var(--color-danger);
  font-size: 12.5px;
  margin: -8px 0 14px;
}
.hint {
  margin-top: 16px;
  font-size: 11.5px;
  color: var(--color-text-muted);
  line-height: 1.7;
  text-align: center;
}
.hint code {
  background: var(--color-bg-alt);
  padding: 1px 5px;
  border-radius: 4px;
}

@media (max-width: 860px) {
  .login-page { grid-template-columns: 1fr; }
  .login-visual { display: none; }
}
</style>
