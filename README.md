# 🌿 Vriksham Boutique

> Built with love for my mom's saree business. ❤️

**Vriksham Boutique** is a premium handpicked saree boutique based in Chennai, Tamil Nadu. This website was designed and developed as a personal project for my mother's business — a place where every saree is chosen with care, rooted in tradition, and delivered with love across India.

---

## About the Business

Vriksham Boutique offers handpicked sarees for every occasion — weddings, festivals, office, and everyday elegance. Sourced directly from master weavers in Kanchipuram, Varanasi, and Rajasthan, every piece is personally curated.

- 📍 Based in Chennai, Tamil Nadu
- 📦 Pan-India delivery
- 💬 WhatsApp-first ordering experience
- ⭐ 5-star customer satisfaction

**Instagram:** [@vriksham_.boutique](https://instagram.com/vriksham_.boutique)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Inline styles + Tailwind CSS |
| Animations | GSAP + ScrollTrigger, Framer Motion |
| Smooth Scroll | Lenis |
| WebGL | OGL (custom GLSL shader) |
| Auth | Firebase Authentication |
| Payments | Razorpay |
| Fonts | Playfair Display, Inter (Google Fonts) |

---

## Features

- **Cinematic loading screen** — SVG tree draws itself branch by branch, splits to reveal the site
- **WebGL hero** — custom GLSL simplex noise shader with animated golden light blobs and firefly particles
- **Horizontal saree gallery** — 8 pinned panels with silk sheen animation and paisley SVG frames
- **GSAP scroll animations** — text morphing, clip-path reveals, word-by-word color transitions
- **Catalog** — filter by material, occasion, price; product detail with WhatsApp enquiry and Razorpay checkout
- **Admin dashboard** — Firebase-protected product and order management
- **Pre-filled WhatsApp messages** — every contact button opens a relevant enquiry in WhatsApp

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=919944136595
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Project Structure

```
app/
  page.tsx          # Homepage (hero, gallery, testimonials, CTA)
  catalog/          # Product listing + detail pages
  about/            # Brand story
  admin/            # Firebase-protected dashboard
  api/razorpay/     # Server-side order creation
components/
  home/             # All homepage sections (OGL, GSAP, loading screen)
  Navbar.tsx
  Footer.tsx
  WhatsAppButton.tsx
lib/
  products.ts       # Product data
  firebase.ts       # Firebase config
  razorpay.ts       # Razorpay helpers
```

---

*This project was built by me as a gift to my mom. Every design decision — from the gold color palette to the handpicked saree philosophy — reflects her taste, her warmth, and the love she puts into every piece she sells.*
