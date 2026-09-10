<template>
  <router-link :to="{ path: '/shop', query: { category: category.key } }" class="cat-card">
    <div class="cat-icon">{{ category.icon }}</div>
    <h4>{{ category.label }}</h4>
    <p>{{ category.count }} items</p>
  </router-link>
</template>

<script setup>
defineProps({
  category: { type: Object, required: true }
})
</script>

<style scoped>
.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  padding: 28px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.cat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-soft);
  border-color: var(--color-accent);
}
.cat-icon {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-navy-soft);
  font-size: 26px;
}
.cat-card h4 {
  margin: 4px 0 0;
  font-size: 15px;
  text-transform: capitalize;
}
.cat-card p {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
