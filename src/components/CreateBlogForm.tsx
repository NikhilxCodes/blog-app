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
    <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span>✨</span> Create New Blog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-xs font-medium uppercase text-muted-foreground mb-1">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-white"
                placeholder="Enter blog title..."
              />
            </div>

            <div>
              <label htmlFor="categories" className="block text-xs font-medium uppercase text-muted-foreground mb-1">
                Categories
              </label>
              <Input
                id="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="TECH, LIFESTYLE"
                required
                className="bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-medium uppercase text-muted-foreground mb-1">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              required
              className="resize-none bg-white"
              placeholder="Short summary..."
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-xs font-medium uppercase text-muted-foreground mb-1">
              Cover Image URL
            </label>
            <Input
              id="coverImage"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
              className="bg-white text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-xs font-medium uppercase text-muted-foreground mb-1">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
              className="bg-white"
              placeholder="Write your story..."
            />
          </div>

          {createBlog.error && (
            <p className="text-sm text-destructive font-medium px-2">
              Error: {createBlog.error.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={createBlog.isPending}
            className="w-full font-bold tracking-wide"
            size="lg"
          >
            {createBlog.isPending ? 'Publishing...' : 'Publish Blog'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
