# Condo Manager

By Rodrigo Pascoalino

A comprehensive property management system for condominiums built with the T3 Stack.

## Features

- 🏢 Property Management
- 👥 Resident Management
- 🚗 Vehicle Control
- 🔐 Secure Authentication
- 📱 Responsive Design
- 🌐 Multi-language Support

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React Framework
- [Auth.js](https://authjs.dev/) - Authentication
- [Prisma](https://prisma.io) - Database ORM
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [TypeScript](https://typescriptlang.org) - Type Safety
- [PostgreSQL](https://postgresql.org) - Database

## Prerequisites

- Node.js 22+
- PostgreSQL 16+
- pnpm

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/condo-manager.git
   cd condo-manager
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your configuration.

4. Set up the database:

   ```bash
   ./start-database.sh
   pnpm prisma migrate dev
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # Reusable UI components
├── lib/          # Utility libraries and configurations
├── providers/    # React context providers
├── schemas/      # Validation schemas
├── services/     # Business logic and external services
├── styles/       # Global styles and Tailwind CSS
├── translations/ # i18n translations
├── types/        # TypeScript type definitions
└── utils/        # Helper functions
```

## Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commits
- Keep components small and focused
- Follow the established folder structure

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a pull request

## License

MIT License - see LICENSE for details
