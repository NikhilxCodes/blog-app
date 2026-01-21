import type { Blog, CreateBlogRequest } from '../types/blog';

const API_BASE_URL = 'http://localhost:3001';

type BlogAPIResponse = Omit<Blog, 'id'> & { id: string | number };

const normalizeBlog = (blog: BlogAPIResponse): Blog => ({
  ...blog,
  id: String(blog.id),
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

  getById: async (id: string): Promise<Blog> => {
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

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
  },
};
