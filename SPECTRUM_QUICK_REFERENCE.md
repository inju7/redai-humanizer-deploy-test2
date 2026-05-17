# Spectrum Palette - Quick Reference Cheat Sheet

## Color Swatches
```
🔵 Indigo (#1F1C3D)      - Primary background
🔴 Coral (#FF6B6B)       - Headlines, CTAs
🟤 Espresso (#1A120B)    - Card backgrounds
🟣 Slate Blue (#5C5A84)  - Secondary text, dividers
🌹 Soft Rose (#E8A7A7)   - Accents, testimonials
🔵 Ice Blue (#E0F7FA)    - Body text (80% use)
```

## CSS Variables (Copy & Paste)

```css
/* Colors */
background-color: var(--spectrum-indigo);
background-color: var(--spectrum-coral);
background-color: var(--spectrum-espresso);
background-color: var(--spectrum-slate-blue);
background-color: var(--spectrum-soft-rose);
color: var(--spectrum-ice-blue);

/* Fonts */
font-family: var(--font-heading-primary);       /* Bebas Neue */
font-family: var(--font-heading-secondary);     /* Signika */
font-family: var(--font-body);                  /* Raleway */
font-family: var(--font-serif-accent);          /* Prata */
font-family: var(--font-monospace);             /* Anonymous Pro */
```

## Section Classes (Copy & Paste)

```html
<!-- Hero Section -->
<section class="hero-section">
  <h1>Your Title</h1>
  <p class="subtitle">Your subtitle</p>
  <button class="cta-button">Action</button>
</section>

<!-- Content Card -->
<div class="card">
  <h2>Card Title</h2>
  <p>Your content here...</p>
</div>

<!-- Quote/Testimonial -->
<section class="quote-section">
  <blockquote>"Your quote here"</blockquote>
  <p class="attribution">Author Name</p>
</section>

<!-- Footer -->
<footer>
  <p class="copyright">© 2026 Your Company</p>
  <p class="legal"><a href="#">Privacy</a> | <a href="#">Terms</a></p>
</footer>

<!-- Buttons -->
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>

<!-- Accents -->
<span class="accent-text">Highlighted</span>
<span class="tech-label">LABEL</span>
<code class="code-snippet">code()</code>

<!-- Divider -->
<div class="section-divider"></div>
```

## Font Weights

```css
font-weight: 700;  /* Headings (bold) */
font-weight: 600;  /* Section titles */
font-weight: 500;  /* Medium/labels */
font-weight: 400;  /* Body text (normal) */
```

## Color Combinations (Pre-Tested)

| Element | Background | Text | Hover |
|---------|-----------|------|-------|
| Hero Heading | Indigo | Coral | — |
| Body Text | Indigo/Espresso | Ice Blue | — |
| Card Title | Espresso | Slate Blue | — |
| Quote | Indigo→Slate gradient | Soft Rose | — |
| Button Primary | Coral | Indigo | Soft Rose |
| Button Secondary | Transparent | Ice Blue | Coral |
| Label | — | Slate Blue | — |

## Responsive Adjustments

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Adjust padding and font sizes */
}
```

## The 80/20 Rule
- ✅ **80% Raleway** (body text)
- ⭐ **20% Others** (headings, accents, special elements)

## Quick Tips

1. **Always use Ice Blue (#E0F7FA) for body text** on dark backgrounds
2. **Coral is for action** — primary buttons, CTAs, important elements
3. **Soft Rose is luxury** — use sparingly for testimonials and highlights
4. **Slate Blue is secondary** — labels, dividers, metadata
5. **Espresso cards pop** — against the Indigo background
6. **Bebas Neue is impact** — main titles only, uppercase
7. **Raleway is readable** — use for 80% of content
8. **Prata is elegant** — use for testimonials and quotes only

## Files to Update

- `src/styles/theme.css` — Change color variables here
- `src/styles/fonts.css` — Add/remove fonts here
- `src/styles/spectrum-sections.css` — Modify section styles here
- `src/styles/index.css` — Import order matters

## Hover States (Included)

- Cards: Lift effect + border glow
- Buttons: Color change + shadow
- Links: Color transition
- All use `transition: all 0.3s ease;`

## Troubleshooting

**Text not readable?** → Use `color: var(--spectrum-ice-blue);`
**Card looks flat?** → Add `box-shadow: 0 8px 16px rgba(255, 107, 107, 0.1);`
**Button looks wrong?** → Use `.btn-primary` or `.btn-secondary` class
**Font not applying?** → Check `spectrum-sections.css` imports

---

**Version**: 1.0 | **Last Updated**: May 2026
