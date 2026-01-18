# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShareLint is a Next.js application that checks how URLs appear on social media platforms (Facebook, Twitter, LinkedIn, Discord, Slack). It extracts and validates meta tags, detects issues, and generates fix code for various frameworks.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build (runs prisma generate first)
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma db push   # Push schema changes to database
```

## Architecture

### Core Flow
1. User submits URL → `/api/check` endpoint
2. `meta-parser.ts` fetches HTML, extracts meta tags using Cheerio, probes image dimensions
3. `validators.ts` runs platform-specific validation, generates issues/warnings
4. Results displayed via `preview-card.tsx` (per-platform previews) and `problem-list.tsx` (issues with fix code)

### Key Files
- `src/lib/meta-parser.ts` - HTML fetching, meta tag extraction, framework detection, image validation
- `src/lib/validators.ts` - Validation logic, issue generation, code output for HTML/Next.js/Nuxt/Remix
- `src/lib/platform-specs.ts` - Platform requirements (dimensions, character limits, colors)
- `src/lib/auth.ts` - NextAuth configuration (Google, GitHub OAuth)
- `src/lib/stripe.ts` - Payment plans and Stripe integration

### Database (Prisma + Turso/LibSQL)
- `User` - Accounts with plan tier (FREE/PRO/TEAM)
- `Monitor` - Recurring URL monitoring (Pro feature)
- `MonitorCheck` - Individual check results with snapshots
- `Alert` - Notifications when monitors detect changes

### API Routes
- `POST /api/check` - Main URL checker (rate-limited for anonymous users)
- `/api/monitors/*` - CRUD for URL monitoring
- `/api/cron/monitors` - Scheduled checks (Vercel Cron, daily)
- `/api/stripe/*` - Payment webhooks and portal

### Component Patterns
- Server components by default, `"use client"` only when needed
- Platform preview components in `preview-card.tsx` render platform-specific UIs
- Templates in `src/components/templates/` for guide/fix/comparison pages
- Static content defined in `src/content/` as TypeScript objects

## Environment Setup

Copy `.env.example` to `.env.local`:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

OAuth and Stripe keys are optional for basic development.

## Key Implementation Details

**Meta Tag Extraction**: Uses Cheerio for parsing, validates images via HEAD requests, gets actual dimensions via `probe-image-size`. Detects JS frameworks (Next.js, Nuxt, Vue, React, Angular, Svelte, Remix) through DOM markers.

**Validation**: Checks title/description length per platform, image dimensions, aspect ratios, protocol mismatches (HTTPS page with HTTP image), robots noindex, canonical URL mismatches.

**Code Generation**: `getMetaTagCode()` outputs fix code in HTML, Next.js Metadata API, Nuxt useSeoMeta, or Remix MetaFunction format based on detected framework.

**Rate Limiting**: Anonymous users get 10 checks/day (IP-based, in-memory). Authenticated users get plan-based limits.

**Monitoring**: Pro feature. Cron job runs daily, compares snapshots, generates alerts for changes (title, description, image, broken status).
