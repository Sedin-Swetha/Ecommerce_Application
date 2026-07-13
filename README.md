# E-commerce Application

A modern, responsive e-commerce web application built with [Next.js](https://nextjs.org), [React](https://react.dev), and [Tailwind CSS](https://tailwindcss.com). 

This project is bootstrapped using `create-next-app` and leverages modern state management, form validation, and data visualization tools to deliver a robust user experience.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **State Management:** [Jotai](https://jotai.org/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

The source code is organized within the `src/` directory:

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components (UI, layout, forms, etc.)
- `store/`: Jotai state atoms for global state management
- `hooks/`: Custom React hooks for shared logic
- `services/`: API calls and external service integrations
- `lib/`: Utility functions and helpers
- `data/`: Mock data or static datasets
- `constants/`: Global constants and configurations
- `types/`: TypeScript type definitions and interfaces

## ✨ Key Features

- **Modern Architecture**: Built with Next.js using the App Router for improved performance.
- **Global State**: Lightweight and scalable global state using Jotai.
- **Robust Forms**: Type-safe form validation and handling using Zod and React Hook Form.
- **Interactive Analytics**: Data visualization using Recharts.
- **Fully Typed**: End-to-end type safety with TypeScript.
- **Responsive Design**: Mobile-first styling with Tailwind CSS.

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <your-repo-url>
   cd ecommerce-application
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch formatting and code quality issues.

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
