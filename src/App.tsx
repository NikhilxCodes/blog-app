import { useState } from 'react';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { CreateBlogForm } from './components/CreateBlogForm';

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">CA Monk Blog</h1>
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
