<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="foot-brand">
        <router-link to="/" class="brand">
          <img src="/logo.svg" alt="CartS logo" />
          <span>Cart<em>S</em></span>
        </router-link>
        <p>
          CartS brings Sri Lanka's finest local craftsmanship — accessories, clothing, selfcare
          and leather goods — to your doorstep, all in one elegant marketplace.
        </p>
        <div class="socials">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">◎</a>
          <a href="#" aria-label="X">𝕏</a>
        </div>
      </div>

      <div class="foot-col">
        <h5>Quick Links</h5>
        <router-link to="/">Home</router-link>
        <router-link to="/shop">Shop</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>

      <div class="foot-col">
        <h5>Categories</h5>
        <router-link to="/shop?category=accessories">Accessories</router-link>
        <router-link to="/shop?category=clothing">Clothing</router-link>
        <router-link to="/shop?category=selfcare">Selfcare</router-link>
        <router-link to="/shop?category=leather goods">Leather Goods</router-link>
      </div>

      <div class="foot-col">
        <h5>Contact Us</h5>
        <p>📍 No. 45, Galle Road, Colombo 03, Sri Lanka</p>
        <p>📞 +94 77 123 4567</p>
        <p>✉️ hello@carts.lk</p>
      </div>
    </div>

    <div class="foot-bottom container">
      <p>© {{ year }} CartS. All rights reserved.</p>
      <p>Made with care for Sri Lankan shoppers 🇱🇰</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  background: var(--color-navy);
  color: var(--color-bg);
  margin-top: 60px;
}
[data-theme='dark'] .site-footer { color: var(--color-bg-alt); }

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 32px;
  padding: 56px 24px 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.brand img { width: 38px; height: 38px; }
.brand span {
  font-family: var(--font-heading);
  font-size: 21px;
  font-weight: 700;
}
.brand em { font-style: normal; color: var(--color-accent); }

.foot-brand p {
  font-size: 13px;
  line-height: 1.7;
  opacity: 0.8;
  max-width: 320px;
}

.socials {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.socials a {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.foot-col h5 {
  font-family: var(--font-heading);
  font-size: 15px;
  margin-bottom: 16px;
}
.foot-col a, .foot-col p {
  display: block;
  font-size: 13px;
  opacity: 0.82;
  margin-bottom: 10px;
}

.foot-bottom {
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
  border-top: 1px solid rgba(255,255,255,0.15);
  font-size: 12px;
  opacity: 0.75;
}

@media (max-width: 860px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .foot-bottom { flex-direction: column; gap: 6px; text-align: center; }
}
</style>
