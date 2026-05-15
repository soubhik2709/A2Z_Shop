# A2Z_Shop Dashboard

A modern admin dashboard built with Next.js, TypeScript, Zustand, and Material UI (MUI).

The project focuses on scalable frontend architecture, dashboard optimization, protected routing, API handling, state management, caching, and performance-focused React patterns.

---

## Features

- Admin Authentication Flow
- Protected Dashboard Routes
- Zustand Global State Management
- Responsive UI using Material UI (MUI)
- Users Dashboard
- Products Dashboard
- Dynamic User & Product Detail Pages
- Search & Filtering
- Pagination System
- Product Category Filtering
- Request Caching using Zustand
- API Proxy Architecture
- Rate Limit Handling
- Request Guard Protection
- React.memo Optimization
- Zustand `useShallow` Optimization
- Dynamic Routing with Next.js App Router

---

## Tech Stack

- Next.js 16
- React
- TypeScript
- Zustand
- Material UI (MUI)

---

## Project Structure

```text
app/
  login/
  dashboard/
    users/
      [id]/
    products/
      [id]/
  api/
    proxy/

components/
store/

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Login Credentials

```text
username: admin
password: 1234
```

---

## API Architecture

The project uses Next.js API proxy routes to fetch external data safely and avoid browser CORS restrictions during frontend development.

Frontend requests are routed through:

```text
/api/proxy/*
```

before communicating with external APIs such as DummyJSON.

This architecture also makes future backend integration easier and keeps API handling centralized.

---

## Performance Optimizations

- Zustand selector optimization using `useShallow`
- Component memoization using `React.memo`
- Request caching for paginated/search data
- Duplicate API request prevention
- Optimized rerender handling

---

## Future Improvements

- Real backend integration
- Database support
- JWT / NextAuth authentication
- Server-side pagination
- Role-based access control
- Dashboard analytics
- Deployment on Vercel

---

## Author

Built for frontend architecture practice, React performance optimization learning, dashboard system design, and portfolio development.