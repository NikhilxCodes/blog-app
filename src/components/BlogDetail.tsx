import { useBlog } from '../hooks/useBlogs';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface BlogDetailProps {
  blogId: number | null;
}

export const BlogDetail = ({ blogId }: BlogDetailProps) => {
  const { data: blog, isLoading, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <Card className="p-6 h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select a blog to view details</p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-destructive">Error loading blog: {error.message}</p>
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.category.map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded"
            >
              {cat}
            </span>
          ))}
        </div>
        <CardTitle className="text-2xl mb-2">{blog.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-lg text-muted-foreground mb-4">{blog.description}</p>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed">{blog.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};
