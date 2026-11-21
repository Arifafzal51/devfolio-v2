import { Code2, Flame, Trophy } from "lucide-react";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";

const platforms = [
  {
    name: "LeetCode",
    count: "175+",
    note: "Weekly contests & challenges",
    icon: Flame,
    color: "text-amber-500 dark:text-amber-400",
    url: "https://leetcode.com",
  },
  {
    name: "GeeksforGeeks",
    count: "80+",
    note: "Data structures & core algorithms",
    icon: Code2,
    color: "text-emerald-500 dark:text-emerald-400",
    url: "https://www.geeksforgeeks.org",
  },
  {
    name: "HackerRank",
    count: "120+",
    note: "Problem solving benchmarks",
    icon: Trophy,
    color: "text-blue-500 dark:text-blue-400",
    url: "https://www.hackerrank.com",
  },
];

const topics = [
  "Arrays & Two Pointers",
  "Strings & Sliding Window",
  "Linked Lists",
  "Stacks & Queues",
  "Binary Trees & BST",
  "Graph Algorithms (BFS/DFS)",
  "Dynamic Programming",
  "Java Collections Framework",
];

export const ProblemSolving = () => {
  return (
    <Reveal delay={0.2}>
      <Container className="space-y-6">
        <Heading as="h2" Icon={<Code2 className="size-6" />}>
          Problem Solving &amp; DSA
        </Heading>

        <div className="gradient-tile rounded-2xl border border-neutral-200 bg-neutral-100/50 p-6 transition-colors dark:border-neutral-800 dark:bg-neutral-900/40">
          {/* Milestone Banner */}
          <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center dark:border-neutral-800">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                Cumulative Milestone
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                  400+
                </span>
                <span className="font-mono text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Problems Solved in Java
                </span>
              </div>
            </div>
            <span className="w-fit rounded-full border border-neutral-300 bg-white px-3 py-1 font-mono text-xs text-neutral-700 shadow-xs dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              Weekly Contest Participant
            </span>
          </div>

          {/* Platform breakdown */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="rounded-xl border border-neutral-200 bg-white/70 p-4 transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900/70"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      {p.name}
                    </span>
                    <Icon className={`size-4 ${p.color}`} />
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-neutral-900 dark:text-white">
                    {p.count}
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">{p.note}</p>
                </div>
              );
            })}
          </div>

          {/* Competencies */}
          <div className="mt-6 pt-2">
            <span className="mb-3 block font-mono text-xs uppercase tracking-wider text-neutral-500">
              Algorithmic Competencies
            </span>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-lg border border-neutral-200 bg-white/60 px-3 py-1 font-mono text-xs text-neutral-700 transition-colors dark:border-neutral-800 dark:bg-neutral-950/60 dark:text-neutral-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
};
