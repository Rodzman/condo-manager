# Condo Manager

**Developer: Rodrigo Pascoalino**

A comprehensive condominium management system built with Next.js 15 and TypeScript, featuring user role-based access control, property management, invoicing, reservations, and more.

## Features

- 🔑 **Role-Based Access Control**: Granular permissions based on user roles (Admin, Manager, Resident, Staff, Security, Guest)
- 👥 **User Management**: Admin interface for managing user accounts and permissions
- 🏢 **Property Management**: Track units, properties, and residents
- 💰 **Invoicing**: Generate and manage invoices for residents
- 📅 **Reservations**: Book common areas and amenities
- 📊 **Reporting**: Generate insights and analytics
- 🔒 **Authentication**: Secure authentication using Auth.js v5

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth.js v5
- **API**: tRPC for type-safe APIs
- **UI**: TailwindCSS and shadcn/ui components
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm
- PostgreSQL database

### Environment Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/condo-manager.git
cd condo-manager
```

2. Install dependencies

```bash
pnpm install
# or
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials and other configuration values:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/condo_manager"

# Auth.js
AUTH_SECRET="your-auth-secret"
```

5. Run database migrations

```bash
pnpm prisma migrate dev
# or
npx prisma migrate dev
```

6. Start the development server

```bash
pnpm dev
# or
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses Prisma with a PostgreSQL database. The main entities include:

- **User**: System users with role-based permissions
- **Property**: Managed properties and buildings
- **Unit**: Individual units within properties
- **Invoice**: Billing information
- **Reservation**: Common area bookings
- **Document**: Property documentation

## Role System

The application implements a comprehensive role system:

- **Admin**: Full system access and configuration
- **Manager**: Property management and resident oversight
- **Resident**: Access to personal dashboard and services
- **Staff**: Maintenance and property management tasks
- **Security**: Access control and visitor management
- **Guest**: Limited access for visitors and temporary users

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── (admin)/        # Admin dashboard pages
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # User dashboard pages
├── components/         # React components
│   ├── admin/          # Admin-specific components
│   ├── ui/             # UI components
├── constants/          # Application constants
├── lib/                # Utility functions
├── server/             # Server-side code
│   ├── api/            # API routes
│   │   ├── routers/    # tRPC routers
├── trpc/               # tRPC client setup
├── styles/             # Global styles
prisma/
├── schema.prisma       # Database schema
```

## Development Practices

This project follows these development practices:

- **TypeScript** for type-safe code
- **ESLint** and **Prettier** for code formatting
- **Conventional Commits** for commit messages
- **CI/CD** with GitHub Actions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
