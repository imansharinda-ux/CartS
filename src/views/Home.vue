<template>
  <div class="home">
    <!-- Welcoming / Hero Section -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-text">
          <span class="eyebrow">Sri Lanka's Elegant Marketplace</span>
          <h1>Discover Craft, Comfort &amp; Style — Delivered to You</h1>
          <p>
            Welcome to <strong>CartS</strong>, your home for handpicked accessories, clothing,
            selfcare essentials and leather goods — all made with care, priced fairly in Rupees,
            and delivered island-wide.
          </p>
          <div class="hero-actions">
            <router-link to="/shop" class="btn btn-primary">Start Shopping</router-link>
            <router-link to="/about" class="btn btn-outline">Our Story</router-link>
          </div>
          <div class="hero-stats">
            <div><strong>12k+</strong><span>Happy Customers</span></div>
            <div><strong>4.7★</strong><span>Average Rating</span></div>
            <div><strong>25</strong><span>Districts Served</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=700&q=80" alt="CartS curated products" />
          <div class="floating-card">
            <span class="badge badge-offer">-30%</span>
            <p>New user deals live now</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction / Market Analysis Section -->
    <section class="section intro">
      <div class="container intro-grid">
        <div class="intro-copy">
          <span class="eyebrow">Who We Are</span>
          <h2>Built for Sri Lanka's Growing Online Shopper</h2>
          <p>
            CartS was founded to bridge the gap between talented local makers and Sri Lanka's
            fast-growing base of digital shoppers. With e-commerce adoption in Sri Lanka rising
            year over year and consumers increasingly seeking trustworthy, locally-relevant
            platforms, CartS focuses on curated quality over mass-market clutter.
          </p>
          <p>
            We studied the local market closely: shoppers want fair Rupee pricing, fast island-wide
            delivery, authentic product photography and genuine reviews — not inflated marketplace
            noise. That insight shapes every corner of CartS, from our simple checkout to our
            hand-vetted seller network.
          </p>
        </div>
        <div class="intro-stats">
          <div class="stat-card card">
            <h3>68%</h3>
            <p>of Sri Lankan shoppers now prefer buying accessories &amp; apparel online</p>
          </div>
          <div class="stat-card card">
            <h3>Rs. 2,500+</h3>
            <p>average basket value across CartS's growing customer base</p>
          </div>
          <div class="stat-card card">
            <h3>4</h3>
            <p>curated categories: Accessories, Clothing, Selfcare, Leather Goods</p>
          </div>
          <div class="stat-card card">
            <h3>1–5 days</h3>
            <p>average delivery time across all 25 districts</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop by Category -->
    <section class="section category-section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Browse</span>
          <h2>Shop by Category</h2>
          <p>Four carefully curated collections, each vetted for quality and authenticity.</p>
        </div>
        <div class="category-grid">
          <CategoryCard v-for="c in categoryMeta" :key="c.key" :category="c" />
        </div>
      </div>
    </section>

    <!-- New User Deals -->
    <section class="section deals-section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Limited Time</span>
          <h2>New User Deals</h2>
          <p>Fresh arrivals and special offer prices, picked just for first-time CartS shoppers.</p>
        </div>
        <div class="deals-grid">
          <ProductCard v-for="p in dealProducts" :key="p.id" :product="p" />
        </div>
        <div class="deals-cta">
          <router-link to="/shop" class="btn btn-accent">View All Products in Shop →</router-link>
        </div>
      </div>
    </section>

    <!-- About Us -->
    <section class="section about-section">
      <div class="container about-grid">
        <div class="about-visual">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80" alt="CartS artisans at work" />
        </div>
        <div class="about-copy">
          <span class="eyebrow">About CartS</span>
          <h2>Elegant Products, Honest Prices, Local Roots</h2>
          <p>
            CartS is a Sri Lankan e-commerce organization built around one idea: shopping online
            should feel as trustworthy and personal as buying from your favourite local store. We
            partner directly with artisans, small workshops, and quality-focused suppliers across
            the island to bring you accessories, clothing, selfcare products and leather goods that
            are made to last.
          </p>
          <p>
            Every product listed on CartS goes through a simple internal review — checking
            craftsmanship, materials, and fair pricing in Sri Lankan Rupees — before it reaches our
            shelves. Our mission is simple: support local makers, delight our customers, and grow
            a shopping platform Sri Lanka can call its own.
          </p>
          <ul class="about-points">
            <li>✔ 100% Sri Lankan Rupee pricing, no hidden conversions</li>
            <li>✔ Verified local sellers &amp; authentic product photography</li>
            <li>✔ Island-wide delivery with real-time order tracking</li>
            <li>✔ Dedicated customer support &amp; easy returns</li>
          </ul>
          <router-link to="/about" class="btn btn-primary">Learn More About Us</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '../store/products'
