# Project Structure

## Root Directory

- `src/` - Main application source code
- `public/` - Static assets and deployment files
- `.kiro/` - Kiro AI assistant configuration and steering rules
- Configuration files: `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `components.json`

## Source Directory Organization

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms and components
│   ├── dashboard/      # Owner and seeker dashboard components
│   ├── layout/         # Layout components (MainLayout, etc.)
│   ├── legal/          # Terms of service, privacy policy
│   ├── map/            # Property map visualization
│   ├── messaging/      # Chat and messaging components
│   ├── property/       # Property-related components (grid, detail, form)
│   └── ui/             # shadcn/ui base components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Top-level page components
├── stories/            # Storybook/Tempo component stories
└── types/              # TypeScript type definitions
```

## Component Organization Patterns

- **Feature-based grouping**: Components are organized by domain (auth, property, messaging)
- **UI components**: Base components from shadcn/ui live in `components/ui/`
- **Layout components**: Shared layout components in `components/layout/`
- **Page components**: Top-level route components in `pages/`

## File Naming Conventions

- **Components**: kebab-case (e.g., `property-grid.tsx`, `message-thread.tsx`)
- **Pages**: kebab-case with `-page` suffix (e.g., `home-page.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `use-supabase-data.ts`)
- **Types**: camelCase (e.g., `index.ts`, `supabase.ts`)
- **Utilities**: kebab-case (e.g., `auth-helpers.ts`, `mock-data.ts`)

## Import Patterns

- Use `@/` alias for all internal imports
- Group imports: external libraries first, then internal imports
- Lazy loading for route components to improve performance

## Key Architectural Decisions

- **Role-based routing**: Separate routes and components for owners vs seekers
- **Protected routes**: Authentication wrapper components for secure pages
- **Lazy loading**: Route-level code splitting for better performance
- **Context-based state**: AuthContext for global authentication state
- **Component composition**: Radix UI primitives with custom styling