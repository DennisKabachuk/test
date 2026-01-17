# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui (new-york style, neutral base color, lucide icons)

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Run production server
```

## Architecture

Next.js App Router project with file-based routing under `app/`. Each route is a folder with a `page.tsx` file.

**Key directories:**
- `app/` - Routes and pages (App Router conventions)
- `lib/` - Utilities including `cn()` helper for Tailwind class merging
- `components/ui/` - shadcn/ui components
- `hooks/` - Custom React hooks

**Import aliases (configured in tsconfig):**
- `@/components` - Components
- `@/components/ui` - UI components
- `@/lib/utils` - Utilities
- `@/hooks` - Hooks

## Conventions

- Client components must include `'use client'` directive at the top
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Add shadcn components: `npx shadcn@latest add <component>`
- Theming uses CSS variables defined in `app/globals.css`
