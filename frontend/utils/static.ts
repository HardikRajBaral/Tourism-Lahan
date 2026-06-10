import { Post } from "@/types/Post";

export const dummyPosts: Post[] = [
  {
    id: "1",
    title: "The Whispering Sands of Siwa",
    excerpt: "A journey through the golden dunes of Egypt's most remote oasis.",
    content:
      "Siwa is one of Egypt's most isolated settlements, located near the Libyan border.",
    image: "https://images.unsplash.com/photo-1539768942893-daf639082543?w=400",
    published: true,
    authorId: "user_1",
    createdAt: new Date("2023-10-24"),
    updatedAt: new Date("2023-10-25"),
  },
  {
    id: "2",
    title: "Finding Solitude in the High Alps",
    excerpt:
      "Switzerland's breathtaking peaks offer more than just scenic views.",
    content:
      "The Swiss Alps are a world unto themselves. Beyond the ski resorts and tourist trails lies a network of ancient paths.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    published: false,
    authorId: "user_1",
    createdAt: new Date("2023-11-12"),
    updatedAt: new Date("2023-11-13"),
  },
  {
    id: "3",
    title: "The Geometry of Jaipur",
    excerpt:
      "India's Pink City is a masterclass in Mughal architecture and color.",
    content: "Jaipur was built in 1727 by Maharaja Jai Singh II.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400",
    published: true,
    authorId: "user_2",
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2023-09-06"),
  },
  {
    id: "4",
    title: "A Rainy Tuesday in Montmartre",
    excerpt: "Paris reveals its true soul on grey, quiet weekday mornings.",
    content:
      "Most tourists see Paris in the summer. But the city transforms in the rain.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
    published: false,
    authorId: "user_2",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-02"),
  },
  {
    id: "5",
    title: "Crossing the Sahara by Night",
    excerpt: "When the sun sets, the world's largest desert comes alive.",
    content:
      "Traveling the Sahara by night is a completely different experience.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400",
    published: true,
    authorId: "user_3",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
  },
];
