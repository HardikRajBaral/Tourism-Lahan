export type NavItems = "dashboard" | "posts" | "createPost" | "editPost";
export type PostProps = {
  onNavigate: (page: NavItems | string) => void;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;        
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};


export type CardPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;        
  updatedAt: Date;
};