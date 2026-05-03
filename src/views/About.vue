<template>
  <div class="about-page">
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Our Story</span>
        <h1>About CartS</h1>
        <p>Elegant, honest, locally-rooted e-commerce for Sri Lanka.</p>
      </div>
    </section>

    <section class="section">
      <div class="container narrative">
        <p>
          CartS began with a simple observation: Sri Lanka is full of exceptional local
          craftsmanship — handloom weavers, leather artisans, Ayurvedic-inspired selfcare
          brands — yet much of it stayed offline, undiscovered by the growing number of
          Sri Lankans shopping online every day. We set out to build the platform that would
          change that.
        </p>
        <p>
          Since our founding, CartS has grown into a curated marketplace spanning four core
          categories: accessories, clothing, selfcare, and leather goods. Every seller we
          onboard is reviewed for quality and authenticity, and every price is listed
          transparently in Sri Lankan Rupees, with no confusing conversions or hidden fees.
        </p>
      </div>
    </section>

    <section class="section values-section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">What Drives Us</span>
          <h2>Our Core Values</h2>
        </div>
        <div class="values-grid">
          <div class="value-card card">
            <div class="icon">🤝</div>
            <h4>Local Partnership</h4>
            <p>We work directly with Sri Lankan makers and small businesses, ensuring fair pay and long-term partnerships.</p>
          </div>
          <div class="value-card card">
            <div class="icon">✅</div>
            <h4>Verified Quality</h4>
            <p>Every product listing goes through an internal quality and authenticity check before it reaches our shelves.</p>
          </div>
          <div class="value-card card">
            <div class="icon">💳</div>
            <h4>Transparent Pricing</h4>
            <p>All prices are displayed clearly in LKR, with honest offer prices and no last-minute surprises at checkout.</p>
          </div>
          <div class="value-card card">
            <div class="icon">🚚</div>
            <h4>Reliable Delivery</h4>
            <p>Island-wide shipping across all 25 districts, with tracking and dependable delivery windows.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section mission-section">
      <div class="container mission-grid">
        <div>
          <span class="eyebrow">Our Mission</span>
          <h2>Growing a Marketplace Sri Lanka Can Call Its Own</h2>
          <p>
            Our mission is to become Sri Lanka's most trusted home for lifestyle products —
            one where quality, authenticity and fair pricing come standard, not as a premium.
            We're building CartS to grow alongside the artisans and customers who make it
            what it is.
          </p>
          <router-link to="/shop" class="btn btn-primary">Explore Our Products</router-link>
        </div>
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&q=80" alt="CartS mission" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  background: var(--color-navy);
  color: var(--color-bg);
  text-align: center;
  padding: 64px 0;
}
[data-theme='dark'] .page-hero { color: var(--color-bg-alt); }
.page-hero h1 { font-size: 36px; margin-bottom: 8px; }
.page-hero p { opacity: 0.85; }
.eyebrow {
  display: inline-block;
  letter-spacing: 3px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--color-accent);
}

.narrative {
  max-width: 780px;
  margin: 0 auto;
}
.narrative p {
  font-size: 15px;
  line-height: 1.9;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.values-section { background: var(--color-bg-alt); }
.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.value-card {
  padding: 28px 22px;
  text-align: center;
}
.value-card .icon {
  font-size: 30px;
  margin-bottom: 12px;
}
.value-card h4 { font-size: 15.5px; margin-bottom: 8px; }
.value-card p {
  font-size: 12.5px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.mission-grid h2 { font-size: 28px; margin-bottom: 14px; }
.mission-grid p {
  color: var(--color-text-muted);
  font-size: 14.5px;
  line-height: 1.8;
  margin-bottom: 22px;
}
.mission-grid img {
  border-radius: var(--radius-lg);
  aspect-ratio: 4/3.2;
  object-fit: cover;
  box-shadow: var(--shadow-soft);
}

@media (max-width: 980px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .mission-grid { grid-template-columns: 1fr; }
  .mission-grid img { order: -1; }
}
@media (max-width: 560px) {
  .values-grid { grid-template-columns: 1fr; }
}
</style>
