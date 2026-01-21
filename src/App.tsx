import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Menu, BookOpen, PenSquare, LogOut } from "lucide-react";
import { Routes, Route, Link, useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import CreateBlogPage from '@/pages/CreateBlogPage';
import SignInPage from './pages/SignInPage';
import { useBlogs } from '@/hooks/useBlogs';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Internal Home Component
function HomeDashboard() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { data: blogs } = useBlogs();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Handle Deep Linking / Auto-select from URL
  useEffect(() => {
    const blogId = searchParams.get('blogId');
    if (blogId) {
      setSelectedBlogId(blogId);
    }
  }, [searchParams]);

  // Auto-select latest blog
  useEffect(() => {
    if (!selectedBlogId && blogs && blogs.length > 0) {
      const latestBlog = [...blogs].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      if (latestBlog) {
        setSelectedBlogId(String(latestBlog.id));
      }
    }
  }, [selectedBlogId, blogs]);

  const handleCreateClick = () => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
      navigate('/create-blog');
    }
  };

  return (
    <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Panel - Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Create Blog CTA */}
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-100/50">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Share Your Knowledge</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Contribute to the CA Monk community by writing an insightful article.
            </p>
            <Button
              onClick={handleCreateClick}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white gap-2 shadow-sm"
            >
              <PenSquare className="w-4 h-4" />
              Write an Article
            </Button>
          </div>

          <div className="border-t border-gray-200" />

          {/* Blog List Section */}
          <div className="sticky top-24">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Latest Articles</h2>
            <div className="custom-scrollbar overflow-y-auto max-h-[calc(100vh-250px)] pr-2 -mr-2">
              <BlogList
                selectedBlogId={selectedBlogId}
                onSelectBlog={setSelectedBlogId}
              />
            </div>
          </div>
        </aside>

        {/* Right Panel - Blog Detail */}
        <section className="lg:col-span-8 min-h-[500px]">
          <BlogDetail
            blogId={selectedBlogId}
            onDeleteSuccess={() => setSelectedBlogId(null)}
          />
        </section>
      </div>
    </main>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// Navbar User Control
const UserNav = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => navigate('/signin')}
        className="bg-gray-900 text-white hover:bg-gray-800"
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              Community Author
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 CA Monk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
