# Technology Stack

## Core Framework & Build System

- **React 18** with TypeScript for the frontend
- **Vite** as the build tool and development server
- **SWC** for fast compilation and hot module replacement
- **Node.js** runtime environment

## UI & Styling

- **Tailwind CSS** for utility-first styling with custom design system
- **shadcn/ui** component library (New York style variant)
- **Radix UI** primitives for accessible, unstyled components
- **Framer Motion** for animations and transitions
- **Lucide React** for consistent iconography
- **CSS Variables** for theming with dark mode support

## State Management & Data

- **Supabase** for backend services (auth, database, real-time)
- **React Hook Form** with Zod validation for form handling
- **React Router v6** for client-side routing
- **Custom React contexts** for global state (AuthContext)

## Development Tools

- **Tempo Devtools** for component development and testing
- **TypeScript** with strict mode disabled for flexibility
- **ESLint** for code linting
- **PostCSS** with Autoprefixer for CSS processing

## Common Commands

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Build for production
npm run build-no-errors        # Build ignoring TypeScript errors
npm run preview                # Preview production build
npm run lint                   # Run ESLint

# Type Generation
npm run types:supabase         # Generate Supabase types
```

## Path Aliases

- `@/*` maps to `./src/*` for clean imports
- Components use `@/components` and utilities use `@/lib/utils`

## Environment Variables

- `VITE_TEMPO` - Enables Tempo devtools
- `SUPABASE_PROJECT_ID` - Required for type generation