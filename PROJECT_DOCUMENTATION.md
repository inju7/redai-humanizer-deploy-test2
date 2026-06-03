# Ai-Humanizer Project Documentation

## Project Overview

Ai-Humanizer is a React + Vite web application built around an AI content transformation platform. The application is styled with Tailwind CSS and custom theme files, and it includes a Convex backend for authentication, credit tracking, blog/content data, and AI request orchestration.

The current UI is branded as `REDAI Humanizer`, with features focused on rewriting AI text, detecting AI-generated text, plagiarism checks, email humanization, grammar fixing, essay generation, and multiple persona-based AI detectors.

## Key Features

- AI content transformation tools:
  - Text Humanizer
  - AI Detector
  - Plagiarism Checker
  - Humanize Email
  - Grammar Check
  - Citation Check
  - Essay Writer
  - Paragraph Rewriter
  - Article Rewriter
  - Sentence Rewriter
  - Rewording Tool
  - Detect AI Content
  - Detector Teachers
  - Detector College
  - Detector Academic
  - Detector Professors
- Multi-tab landing page / app layout:
  - Home / AI tools
  - Blog
  - Marketing deals / ads
  - Marketplace
  - Referral
  - Career
- Authentication flows with local UI state and support for Google OAuth placeholder
- Admin panel routing and role-based UI state
- Credit usage system for paid feature access
- Groq API proxy server for AI requests
- Convex backend for auth, user state, transaction logs, blogs, careers, marketplace orders, referrals

## Technology Stack

- Frontend:
  - React 18
  - Vite
  - TypeScript
  - Tailwind CSS
  - Motion / AnimatePresence
  - Radix UI components
  - Lucide icons
- Backend:
  - Convex (`convex/` folder)
  - Express proxy server (`server.js`)
  - Groq / Llama-3.3 AI model
- Auth:
  - Convex Auth server provider
  - Password provider
- Tools / utilities:
  - `react-hook-form`, `react-markdown`, `date-fns`, `clsx`, `cmdk`, `recharts`

## Repository Structure

- `README.md` - basic startup instructions
- `PROJECT_DOCUMENTATION.md` - this full documentation
- `AGENTS.md`, `CLAUDE.md` - AI/Convex notes
- `ATTRIBUTIONS.md` - third-party component attribution
- `server.js` - Express proxy for Groq requests
- `convex/` - Convex backend code and generated API
  - `ai.ts` - server-side AI request action and credit deduction/refund logic
  - `auth.ts` - Convex auth initialization and after-user-created callback
  - `schema.ts` - Convex database schema
  - `credits.ts` - Convex credit balance mutations
  - `blogs.ts`, `jobs.ts`, `marketplace.ts`, `referrals.ts`, `users.ts` - backend route definitions and data logic
- `src/` - frontend application code
  - `main.tsx` - app entry point
  - `app/App.tsx` - main interface and page routing
  - `app/ConvexClientProvider.tsx` - Convex provider wrapper
  - `app/components/` - reusable UI components and shared layouts
  - `app/utils/ai.ts` - client-side AI prompt builder and Groq proxy request logic
  - `styles/` - CSS files, including theme styles and Tailwind directives
- `redai-humanizer/` - appears to contain a separate sample app or variant
- `.env.server.example` - example server environment variables

## Frontend Architecture

### Entry Point
- `src/main.tsx` bootstraps React and wraps the application inside `ConvexClientProvider`.

### Convex Client Provider
- `src/app/ConvexClientProvider.tsx` creates a `ConvexReactClient` using `import.meta.env.VITE_CONVEX_URL` and adds `ConvexAuthProvider`.

### Application Shell
- `src/app/App.tsx` contains the main layout, UI state, navigation, tabs, sign-in modal, admin panel state, and AI tool selection.
- It uses local React state for user session data, credit display, active tab, sidebar state, and sample hardcoded content.
- The UI imports shared components from `src/app/components/SharedComponents.tsx` and `WorkspaceProcessor`.

### AI Request Flow
- `src/app/utils/ai.ts` constructs a system prompt based on the selected tool and style parameter.
- It sends requests to `/api/groq`.
- The local proxy in `server.js` forwards requests to the configured Groq API endpoint, keeping the API key on the server.

