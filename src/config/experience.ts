import { CSS } from "@/svgs/technologies/CSS";
import { HTML } from "@/svgs/technologies/Html";
import { Java } from "@/svgs/technologies/Java";
import { JavaScript } from "@/svgs/technologies/JavaScript";
import { NodeJs } from "@/svgs/technologies/NodeJs";
import { ReactIcon } from "@/svgs/technologies/ReactIcon";
import { TailwindCss } from "@/svgs/technologies/TailwindCss";
import { TypeScript } from "@/svgs/technologies/TypeScript";

export const experience = [
  {
    id: 1,
    company: "Champaran Group of Institutions",
    post: "Computer Science Instructor & Technical Trainer",
    description:
      "Delivered structured lecture modules on Data Structures & Algorithms, Modern Web Technologies, and Cloud Computing architectures to 150+ students.",
    duration: "Jan 2025 - Jan 2026",
    place: "West Champaran, Bihar",
    points: [
      "Delivered rigorous, structured lecture modules on Data Structures & Algorithms, Modern Web Technologies, and Cloud Computing architectures to 150+ Diploma and B.Tech students.",
      "Designed and evaluated 50+ practical coding assignments, problem-solving benchmarks, and algorithmic diagnostic sessions.",
      "Mentored student capstone engineering teams in building production-grade React and AWS serverless cloud applications.",
      "Directly coached and guided an exceptional student who clinched State Rank 2 across Bihar Polytechnic examinations.",
    ],
    technologies: [
      { name: "Java", icon: Java },
      { name: "React", icon: ReactIcon },
      { name: "Node.js", icon: NodeJs },
      { name: "JavaScript", icon: JavaScript },
    ],
  },
  {
    id: 2,
    company: "Octanet",
    post: "Frontend Developer",
    description:
      "Architected clean, accessible, and performant user interface components utilizing ReactJS and modern Tailwind CSS design tokens.",
    duration: "Jun 2024 - Dec 2024",
    place: "Remote",
    points: [
      "Architected clean, accessible, and performant user interface components utilizing ReactJS and modern Tailwind CSS design tokens.",
      "Executed critical performance tuning, code splitting, and asset optimizations yielding a 20% improvement in core page speed metrics.",
      "Integrated complex RESTful API contracts seamlessly with client-side state managers and defensive error boundaries.",
      "Collaborated actively in sprint planning, pull request peer reviews, and Agile release cycles.",
    ],
    technologies: [
      { name: "React", icon: ReactIcon },
      { name: "TypeScript", icon: TypeScript },
      { name: "Tailwind CSS", icon: TailwindCss },
      { name: "JavaScript", icon: JavaScript },
    ],
  },
  {
    id: 3,
    company: "Bharat Intern",
    post: "Frontend Developer Intern",
    description:
      "Built client-facing web application modules applying ReactJS, semantic HTML5, modern CSS3, and JavaScript.",
    duration: "Jun 2023 - Jul 2023",
    place: "Remote",
    points: [
      "Built client-facing web application modules applying ReactJS, semantic HTML5, modern CSS3, and JavaScript.",
      "Standardized UI component modularity, enhancing overall codebase maintainability and reusability across internal modules.",
      "Participated in daily standups and delivered assigned functional deliverables ahead of schedule.",
    ],
    technologies: [
      { name: "React", icon: ReactIcon },
      { name: "JavaScript", icon: JavaScript },
      { name: "HTML", icon: HTML },
      { name: "CSS", icon: CSS },
    ],
  },
];
