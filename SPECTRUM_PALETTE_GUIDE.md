# The Spectrum Palette - Implementation Guide

## Overview
This document explains the unified design system **"The Spectrum Palette"** that has been implemented in your project. It combines 6 distinct colors and 6 specific fonts in a hierarchical section system to create a cohesive, professional interface without visual clutter.

---

## Color Palette

| Role | Color Hex | CSS Variable | Usage |
|------|-----------|--------------|-------|
| **Primary Core** | `#1F1C3D` | `--spectrum-indigo` | Site background, navigation |
| **Feature Accent** | `#FF6B6B` | `--spectrum-coral` | Main headings, CTAs, buttons |
| **Deep Contrast** | `#1A120B` | `--spectrum-espresso` | Card backgrounds, sidebars |
| **Tech/Detail** | `#5C5A84` | `--spectrum-slate-blue` | Section dividers, labels, metadata |
| **Elegant Highlight** | `#E8A7A7` | `--spectrum-soft-rose` | Blockquotes, testimonials, accents |
| **Essential Body** | `#E0F7FA` | `--spectrum-ice-blue` | Primary body text, high readability |

---

## Typography System

| Font | CSS Variable | Role | Usage |
|------|--------------|------|-------|
| **Bebas Neue** | `--font-heading-primary` | Primary headings | Main titles, impact-heavy elements |
| **Signika** | `--font-heading-secondary` | Secondary headings | Section titles, card headings |
| **Raleway** | `--font-body` | Body text (80% of use) | All primary content text |
| **Prata** | `--font-serif-accent` | Serif accent | Blockquotes, testimonials, luxury feel |
| **Anonymous Pro** | `--font-monospace` | Monospace/tech | Code snippets, metadata, labels |

### Font Weight Guidelines
- **Headings**: 600-700 (bold)
- **Body text**: 400 (normal) — Use 500 for enhanced visibility on dark backgrounds
- **Labels/metadata**: 500 (medium)

---

## Design Rule: The 80/20 Principle
✅ **Use Raleway for 80% of your text** to keep the system stable and readable.
⭐ **Use the other 5 fonts only for headings, buttons, and special callouts.**

---

## Section-Based Implementation

The system organizes your page into distinct hierarchical sections, each with a specific "role":

