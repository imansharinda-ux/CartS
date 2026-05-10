<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Get in Touch</span>
        <h1>Contact CartS</h1>
        <p>We'd love to hear from you — questions, feedback, or partnership ideas.</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-grid">
        <div class="contact-info">
          <div class="info-card card">
            <span>📍</span>
            <div>
              <h4>Visit Us</h4>
              <p>No. 45, Galle Road, Colombo 03, Sri Lanka</p>
            </div>
          </div>
          <div class="info-card card">
            <span>📞</span>
            <div>
              <h4>Call Us</h4>
              <p>+94 77 123 4567</p>
            </div>
          </div>
          <div class="info-card card">
            <span>✉️</span>
            <div>
              <h4>Email Us</h4>
              <p>hello@carts.lk</p>
            </div>
          </div>
          <div class="info-card card">
            <span>🕐</span>
            <div>
              <h4>Working Hours</h4>
              <p>Mon – Sat, 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        <form class="contact-form card" @submit.prevent="submit">
          <h3>Send us a message</h3>
          <div class="form-row">
            <input v-model="form.name" type="text" placeholder="Full Name" required />
            <input v-model="form.email" type="email" placeholder="Email Address" required />
          </div>
          <input v-model="form.subject" type="text" placeholder="Subject" required />
          <textarea v-model="form.message" rows="5" placeholder="Your message..." required></textarea>
          <button type="submit" class="btn btn-primary">Send Message</button>
          <p v-if="sent" class="sent-note">Thanks! Your message has been noted. We'll get back to you soon.</p>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const sent = ref(false)

function submit() {
  sent.value = true
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
  setTimeout(() => (sent.value = false), 4000)
}
</script>

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

.contact-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 32px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.info-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 20px;
}
.info-card span { font-size: 22px; }
.info-card h4 { margin: 0 0 4px; font-size: 14.5px; }
.info-card p { margin: 0; font-size: 13px; color: var(--color-text-muted); }

.contact-form {
  padding: 32px;
}
.contact-form h3 { margin-bottom: 20px; }
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 13.5px;
  margin-bottom: 14px;
  resize: vertical;
}
.sent-note {
  margin-top: 12px;
  color: var(--color-success);
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 860px) {
  .contact-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
