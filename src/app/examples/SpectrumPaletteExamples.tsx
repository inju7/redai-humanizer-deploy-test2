import React from 'react';

/**
 * SpectrumPalette - Complete Component Examples
 * 
 * This component demonstrates how to use "The Spectrum Palette" design system
 * throughout your application. Copy and adapt these patterns for your own components.
 */

export function SpectrumPaletteExamples() {
  return (
    <div className="w-full bg-spectrum-indigo">
      {/* ====================================
          HERO SECTION EXAMPLE
          ==================================== */}
      <section className="hero-section">
        <h1>Transform Your Vision Into Reality</h1>
        <p className="subtitle">
          Discover the power of unified design with The Spectrum Palette system
        </p>
        <button className="cta-button">Start Building Today</button>
      </section>

      {/* ====================================
          FEATURES SECTION WITH CARDS
          ==================================== */}
      <section className="py-16 px-4 bg-spectrum-indigo">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-signika text-spectrum-slate-blue mb-12 text-center">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="card">
              <h3>Beautiful Colors</h3>
              <p>
                The Spectrum Palette combines 6 carefully chosen colors that work 
                together in perfect harmony. Each color has a specific purpose in 
                your design system.
              </p>
              <span className="tech-label">Design System</span>
            </div>

            {/* Card 2 */}
            <div className="card">
              <h3>Exceptional Typography</h3>
              <p>
                With 5 professional fonts—Bebas Neue, Signika, Raleway, Prata, and 
                Anonymous Pro—you have the flexibility to express your brand while 
                maintaining consistency.
              </p>
              <span className="tech-label">Typography</span>
            </div>

            {/* Card 3 */}
            <div className="card">
              <h3>Responsive Design</h3>
              <p>
                All sections automatically adapt to mobile, tablet, and desktop screens. 
                The system includes built-in breakpoints and responsive font scaling.
              </p>
              <span className="tech-label">Mobile First</span>
            </div>
          </div>
        </div>

        <div className="section-divider my-16"></div>
      </section>

      {/* ====================================
          TESTIMONIALS SECTION WITH QUOTES
          ==================================== */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-signika text-spectrum-slate-blue mb-12 text-center">
            What Our Users Say
          </h2>

          {/* Quote 1 */}
          <div className="quote-section mb-8">
            <blockquote>
              "The Spectrum Palette made it incredibly easy to maintain design consistency 
              across our entire application. The system is flexible yet structured."
            </blockquote>
            <p className="attribution">Sarah Chen, Product Designer</p>
          </div>

          {/* Quote 2 */}
          <div className="quote-section">
            <blockquote>
              "Finally, a design system that doesn't look corporate or boring. 
              The color combinations are modern, and the typography choices are spot-on."
            </blockquote>
            <p className="attribution">Marcus Rodriguez, Frontend Developer</p>
          </div>
        </div>

        <div className="section-divider my-16"></div>
      </section>

      {/* ====================================
          BUTTONS SECTION
          ==================================== */}
      <section className="py-12 px-4 bg-spectrum-indigo">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-signika text-spectrum-slate-blue mb-8 text-center">
            Button Styles
          </h2>

          <div className="flex flex-col gap-6 md:flex-row md:justify-center md:items-center">
            <div className="text-center">
              <button className="btn-primary">Primary Button</button>
              <p className="text-spectrum-slate-blue text-sm mt-2">
                Use for main actions
              </p>
            </div>

            <div className="text-center">
              <button className="btn-secondary">Secondary Button</button>
              <p className="text-spectrum-slate-blue text-sm mt-2">
                Use for alternative actions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          TYPOGRAPHY SHOWCASE
          ==================================== */}
      <section className="py-12 px-4 bg-spectrum-indigo">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-signika text-spectrum-slate-blue mb-8">
            Typography System
          </h2>

          <div className="space-y-8">
            {/* Heading Samples */}
            <div className="card">
              <h1 className="text-4xl font-bebas-neue text-spectrum-coral mb-4">
                Bebas Neue (Primary Heading)
              </h1>
              <p className="text-spectrum-slate-blue text-sm mb-4">
                font-family: var(--font-heading-primary) | Used for impact headings
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-signika text-spectrum-slate-blue mb-4">
                Signika (Secondary Heading)
              </h2>
              <p className="text-spectrum-slate-blue text-sm mb-4">
                font-family: var(--font-heading-secondary) | Used for section titles
              </p>
            </div>

            {/* Body Text Sample */}
            <div className="card">
              <h3 className="text-xl font-signika text-spectrum-slate-blue mb-4">
                Raleway (Body Text - 80% Usage)
              </h3>
              <p className="font-raleway text-spectrum-ice-blue leading-relaxed mb-4">
                This is an example of Raleway, the primary body font. It's used for 80% of all 
                text content. Raleway is clean, highly readable, and works beautifully in both 
                light and dark contexts. The system is built around this font for consistency 
                and readability.
              </p>
              <p className="text-spectrum-slate-blue text-sm">
                font-family: var(--font-body) | Use for all readable content
              </p>
            </div>

            {/* Serif Accent */}
            <div className="card">
              <h3 className="text-xl font-signika text-spectrum-slate-blue mb-4">
                Prata (Serif Accent)
              </h3>
              <p className="font-prata text-spectrum-soft-rose text-lg italic mb-4">
                "A serif font adds elegance and sophistication to special content."
              </p>
              <p className="text-spectrum-slate-blue text-sm">
                font-family: var(--font-serif-accent) | Use for testimonials and quotes
              </p>
            </div>

            {/* Monospace */}
            <div className="card">
              <h3 className="text-xl font-signika text-spectrum-slate-blue mb-4">
                Anonymous Pro (Monospace)
              </h3>
              <code className="code-snippet block p-4 bg-spectrum-espresso rounded mb-4">
                const palette = {'{'} colors: 6, fonts: 5 {'}'}
              </code>
              <p className="text-spectrum-slate-blue text-sm">
                font-family: var(--font-monospace) | Use for code and metadata
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          COLOR PALETTE SHOWCASE
          ==================================== */}
      <section className="py-12 px-4 bg-spectrum-indigo">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-signika text-spectrum-slate-blue mb-8">
            Color Palette
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indigo */}
            <div className="p-6 border border-spectrum-slate-blue border-opacity-20 rounded">
              <div 
                className="w-full h-24 rounded mb-4" 
                style={{ backgroundColor: '#1F1C3D' }}
              ></div>
              <h3 className="font-signika text-spectrum-coral mb-2">Primary Core</h3>
              <p className="text-spectrum-ice-blue text-sm mb-2">#1F1C3D (Deep Indigo)</p>
              <p className="text-spectrum-slate-blue text-xs">
                Primary background, navigation, main sections
              </p>
            </div>

            {/* Coral */}
            <div className="p-6 border border-spectrum-slate-blue border-opacity-20 rounded">
              <div 
                className="w-full h-24 rounded mb-4" 
                style={{ backgroundColor: '#FF6B6B' }}
              ></div>
              <h3 className="font-signika text-spectrum-coral mb-2">Feature Accent</h3>
              <p className="text-spectrum-ice-blue text-sm mb-2">#FF6B6B (Coral)</p>
              <p className="text-spectrum-slate-blue text-xs">
                Main headings, CTAs, primary buttons
              </p>
            </div>

            {/* Espresso */}
            <div className="p-6 border border-spectrum-slate-blue border-opacity-20 rounded">
              <div 
                className="w-full h-24 rounded mb-4" 
                style={{ backgroundColor: '#1A120B' }}
              ></div>
              <h3 className="font-signika text-spectrum-coral mb-2">Deep Contrast</h3>
              <p className="text-spectrum-ice-blue text-sm mb-2">#1A120B (Espresso)</p>
              <p className="text-spectrum-slate-blue text-xs">
                Card backgrounds, sidebars, nested sections
              </p>
            </div>

            {/* Slate Blue */}
            <div className="p-6 border border-spectrum-slate-blue border-opacity-20 rounded">
              <div 
                className="w-full h-24 rounded mb-4" 
                style={{ backgroundColor: '#5C5A84' }}
              ></div>
              <h3 className="font-signika text-spectrum-coral mb-2">Tech/Detail</h3>
              <p className="text-spectrum-ice-blue text-sm mb-2">#5C5A84 (Slate Blue)</p>
              <p className="text-spectrum-slate-blue text-xs">
                Section dividers, labels, metadata, secondary text
              </p>
            </div>

            {/* Soft Rose */}
            <div className="p-6 border border-spectrum-slate-blue border-opacity-20 rounded">
              <div 
                className="w-full h-24 rounded mb-4" 
                style={{ backgroundColor: '#E8A7A7' }}
              ></div>
              <h3 className="font-signika text-spectrum-coral mb-2">Elegant Highlight</h3>
              <p className="text-spectrum-ice-blue text-sm mb-2">#E8A7A7 (Soft Rose)</p>
              <p className="text-spectrum-slate-blue text-xs">
                Blockquotes, testimonials, luxury accents
              </p>
            </div>

            {/* Ice Blue */}
            <div className="p-6 border border-spectrum-slate-blue border-opacity-20 rounded">
              <div 
                className="w-full h-24 rounded mb-4" 
                style={{ backgroundColor: '#E0F7FA' }}
              ></div>
              <h3 className="font-signika text-spectrum-coral mb-2">Essential Body</h3>
              <p className="text-spectrum-ice-blue text-sm mb-2">#E0F7FA (Ice Blue)</p>
              <p className="text-spectrum-slate-blue text-xs">
                Primary body text, maximum readability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          ACCENT ELEMENTS
          ==================================== */}
      <section className="py-12 px-4 bg-spectrum-indigo">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-signika text-spectrum-slate-blue mb-8">
            Accent Elements
          </h2>

          <div className="space-y-6">
            {/* Highlighted Text */}
            <div className="card">
              <p className="text-spectrum-ice-blue mb-4">
                Regular body text with <span className="accent-text">highlighted accent text</span> 
                in Soft Rose for emphasis.
              </p>
              <code className="text-spectrum-slate-blue text-xs">className="accent-text"</code>
            </div>

            {/* Tech Label */}
            <div className="card">
              <p className="text-spectrum-ice-blue mb-4">
                <span className="tech-label">New Feature</span>
              </p>
              <code className="text-spectrum-slate-blue text-xs">className="tech-label"</code>
            </div>

            {/* Code Snippet */}
            <div className="card">
              <code className="code-snippet inline-block">
                const updateStyles = () =&gt; {'{...}'}
              </code>
              <p className="text-spectrum-slate-blue text-xs mt-2">className="code-snippet"</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          FOOTER
          ==================================== */}
      <footer>
        <div className="max-w-6xl mx-auto">
          <p className="copyright">
            © 2026 The Spectrum Palette Design System. All rights reserved.
          </p>
          <p className="legal">
            <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a> | <a href="#contact">Contact Us</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// ====================================
// CSS CLASS REFERENCE
// ====================================
/*
 * 
 * Major Sections:
 * - .hero-section      - Hero with background, title, subtitle, CTA
 * - .card              - Content card with Espresso background
 * - .quote-section     - Testimonial/quote section with gradient
 * - footer             - Footer with copyright and legal info
 * 
 * Typography:
 * - h1, h2, h3, h4     - Heading hierarchy with proper fonts
 * - .subtitle          - Hero subtitle styling
 * - .accent-text       - Soft Rose highlighted text
 * - .code-snippet      - Monospace code styling
 * 
 * Buttons:
 * - .btn-primary       - Coral button
 * - .btn-secondary     - Outlined button
 * - .cta-button        - Hero CTA button
 * 
 * Utilities:
 * - .tech-label        - Uppercase label in Slate Blue
 * - .section-divider   - Gradient divider between sections
 * - .copyright         - Footer copyright text
 * - .legal             - Footer legal links
 * - .attribution       - Quote attribution
 * 
 */

export default SpectrumPaletteExamples;