### 1. Hero Section
- **Background**: `#1F1C3D` (Deep Indigo)
- **Main Title**: Bebas Neue in `#FF6B6B` (Coral) — uppercase, bold
- **Subtitle**: Raleway in `#E0F7FA` (Ice Blue)
- **CTA Button**: Coral background (#FF6B6B) with Bebas Neue text in Indigo
- **CSS Class**: `.hero-section`

**Usage Example:**
```html
<section class="hero-section">
  <h1>Welcome to Your Site</h1>
  <p class="subtitle">Discover the power of design excellence</p>
  <button class="cta-button">Get Started</button>
</section>
```

---

### 2. Content Containers (Cards)
- **Background**: `#1A120B` (Espresso) — pops against the Indigo background
- **Card Titles**: Signika in `#5C5A84` (Slate Blue)
- **Card Body**: Raleway in `#E0F7FA`
- **Border**: Light Ice Blue (opacity 0.1) with hover effects
- **CSS Classes**: `.card` or `.content-container`

**Features:**
- Smooth hover effects with subtle lift animation
- Responsive padding
- Built-in border radius and transitions

**Usage Example:**
```html
<div class="card">
  <h3>Feature Title</h3>
  <p>Your content here with Raleway for readability...</p>
</div>
```

---

### 3. Editorial / Quote Section
- **Background**: Gradient from Indigo → Slate Blue
- **Quote Text**: Prata in `#E8A7A7` (Soft Rose)
- **Border**: Left accent in Coral
- **CSS Classes**: `.editorial-section` or `.quote-section`

**Features:**
- Decorative quotation mark in background
- Perfect for testimonials and featured content
- Serif font adds elegance and breaks up "tech" monotony

**Usage Example:**
```html
<section class="quote-section">
  <blockquote>"This design system is incredibly flexible and beautiful."</blockquote>
  <p class="attribution">Jane Doe, Design Director</p>
</section>
```

---

### 4. Technical / Footer Section
- **Background**: `#1F1C3D` (Deep Indigo)
- **Text**: Anonymous Pro in `#5C5A84` (Slate Blue)
- **Links**: Coral with hover effect
- **HTML Element**: `<footer>`

**Features:**
- Monospace font keeps organized and precise
- Perfect for legal text, copyright, metadata
- Links highlight in Coral on hover

**Usage Example:**
```html
<footer>
  <p class="copyright">© 2026 Your Company. All rights reserved.</p>
  <p class="legal"><a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
</footer>
```

---

## Component Styling Reference

### Buttons
```html
<!-- Primary Button (Coral) -->
<button class="btn-primary">Click Me</button>

<!-- Secondary Button (Outlined) -->
<button class="btn-secondary">Learn More</button>
```

### Accent Elements
```html
<!-- Soft Rose Accent Text -->
<p><span class="accent-text">Highlighted content</span></p>

<!-- Tech Label / Metadata -->
<span class="tech-label">NEW FEATURE</span>

<!-- Code Snippet -->
<code class="code-snippet">const example = true;</code>
```

### Dividers
```html
<!-- Gradient Divider between sections -->
<div class="section-divider"></div>
```

---

## CSS Variables Reference

All colors and fonts are defined as CSS variables in `theme.css`:

```css
/* Colors */
--spectrum-indigo: #1F1C3D;
--spectrum-coral: #FF6B6B;
--spectrum-espresso: #1A120B;
--spectrum-slate-blue: #5C5A84;
--spectrum-soft-rose: #E8A7A7;
--spectrum-ice-blue: #E0F7FA;

/* Fonts */
--font-heading-primary: 'Bebas Neue', sans-serif;
--font-heading-secondary: 'Signika', sans-serif;
--font-body: 'Raleway', sans-serif;
--font-serif-accent: 'Prata', serif;
--font-monospace: 'Anonymous Pro', monospace;
```

You can use these in your custom CSS:
```css
.my-custom-element {
  color: var(--spectrum-ice-blue);
  font-family: var(--font-body);
  background: var(--spectrum-indigo);
}
```

---

## Tailwind Integration

The design system is fully integrated with Tailwind CSS v4. The color palette is available through Tailwind's standard color utilities:

```html
<!-- Using Tailwind classes -->
<h1 class="text-spectrum-coral font-bebas-neue text-4xl">Title</h1>
<p class="text-spectrum-ice-blue font-raleway">Body text</p>
<div class="bg-spectrum-espresso border border-spectrum-coral">Card</div>
```

---

## Responsive Design

All sections include responsive breakpoints at `768px` (mobile):

- **Hero section**: Adjusted padding and font sizes
- **Cards**: Reduced padding on mobile
- **Headings**: Responsive scaling using `clamp()`
- **Quotes**: Font size adapts to screen width

---

## Contrast & Accessibility

The system prioritizes readability:
- ✅ **High contrast**: Ice Blue (#E0F7FA) on dark backgrounds
- ✅ **Font weights**: Body text uses 400-500 for visibility
- ✅ **Letter spacing**: Headings use increased spacing for impact
- ✅ **Line heights**: Optimized for comfortable reading (1.5-1.6)

---

## Design Tips

1. **Don't mix too many fonts in one section** — Stick to the primary font role
2. **Maintain spacing**: Use cards and sections to create visual hierarchy
3. **Color usage**: 
   - Indigo & Espresso for backgrounds (create depth)
   - Ice Blue for readable text (80% of content)
   - Coral for CTAs and important actions
   - Soft Rose for special callouts (use sparingly)
4. **Use hover states**: All interactive elements have transitions
5. **Test on mobile**: Use responsive classes and test breakpoints

---

## File Structure

```
src/styles/
├── index.css              (Main import file)
├── fonts.css              (Google Fonts imports)
├── theme.css              (CSS variables & @layer base)
├── tailwind.css           (Tailwind directives)
├── spectrum-sections.css  (Section-specific styles)
└── globals.css            (Global utilities)
```

---

## Customization

To customize the palette:

1. **Change a color**: Edit `theme.css` and update the hex value
   ```css
   --spectrum-coral: #FF6B6B; /* Change this value */
   ```

2. **Change a font**: Update `fonts.css` import and the CSS variable
   ```css
   --font-body: 'Your Font Name', sans-serif;
   ```

3. **Create a theme variant**: Duplicate the `:root` section and name it `.light-theme` or `.dark-theme`

---

## Support & Questions

For more information about the individual fonts or colors, refer to:
- **Google Fonts**: https://fonts.google.com
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Tailwind Docs**: https://tailwindcss.com

---

**Last Updated**: May 2026
**Design System Version**: 1.0
