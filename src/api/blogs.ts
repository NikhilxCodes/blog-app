import { Blog, CreateBlogRequest } from '../types/blog';

const API_BASE_URL = 'http://localhost:3001';

const normalizeBlog = (blog: any): Blog => ({
  ...blog,
  id: typeof blog.id === 'string' ? parseInt(blog.id, 10) : blog.id,
});

export const blogsApi = {
  getAll: async (): Promise<Blog[]> => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();
    return data.map(normalizeBlog);
  },

  getById: async (id: number): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with id ${id}`);
    }
    const data = await response.json();
    return normalizeBlog(data);
  },

  create: async (blog: CreateBlogRequest): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    const data = await response.json();
    return normalizeBlog(data);
  },
};
