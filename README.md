# CA Monk Blog Application

A modern, responsive blog application built for the CA Monk frontend interview assignment. This project demonstrates proficiency in React, TypeScript, TanStack Query, and modern UI practices.

## 🚀 Features

- **Browse Articles**: View a list of the latest articles with category tags and descriptions.
- **Read Articles**: Click on any article to read the full content with a responsive detail view.
- **Create Articles**: Authenticated users can write and publish new blog posts.
- **Delete Articles**: Authors can delete their own articles with a confirmation dialog.
- **Authentication**: Mock authentication flow (Sign In / Sign Out) with protected routes.
- **Responsive Design**: Fully optimized two-column layout that adapts to mobile devices.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Routing**: React Router v7
- **Backend**: JSON Server (Mock API)

## 🏃‍♂️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd camonk-interview
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Running the Application

You need to run both the specific backend (JSON Server) and the frontend development server.

1.  **Start the Mock Backend** (Port 3001)
    ```bash
    npm run server
    ```

2.  **Start the Frontend** (Port 5173)
    Open a new terminal and run:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**
    Navigate to `http://localhost:5173` to view the application.

## 📂 Project Structure

The project follows a clean, feature-based architecture:

```
src/
├── api/            # API service layer (fetch calls abstracted here)
├── components/     # Reusable UI components
│   ├── ui/         # shadcn/ui primitives (Button, Card, etc.)
│   └── ...         # Feature components (BlogList, BlogDetail, etc.)
├── context/        # React Context (AuthContext)
├── hooks/          # Custom Hooks (useBlogs, useAuth)
├── pages/          # Page components (HomePage, CreateBlogPage, SignIn)
├── types/          # TypeScript interfaces
└── App.tsx         # Main application entry
```

## 🧪 Verification

- **Linting**: Run `npm run lint` to check for code quality issues.
- **Build**: Run `npm run build` to verify the production build.

---

**Developed by**: Nikhil Sagar
