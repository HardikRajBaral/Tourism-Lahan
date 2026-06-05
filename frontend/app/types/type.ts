export type NavItems = "dashboard" | "posts" | "createPost";
export type PostProps = {
  onNavigate: (page: NavItems) => void;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;        
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};