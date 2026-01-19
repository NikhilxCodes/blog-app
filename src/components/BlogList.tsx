import { useBlogs } from '../hooks/useBlogs';
import { BlogCard } from './BlogCard';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogListProps {
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
}

export const BlogList = ({ selectedBlogId, onSelectBlog }: BlogListProps) => {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-destructive">Error loading blogs: {error.message}</p>
      </Card>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">No blogs found.</p>
      </Card>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <AnimatePresence>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={() => onSelectBlog(blog.id)}
            isSelected={selectedBlogId === blog.id}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
