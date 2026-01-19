import { useState } from 'react';
import { useCreateBlog } from '../hooks/useBlogs';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categories, setCategories] = useState('');
  
  const createBlog = useCreateBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryArray = categories
      .split(',')
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0);

    if (!title || !description || !content || !coverImage || categoryArray.length === 0) {
      return;
    }

    createBlog.mutate(
      {
        title,
        description,
        content,
        coverImage,
        category: categoryArray,
        date: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setContent('');
          setCoverImage('');
          setCategories('');
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="categories" className="block text-sm font-medium mb-2">
              Categories (comma-separated)
            </label>
            <Input
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="FINANCE, TECH"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
              Cover Image URL
            </label>
            <Input
              id="coverImage"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
            />
          </div>

          {createBlog.error && (
            <p className="text-sm text-destructive">
              Error: {createBlog.error.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={createBlog.isPending}
            className="w-full"
          >
            {createBlog.isPending ? 'Creating...' : 'Create Blog'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
