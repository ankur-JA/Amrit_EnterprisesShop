# Amrit Enterprises Shop

A cross-platform retail management system for hardware shops.

## Tech Stack
- **Frontend (Desktop):** Electron + React + TypeScript (Vite)
- **Frontend (Web):** React + TypeScript (shared components)
- **Backend API:** Node.js + Express + TypeScript
- **ORM/DB:** Prisma ORM + PostgreSQL (cloud) / SQLite (dev)
- **Authentication:** JWT, bcrypt
- **UI:** Tailwind CSS or Material UI

## Monorepo Structure
- `frontend/` — React (web & Electron)
- `backend/` — Node.js + Express + Prisma

## Getting Started

### Backend
```bash
cd backend
npm install
# For dev (SQLite):
npx prisma migrate dev
npm run dev
```

### Frontend (Web)
```bash
cd frontend
npm install
npm run dev
```

### Frontend (Desktop/Electron)
```bash
cd frontend
npm run electron:dev
```

## CI/CD
- Linting and tests run via GitHub Actions on push/PR

## Contributing
Pull requests welcome! Please lint and test before submitting.
