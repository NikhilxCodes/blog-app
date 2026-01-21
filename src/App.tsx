import { useState } from 'react';
import { BookOpen, Menu } from "lucide-react";
import { Routes, Route, Link } from 'react-router-dom';
import CreateBlogPage from '@/pages/CreateBlogPage';
import SignInPage from './pages/SignInPage';
import { HomeDashboard } from '@/pages/HomePage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { UserNav } from '@/components/UserNav';
import { AuthProvider } from '@/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-md flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">CA MONK</span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Desktop User Nav */}
              <div className="hidden md:flex">
                <UserNav />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <section className="bg-gray-50/80 border-b border-gray-200 backdrop-blur-sm">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 md:py-16">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                      Insights for <span className="text-teal-600">Modern Accountants</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                      Expert articles on finance, technology, regulations, and professional development to help you stay ahead in your career.
                    </p>
                  </div>
                </div>
              </section>
              <HomeDashboard />
            </>
          } />
          <Route
            path="/create-blog"
            element={
              <ProtectedRoute>
                <CreateBlogPage />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 md:py-16">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-md flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">CA MONK</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Your trusted platform for accounting insights, professional development, and career growth.
              </p>
            </div>
            {/* ... other footer columns ... */}
          </div>

        </div>
      </footer>
    </div>
  );
}

