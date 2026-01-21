import { useBlog, useDeleteBlog } from '../hooks/useBlogs';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Trash2, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BlogDetailProps {
  blogId: string | null;
  onDeleteSuccess?: () => void;
}

export const BlogDetail = ({ blogId, onDeleteSuccess }: BlogDetailProps) => {
  const { data: blog, isLoading, error } = useBlog(blogId);
  const { user } = useAuth();
  const deleteBlog = useDeleteBlog();

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

  const isAuthor = user?.id === blog.author?.id;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this blog?')) {
      deleteBlog.mutate(blog.id, {
        onSuccess: () => {
          if (onDeleteSuccess) onDeleteSuccess();
        }
      });
    }
  };

  return (
    <motion.div
      key={blog.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-xl border-none ring-1 ring-black/5">
        <div className="relative h-64 w-full overflow-hidden group">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 text-white w-full">
            <div className="flex gap-2 mb-4">
              {blog.category.map((cat) => (
                <span key={cat} className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-bold uppercase tracking-wider border border-white/10">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight shadow-sm mb-4">{blog.title}</h1>

            {/* Author Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={blog.author?.avatar} alt={blog.author?.name} />
                  <AvatarFallback>{blog.author?.name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">{blog.author?.name || 'Unknown Author'}</p>
                  <div className="flex items-center text-xs text-gray-300 gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                  </div>
                </div>
              </div>

              {isAuthor && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>

        <CardContent className="flex-1 overflow-auto p-8 bg-white">
          <p className="text-xl font-medium text-gray-700 mb-8 leading-relaxed border-l-4 border-teal-500 pl-4">
            {blog.description}
          </p>

          <div className="prose prose-gray max-w-none prose-lg">
            <p className="whitespace-pre-wrap leading-loose text-gray-600">
              {blog.content}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