## Backend Architecture

### Express Proxy Server
- `server.js` exposes a single POST endpoint at `/api/groq`.
- It reads `GROQ_API_KEY` and `GROQ_API_URL` from environment variables.
- It forwards the payload to the Groq endpoint and returns JSON or plain text.

### Convex Backend
- `convex/auth.ts` configures Convex Auth with a password provider and a registration callback.
- New users are defaulted to 10 credits and role `user`, with a registration bonus transaction logged.
- `convex/schema.ts` defines:
  - Auth tables and user fields
  - Transactions
  - Marketing submissions
  - Blogs
  - Career applications
  - Job roles
  - Marketplace orders
  - Referral claims
- `convex/ai.ts` handles AI generation requests, credit deduction, optional refund on failure, and calls Groq with a server-side secret.
- `convex/credits.ts` provides `deduct` and `refund` mutations for user credit management.

## Environment and Setup

### Required Environment Variables

- `GROQ_API_KEY` - required for server-side AI proxy and Convex backend AI calls
- `GROQ_API_URL` - optional override for the Groq endpoint
- `PORT` - Express proxy port (default 3001)
- `VITE_CONVEX_URL` - frontend Convex endpoint URL
- `CONVEX_SITE_URL` - used by Convex auth configuration

### Install and Run

1. Install dependencies:
   - `npm install` or `pnpm install`
2. Create `.env` from `.env.server.example`.
3. Start the local AI proxy server:
   - `npm run start:proxy`
4. Start the frontend:
   - `npm run dev`
5. Build for production:
   - `npm run build`

### Notes
- The frontend AI calls go through `/api/groq`, so both the Vite app and proxy server must be running during local development unless a proxy is configured in Vite.
- `server.js` acts as a simple security layer to prevent the API key from being exposed in the browser.

## Existing Documentation and Guides

- `README.md` - project startup instructions and branding notes.
- `AGENTS.md`, `CLAUDE.md` - Convex agent guidance comments.
- `ATTRIBUTIONS.md` - third-party license attribution.
- `GALAXY_AESTHETIC_GUIDE.md` - design/style guide for the premium galaxy aesthetic.
- `GALAXY_IMPLEMENTATION_SUMMARY.md` - summary of galaxy aesthetic implementation.
- `IMPLEMENTATION_SUMMARY.md` - broader implementation overview.
- `SPECTRUM_QUICK_REFERENCE.md` and `SPECTRUM_PALETTE_GUIDE.md` - additional styling and palette reference.

## How to Extend the Project

### Add a new AI tool
1. Add the tool name to the `TOOLS_LIST` array in `src/app/App.tsx`.
2. Add a corresponding prompt case in `src/app/utils/ai.ts`.
3. Update UI labels and help text if needed.

### Extend the backend schema
1. Add a new table or field in `convex/schema.ts`.
2. Add helper queries or mutations in a new `convex/*.ts` file.
3. Regenerate Convex client code if needed.

### Add a new page or UI section
1. Add a new tab state in `src/app/App.tsx`.
2. Add render logic inside the `AnimatePresence` main content area.
3. Reuse shared components under `src/app/components/`.

### Update theming or styling
1. Edit CSS variables in `src/styles/galaxy-theme.css`, `src/styles/index.css`, or `tailwind.css`.
2. Modify shared classes and component styling in the app components.

## Notes and Caveats

- `App.tsx` currently uses local state for `user` authentication and sign-in forms, including hardcoded admin logic based on encrypted email values. This may not reflect a full production auth flow.
- Convex auth is configured, but the frontend integration is not fully wired through `convex/auth` flows in the visible `App.tsx` logic.
- Some content and marketing/career data are provided as hardcoded sample values for UI demonstration.
- The repository contains a second app folder at `redai-humanizer/` which appears to be a separate variant or workspace and is not the main app root.

## Recommended Next Steps

- Add a Vite proxy configuration for `/api/groq` to simplify development.
- Wire the frontend auth state to Convex auth hooks and remove local simulation logic.
- Add readme sections for deployment and server production security.
- Document the `redai-humanizer/` directory separately if it is intended to be an alternate app.
