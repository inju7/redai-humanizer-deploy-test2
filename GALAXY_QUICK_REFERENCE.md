# Premium Galaxy Aesthetic - Quick Reference

## 🌌 Color Swatches

```
🔵 Galaxy Bg (#15173D)      - Main background
🟣 Galaxy Card (#1E104E)     - Card backgrounds  
✨ Glow (#2A176B)            - Top-left shadow
⚫ Void (#0D0E26)            - Bottom-right shadow
🟣 Border (#452E5A)          - Borders & blockquotes
⚪ Off-White (#F1E9E9)       - Primary text
🟡 Gold (#FFC85C)            - Section titles
🌸 Soft Pink (#E491C9)       - Body text
💜 Purple (#982598)          - Button text
🔶 Supernova (#FF653F)       - CTA & accents
```

## 📝 Font Stack (Copy & Paste)

```css
/* SIX CAPS - Hero Headlines */
font-family: var(--font-six-caps);

/* AMERICANA - Section Titles */
font-family: var(--font-americana);

/* OSWALD - Navigation & Headers */
font-family: var(--font-oswald);

/* MONTSERRAT - Body Text */
font-family: var(--font-montserrat);

/* AVANT GARDE - Buttons & Labels */
font-family: var(--font-avant-garde);

/* SACRAMENTO - Accents & Signatures */
font-family: var(--font-sacramento);

/* BOOKMAN - Blockquotes */
font-family: var(--font-bookman);
```

## 🎨 Neumorphic Shadow Formula

```css
/* Raised (Convex) */
box-shadow: 
  8px 8px 20px var(--galaxy-glow),
  -8px -8px 20px var(--galaxy-void);

/* Hover (Enhanced) */
box-shadow: 
  12px 12px 30px var(--galaxy-glow),
  -12px -12px 30px var(--galaxy-void),
  0 0 20px rgba(228, 145, 201, 0.3);

/* Pressed (Concave/Inset) */
box-shadow: 
  inset 2px 2px 5px rgba(0, 0, 0, 0.3),
  inset -1px -1px 3px rgba(152, 37, 152, 0.2);
```

## 🧩 Component Classes

```html
<!-- Cards -->
<div class="galaxy-card">Content</div>
<div class="card">Content</div>

<!-- Hero Section -->
<section class="hero-section">
  <h1>Title</h1>
  <p class="subtitle">Subtitle</p>
  <button class="cta-button">Action</button>
</section>

<!-- Buttons -->
<button class="cta-button">Primary</button>
<button class="btn-primary">Primary Alt</button>
<button class="btn-secondary">Secondary</button>

<!-- Accents -->
<span class="accent-text">Pink text</span>
<span class="gold-accent">Gold text</span>
<span class="orange-accent">Orange text</span>
<span class="special-offer">Sacramento script</span>

<!-- Labels -->
<span class="label">LABEL</span>
<span class="tech-label">TECH</span>
<span class="badge primary">BADGE</span>

<!-- Navigation -->
<nav>
  <a class="nav-link">Link</a>
</nav>

<!-- Tabs -->
<div role="tablist" class="tabs">
  <button role="tab" aria-selected="true">Active</button>
  <button role="tab">Inactive</button>
</div>

<!-- Quote -->
<blockquote>
  Your quote here
  <p class="testimonial-attribution">— Author Name</p>
</blockquote>

<!-- Footer -->
<footer>
  <p class="copyright">© 2026</p>
  <p class="legal"><a href="#">Link</a></p>
</footer>

<!-- Social Icons -->
<div class="social-icons">
  <button class="social-icon">f</button>
</div>
```

## 🎯 Hover States

| Element | Default | Hover |
|---------|---------|-------|
| Card | `#452E5A` border | `#E491C9` border + glow |
| Button | `#FF653F` | `#E491C9` + larger shadow |
| Link | `#F1E9E9` | Gradient underline |
| Input | `#452E5A` border | `#FF653F` border + glow |
| Tab | Inactive text | Gradient underline + color change |

## 💡 Quick Color Map

```
TEXT:
  Primary → #F1E9E9 (Off-white)
  Secondary → #E491C9 (Soft pink)
  Tertiary → #FFC85C (Gold)
  Labels → #FF653F (Orange)

BACKGROUNDS:
  Main → #15173D (Galaxy bg)
  Cards → #1E104E (Deep navy)
  Inputs → rgba(13, 14, 38, 0.8)

BORDERS:
  Default → #452E5A (Purple)
  Hover → #E491C9 (Pink)
  Focus → #FF653F (Orange)

BUTTONS:
  Primary → #FF653F (Orange)
  Hover → #E491C9 (Pink)
  Secondary → Transparent with border
```

## 📱 Responsive Grid

```css
/* Desktop */
.grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }

/* Mobile (≤768px) */
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
  .hero-section { padding: 4rem 1.5rem; }
}
```

## ⚡ Typography Rules

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| h1 | SIX CAPS | 5rem | 700 | #F1E9E9 |
| h2 | AMERICANA | 3rem | 600 | #FFC85C |
| h3 | OSWALD | 1.75rem | 600 | #F1E9E9 |
| h4 | OSWALD | 1rem | 600 | #E491C9 |
| p | MONTSERRAT | 1rem | 400 | #E491C9 |
| label | AVANT GARDE | 0.75rem | 700 | #FFC85C |
| button | AVANT GARDE | 1rem | 700 | #F1E9E9 |
| quote | BOOKMAN | 1.125rem | 500 | #452E5A |

## 🎭 Animation Timing

```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

All interactive elements use this easing for smooth, premium feel.

## 🔍 Key CSS Variables

```css
/* Backgrounds */
--galaxy-bg: #15173D;
--galaxy-card: #1E104E;

/* Shadows */
--galaxy-glow: #2A176B;
--galaxy-void: #0D0E26;

/* Text & Accents */
--galaxy-off-white: #F1E9E9;
--galaxy-gold: #FFC85C;
--galaxy-pink: #E491C9;
--galaxy-purple: #982598;
--galaxy-orange: #FF653F;

/* Borders */
--galaxy-border: #452E5A;
```

## ✨ Special Effects

```css
/* Backdrop blur on header */
backdrop-filter: blur(10px);

/* Glassmorphism on social icons */
background: rgba(255, 101, 63, 0.1);
backdrop-filter: blur(10px);

/* Gradient orbs in background */
radial-gradient(circle, rgba(152, 37, 152, 0.15) 0%, transparent 70%);

/* Shimmer animation */
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

## 🔨 Troubleshooting

| Issue | Fix |
|-------|-----|
| Text invisible | Use `.galaxy-off-white` color |
| Shadows missing | Check both glow & void in box-shadow |
| Cards flat | Add full neumorphic shadow |
| Fonts wrong | Verify `var(--font-*) in CSS |
| Colors muted | Check opacity values in rgba() |

## 📊 Build Info

- **CSS File**: 108.71 kB (18.21 kB gzipped)
- **Fonts**: 7 × Google Fonts
- **Colors**: 10 CSS variables
- **Fonts**: 7 typography families
- **Transitions**: 0.3s cubic-bezier
- **Status**: ✅ Production Ready

## 🎯 All Features Working

✅ Dashboard (Essay, Detection, Grammar, Email)  
✅ Pricing Tab  
✅ About Tab  
✅ Credit System  
✅ Upgrade Modal  
✅ Mobile Responsive  
✅ Dark Mode (Galaxy theme)  

---

**Version**: 1.0 - Premium Galaxy Aesthetic  
**Last Updated**: May 2026  
**Status**: Complete & Tested ✨🌌
