export type PostListItem = {
  id: string;
  title: string;
  excerpt: string;
  published: boolean;
};



export type PostDetail = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  authorId: string;
  updatedAt: Date;
};