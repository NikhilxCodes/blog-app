import { useState } from 'react';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { CreateBlogForm } from './components/CreateBlogForm';

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-neutral-50/50 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              CA
            </div>
            <h1 className="text-xl font-bold tracking-tight">Monk Blog</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CreateBlogForm />
            <div>
              <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
              <BlogList
                selectedBlogId={selectedBlogId}
                onSelectBlog={setSelectedBlogId}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-8rem)]">
            <h2 className="text-xl font-semibold mb-4">Blog Details</h2>
            <BlogDetail blogId={selectedBlogId} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
