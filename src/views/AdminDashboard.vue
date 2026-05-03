<template>
  <div class="admin-page container">
    <div v-if="!authStore.isLoggedIn" class="gate card">
      <h3>Admin Access Required</h3>
      <p>Please log in with an admin account to view the dashboard.</p>
      <router-link to="/login" class="btn btn-primary">Go to Login</router-link>
    </div>

    <div v-else-if="!authStore.isAdmin" class="gate card">
      <h3>Access Denied</h3>
      <p>Your account does not have admin privileges.</p>
      <router-link to="/" class="btn btn-primary">Back to Home</router-link>
    </div>

    <div v-else class="dashboard">
      <div class="dash-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage and review all registered CartS users.</p>
        </div>
        <div class="dash-stats">
          <div class="stat">
            <strong>{{ authStore.users.length }}</strong>
            <span>Total Users</span>
          </div>
          <div class="stat">
            <strong>{{ customerCount }}</strong>
            <span>Customers</span>
          </div>
          <div class="stat">
            <strong>{{ productStore.items.length }}</strong>
            <span>Products Listed</span>
          </div>
        </div>
      </div>

      <div class="table-card card">
        <div class="table-toolbar">
          <input v-model="search" type="text" placeholder="Search users by name or email..." />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUsers" :key="u.id">
              <td>#{{ u.id }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>
                <span class="role-badge" :class="u.role">{{ u.role }}</span>
              </td>
              <td>{{ u.joined }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="!filteredUsers.length" class="no-results">No users match your search.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useProductStore } from '../store/products'

const authStore = useAuthStore()
const productStore = useProductStore()
const search = ref('')

const customerCount = computed(() => authStore.users.filter((u) => u.role === 'customer').length)

const filteredUsers = computed(() => {
  if (!search.value.trim()) return authStore.users
  const q = search.value.toLowerCase()
  return authStore.users.filter(
    (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.admin-page { padding: 48px 24px 80px; }

.gate {
  max-width: 420px;
  margin: 80px auto;
  text-align: center;
  padding: 40px;
}
.gate p { color: var(--color-text-muted); margin: 10px 0 20px; font-size: 13.5px; }

.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 32px;
}
.dash-header p { color: var(--color-text-muted); font-size: 13.5px; }

.dash-stats {
  display: flex;
  gap: 24px;
}
.stat {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 14px 22px;
  text-align: center;
  min-width: 110px;
}
.stat strong {
  display: block;
  font-size: 22px;
  font-family: var(--font-heading);
  color: var(--color-navy);
}
[data-theme='dark'] .stat strong { color: var(--color-accent-dark); }
.stat span {
  font-size: 11.5px;
  color: var(--color-text-muted);
}

.table-card { padding: 22px; }
.table-toolbar { margin-bottom: 16px; }
.table-toolbar input {
  width: 100%;
  max-width: 320px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 13px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
thead th {
  text-align: left;
  padding: 12px;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
tbody td {
  padding: 13px 12px;
  border-bottom: 1px solid var(--color-border);
}
tbody tr:hover { background: var(--color-navy-soft); }

.role-badge {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: capitalize;
}
.role-badge.admin {
  background: var(--color-navy);
  color: var(--color-bg);
}
[data-theme='dark'] .role-badge.admin { color: var(--color-bg-alt); }
.role-badge.customer {
  background: var(--color-navy-soft);
  color: var(--color-navy);
}
[data-theme='dark'] .role-badge.customer { color: var(--color-accent-dark); }

.no-results {
  text-align: center;
  color: var(--color-text-muted);
  padding: 24px;
}
</style>
