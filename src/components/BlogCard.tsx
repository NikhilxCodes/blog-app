import { Blog } from '../types/blog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
  isSelected: boolean;
}

export const BlogCard = ({ blog, onClick, isSelected }: BlogCardProps) => {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.category.map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded"
            >
              {cat}
            </span>
          ))}
        </div>
        <CardTitle className="text-lg">{blog.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {blog.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          {new Date(blog.date).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};
