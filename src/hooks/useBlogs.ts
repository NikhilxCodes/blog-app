import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsApi } from '../api/blogs';
import { CreateBlogRequest } from '../types/blog';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogsApi.getAll,
  });
};

export const useBlog = (id: number | null) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogsApi.getById(id!),
    enabled: id !== null,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: CreateBlogRequest) => blogsApi.create(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
