import type { Blog } from '../types/blog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { motion } from 'framer-motion';

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
  isSelected: boolean;
}

export const BlogCard = ({ blog, onClick, isSelected }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <Card
        className={`cursor-pointer transition-all border-l-4 overflow-hidden ${isSelected
          ? 'border-l-primary ring-2 ring-primary/20 shadow-lg'
          : 'border-l-transparent hover:shadow-md'
          }`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.category.map((cat, index) => (
              <span
                key={cat}
                className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full ${index % 2 === 0
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
                  }`}
              >
                {cat}
              </span>
            ))}
          </div>
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm mt-1">
            {blog.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <time>{new Date(blog.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</time>
            <span className="mx-2">•</span>
            <span>5 min read</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
