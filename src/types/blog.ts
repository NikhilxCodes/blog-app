export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
  author: Author;
}

export interface CreateBlogRequest {
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
  author: Author;
}