import ProductCard from '../components/ProductCard.vue'
import CategoryCard from '../components/CategoryCard.vue'

const productStore = useProductStore()

const dealProducts = computed(() => productStore.newDeals.slice(0, 6))

const categoryIcons = {
  accessories: '💍',
  clothing: '👗',
  selfcare: '🧴',
  'leather goods': '🧳'
}

const categoryMeta = computed(() =>
  productStore.categories.map((key) => ({
    key,
    label: key,
    icon: categoryIcons[key] || '🛍',
    count: productStore.byCategory(key).length
  }))
)
</script>

<style scoped>
.eyebrow {
  display: inline-block;
  letter-spacing: 3px;
  font-size: 12px;
  text-transform: uppercase;
  color: var(--color-accent-dark);
  font-weight: 600;
  margin-bottom: 12px;
}

/* Hero */
.hero {
  background: linear-gradient(180deg, var(--color-bg-alt), var(--color-bg));
  padding: 64px 0 40px;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}
.hero-text h1 {
  font-size: 42px;
  line-height: 1.2;
  margin-bottom: 18px;
}
.hero-text p {
  color: var(--color-text-muted);
  font-size: 15.5px;
  line-height: 1.8;
  max-width: 520px;
  margin-bottom: 26px;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-bottom: 40px;
}
.hero-stats {
  display: flex;
  gap: 36px;
}
.hero-stats div {
  display: flex;
  flex-direction: column;
}
.hero-stats strong {
  font-family: var(--font-heading);
  font-size: 22px;
  color: var(--color-navy);
}
[data-theme='dark'] .hero-stats strong { color: var(--color-accent-dark); }
.hero-stats span {
  font-size: 12px;
  color: var(--color-text-muted);
}

.hero-visual {
  position: relative;
}
.hero-visual img {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  width: 100%;
  aspect-ratio: 4/3.4;
  object-fit: cover;
}
.floating-card {
  position: absolute;
  bottom: -24px;
  left: -24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-soft);
}
.floating-card p {
  margin: 0;
  font-size: 12.5px;
  font-weight: 600;
}

/* Intro / market analysis */
.intro-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}
.intro-copy h2 { font-size: 30px; margin-bottom: 16px; }
.intro-copy p {
  color: var(--color-text-muted);
  font-size: 14.5px;
  line-height: 1.8;
  margin-bottom: 14px;
}
.intro-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.stat-card {
  padding: 22px;
}
.stat-card h3 {
  font-size: 24px;
  color: var(--color-navy);
  margin-bottom: 6px;
}
[data-theme='dark'] .stat-card h3 { color: var(--color-accent-dark); }
.stat-card p {
  margin: 0;
  font-size: 12.5px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* Category */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* Deals */
.deals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.deals-cta {
  text-align: center;
  margin-top: 40px;
}

/* About */
.about-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 48px;
  align-items: center;
}
.about-visual img {
  border-radius: var(--radius-lg);
  width: 100%;
  aspect-ratio: 4/3.6;
  object-fit: cover;
  box-shadow: var(--shadow-soft);
}
.about-copy h2 { font-size: 30px; margin-bottom: 16px; }
.about-copy p {
  color: var(--color-text-muted);
  font-size: 14.5px;
  line-height: 1.8;
  margin-bottom: 14px;
}
.about-points {
  list-style: none;
  padding: 0;
  margin: 20px 0 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13.5px;
}

@media (max-width: 980px) {
  .hero-inner, .intro-grid, .about-grid { grid-template-columns: 1fr; }
  .category-grid { grid-template-columns: repeat(2, 1fr); }
  .deals-grid { grid-template-columns: repeat(2, 1fr); }
  .about-visual { order: -1; }
}
@media (max-width: 560px) {
  .deals-grid { grid-template-columns: 1fr; }
  .intro-stats { grid-template-columns: 1fr; }
  .hero-stats { flex-wrap: wrap; gap: 20px; }
}
</style>
