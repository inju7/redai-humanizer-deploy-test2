# TODO - Premium Alexa Neumorphism Dashboard Redesign

## Step 1: Gather / confirm scope
- [x] Inspect current UI implementation in `src/app/App.tsx` and identify where dashboard + modal + typography are defined.
- [x] Inspect existing theme tokens in `src/styles/theme.css` and neumorphism system in `src/styles/galaxy-theme.css`.

## Step 2: Create premium design system
- [ ] Update palette + typography to an “Alexa/gaara” premium look using CSS variables.
- [ ] Unify neumorphism shadow formulas (cards/inputs/buttons) and remove harsh/bright highlight panels.
- [ ] Remove ring- and highlight-driven emphasis across dashboard.


## Step 3: Refactor modal to remove highlights
- [ ] Redesign `UpgradeModal` so it uses neumorphic concave/convex surfaces only.
- [ ] Remove any highlight colors inside modal content (no yellow/orange panels).

## Step 4: Redesign dashboard layout
- [ ] Replace inline styles in dashboard tools with reusable premium classes.
- [ ] Make dashboard cards + tool tiles consistent and luxury (less harsh shadows).

## Step 4.1: Apply new neumorphism utilities
- [ ] Refactor `src/app/App.tsx` dashboard tiles/cards/buttons to use `alexa-neumo.css` classes.


## Step 5: Improve fonts
- [ ] Update `src/styles/fonts.css` / `theme.css` to use 6-weights fonts + premium set.
- [ ] Ensure correct font families applied for headings/body/buttons.

## Step 6: Update global styles
- [ ] Ensure `globals.css` / `index.css` imports are correct.
- [ ] Add subtle noise + gradients without “ugly” blocks.

## Step 7: Verify
- [ ] Run dev/build and visually check dashboard + all modals.
- [ ] Test mobile breakpoints.
- [ ] Search for remaining highlight/ring usage and remove.

