import { useBlog } from '../hooks/useBlogs';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';

interface BlogDetailProps {
  blogId: number | null;
}

export const BlogDetail = ({ blogId }: BlogDetailProps) => {
  const { data: blog, isLoading, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <Card className="p-6 h-full flex items-center justify-center bg-transparent border-dashed">
        <div className="text-center space-y-2">
          <div className="text-4xl">👈</div>
          <p className="text-muted-foreground font-medium">Select a blog to view details</p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 animate-pulse select-none">
        <div className="h-64 bg-gray-100 rounded-xl mb-6"></div>
        <div className="h-8 bg-gray-100 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-destructive/50 bg-destructive/5">
        <p className="text-destructive font-medium">Error loading blog: {error.message}</p>
      </Card>
    );
  }

  if (!blog) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Blog not found.</p>
      </Card>
    );
  }

  return (
    <motion.div
      key={blog.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-xl border-none ring-1 ring-black/5">
        <div className="relative h-64 w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <div className="flex gap-2 mb-3">
              {blog.category.map((cat) => (
                <span key={cat} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-xs font-bold uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold leading-tight shadow-sm">{blog.title}</h1>
          </div>
        </div>

        <CardContent className="flex-1 overflow-auto p-8 bg-white">
          <div className="flex items-center text-sm text-muted-foreground mb-6 pb-6 border-b">
            <span>Published on {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>

          <p className="text-xl font-medium text-gray-700 mb-8 leading-relaxed">
            {blog.description}
          </p>

          <div className="prose prose-gray max-w-none">
            <p className="whitespace-pre-wrap leading-loose text-gray-600 text-lg">
              {blog.content}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
