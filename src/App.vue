<template>
  <div class="app-shell">
    <NavBar />
    <main class="fade-in">
      <router-view />
    </main>
    <SiteFooter />
    <ChatBot />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import ChatBot from './components/ChatBot.vue'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
