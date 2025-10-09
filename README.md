# Autos - Car Marketplace Platform

A modern, full-stack web application for buying and selling cars. Built with SvelteKit, Supabase, and daisyUI, this platform provides a seamless experience for users to list, browse, and manage vehicle listings.

## Table of Contents

- [Description](#-description)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Available Scripts](#-available-scripts)
- [Testing](#-testing)
- [Project Structure](#-project-structure)

## Description

This car marketplace platform is designed to connect buyers and sellers in the automotive market. The application leverages modern web technologies to deliver a fast, responsive, and user-friendly experience. With Supabase handling authentication and database operations, the platform ensures secure user management and data persistence.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Full-stack framework for building web applications
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL database with real-time capabilities
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for type-safe database queries
- **Styling**: [daisyUI](https://daisyui.com/) - Tailwind CSS component library
- **Testing**:
  - [Vitest](https://vitest.dev/) - Unit testing framework
  - [Playwright](https://playwright.dev/) - End-to-end testing
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Docker** (for running Supabase locally)
- **Docker Compose** (usually comes with Docker Desktop)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd autos
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start Supabase local development**

   ```bash
   pnpm run supabase:start
   ```

   This command will spin up all necessary Supabase services in Docker containers. Keep the terminal output as you'll need these values for environment configuration.

## Environment Configuration

### Step 1: Create Environment File

Copy the example environment file and rename it:

```bash
cp .env.example .env.local
```

### Step 2: Configure Environment Variables

Use the output from `pnpm run supabase:start` to populate your `.env.local` file. The command will output something like this:

```
API URL: http://127.0.0.1:54321
GraphQL URL: http://127.0.0.1:54321/graphql/v1
S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
MCP URL: http://127.0.0.1:54321/mcp
Database URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
Mailpit URL: http://127.0.0.1:54324
Publishable key: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
Secret key: sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPyu
S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
S3 Region: local
```

### Step 3: Set Your Environment Variables

Your `.env.local` file should look like this:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
SUPABASE_SERVICE_ROLE=sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPyu
```

> **Note**: The keys shown above are examples for local development. Your actual keys will be different and are generated when you start Supabase.

## Running the Application

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Accessing Local Services

Once everything is running, you can access:

- **Application**: http://localhost:5173
- **Supabase Studio**: http://127.0.0.1:54323 (Database management UI)
- **Mailpit**: http://127.0.0.1:54324 (Email testing interface)

## Available Scripts

```bash
# Development
pnpm dev                  # Start development server
pnpm build               # Build for production
pnpm preview             # Preview production build

# Supabase
pnpm supabase:start      # Start local Supabase instance
pnpm supabase:stop       # Stop local Supabase instance
pnpm supabase:reset      # Reset local Supabase database

# Testing
pnpm test                # Run unit tests
pnpm test:ui             # Run tests with UI
pnpm test:e2e            # Run end-to-end tests
pnpm test:e2e:ui         # Run E2E tests with UI

# Code Quality
pnpm lint                # Run ESLint
pnpm format              # Format code with Prettier
pnpm check               # Check Svelte syntax
```

## Testing

This project uses a comprehensive testing strategy:

- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright for end-to-end testing

Run tests with:

```bash
pnpm test        # Unit tests
pnpm test:e2e    # End-to-end tests
```

## Project Structure

```
autos/
├── src/
│   ├── lib/
│   │   ├── components/      # Reusable Svelte components
│   │   ├── server/          # Server-side utilities and database
│   │   ├── state/           # State management
│   │   └── types/           # TypeScript type definitions
│   ├── routes/              # SvelteKit routes
│   │   ├── (authenticated)/ # Protected routes
│   │   └── (unauthenticated)/ # Public routes
│   └── app.html             # HTML template
├── supabase/
│   ├── config.toml          # Supabase configuration
│   └── migrations/          # Database migrations
├── static/                  # Static assets
└── tests/                   # Test files
```

## Architecture & Patterns

### Form System

This project implements a robust form management system with client-side and server-side validation using Zod. The system provides:

- **Reactive State Management**: Automatic form state synchronization
- **Dual Validation**: Client-side (immediate feedback) and server-side (security)
- **Error Handling**: Field-specific and form-level error messages
- **Smart Disabled State**: Automatic button disabling based on form state
- **Type Safety**: Full TypeScript support with Zod schemas

**📖 For detailed documentation on how to use the form system, see:**
[Form System Documentation](src/lib/components/atom/Form/README.md)

The form system includes:
- `Form` component - Main form wrapper with state management
- `Input` component - Smart input fields with validation
- `Button` component - Auto-disabling submit buttons
- `FormState` class - Reactive state management
- `FormFailureActionBuilder` - Server-side error handling

---

Built with ❤️ using SvelteKit and Supabase
