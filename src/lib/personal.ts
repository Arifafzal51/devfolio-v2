export type Book = {
  name: string;
  author?: string;
  imageUrl: string;
  category: string;
};

export const books: Book[] = [
  // Mindset & Growth
  {
    name: "Atomic Habits",
    author: "James Clear",
    imageUrl: "/books/atomic-habits.webp",
    category: "Mindset & Growth",
  },
  {
    name: "Psycho-Cybernetics",
    author: "Maxwell Maltz",
    imageUrl: "/books/psycho-cybernetics.webp",
    category: "Mindset & Growth",
  },
  {
    name: "The Psychology of Money",
    author: "Morgan Housel",
    imageUrl: "/books/psychology-of-money.webp",
    category: "Mindset & Growth",
  },
  {
    name: "Do It Today",
    author: "Darius Foroux",
    imageUrl: "/books/do-it-today.webp",
    category: "Mindset & Growth",
  },
  {
    name: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    imageUrl: "/books/ikigai.webp",
    category: "Mindset & Growth",
  },

  // Computer Science & Engineering (B.Tech CSE - GLA University)
  {
    name: "Design & Analysis of Algorithms",
    author: "Cormen, Leiserson, Rivest & Stein (CLRS)",
    imageUrl: "/books/algorithms.webp",
    category: "Computer Science & Engineering",
  },
  {
    name: "Java & Object-Oriented Programming (OOPS)",
    author: "Kathy Sierra & Bert Bates",
    imageUrl: "/books/head-first-java.webp",
    category: "Computer Science & Engineering",
  },
  {
    name: "Operating System Concepts",
    author: "Silberschatz, Galvin & Gagne",
    imageUrl: "/books/operating-systems.webp",
    category: "Computer Science & Engineering",
  },
  {
    name: "Computer Networking: A Top-Down Approach",
    author: "James Kurose & Keith Ross",
    imageUrl: "/books/computer-networking.webp",
    category: "Computer Science & Engineering",
  },
  {
    name: "Database System Concepts (DBMS)",
    author: "Abraham Silberschatz & Henry F. Korth",
    imageUrl: "/books/database-systems.webp",
    category: "Computer Science & Engineering",
  },

  // Business & Startups
  {
    name: "Zero to One",
    author: "Peter Thiel",
    imageUrl: "/books/zereo-to-one.webp",
    category: "Business & Startups",
  },
  {
    name: "The Lean Startup",
    author: "Eric Ries",
    imageUrl: "/books/lean-startup.webp",
    category: "Business & Startups",
  },
  {
    name: "The Millionaire Fastlane",
    author: "MJ DeMarco",
    imageUrl: "/books/millionaire-fastlane.webp",
    category: "Business & Startups",
  },
];

export const movies = [
  { title: "Iron Man", year: 2008 },
  { title: "The Social Network", year: 2010 },
  { title: "F1", year: 2025 },
  { title: "Spider Man: Brand New Day", year: 2026 },
  { title: "Whiplash", year: 2014 },
  { title: "The Founder", year: 2016 },
  { title: "3 Idiots", year: 2009 },
  { title: "Devdas", year: 2002 },
];
