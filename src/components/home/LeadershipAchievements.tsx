import { Award, Cloud, Sparkles } from "lucide-react";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";

const leadershipRoles = [
  {
    title: "Cloud Lead — Google Developer Student Clubs",
    organization: "GDSC GLA University",
    period: "2022 – 2023",
    summary:
      "Spearheaded cloud computing initiatives and technical training for student developers across the campus.",
  },
  {
    title: "Arcade Facilitator — Google Cloud Community India",
    organization: "Google Cloud Community India",
    period: "2023, 2024",
    summary:
      "Selected as official facilitator for nationwide Google Cloud Arcade skill initiatives over consecutive editions, guiding hundreds of learners.",
  },
  {
    title: "Facilitator — Google Cloud Career Practitioner Pathway",
    organization: "Google Cloud India",
    period: "2022",
    summary:
      "Empowered university cohorts to complete the structured cloud practitioner curriculum and industry-standard tracks.",
  },
];

const certifications = [
  {
    title: "UI/UX Design Certification",
    organization: "Great Learning",
  },
  {
    title: "Cybersecurity Essentials",
    organization: "Cisco Networking Academy",
  },
];

export const LeadershipAchievements = () => {
  return (
    <Reveal delay={0.2}>
      <Container className="space-y-6">
        <Heading as="h2" Icon={<Award className="size-6" />}>
          Leadership &amp; Achievements
        </Heading>

        <div className="space-y-4">
          {/* Startup Bihar Card */}
          <div className="gradient-tile rounded-2xl border border-neutral-200 bg-neutral-100/50 p-6 transition-all hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700">
            <div className="flex flex-col justify-between gap-3 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    Startup Founder
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    March 2025
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-neutral-900 dark:text-white">
                  ₹10,00,000 Seed Funding — Startup Bihar
                </h3>
                <p className="font-mono text-xs text-neutral-500">
                  Department of Industries, Government of Bihar
                </p>
              </div>

              <div className="font-mono text-2xl font-bold text-emerald-600 sm:text-3xl dark:text-emerald-400">
                ₹10 Lakhs
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Secured ₹10,00,000 in non-dilutive seed funding from the Department
              of Industries, Government of Bihar for{" "}
              <strong className="text-neutral-900 dark:text-white">
                Essence Royale
              </strong>
              , a luxury fragrance direct-to-consumer e-commerce startup, as its
              sole founder. Formulated and defended the comprehensive business
              model, unit economics, supply chain architecture, and digital
              storefront before the state evaluation committee.
            </p>
          </div>

          {/* Cloud Community Leadership */}
          <div className="gradient-tile rounded-2xl border border-neutral-200 bg-neutral-100/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <Cloud className="size-5 text-blue-500" />
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                Google Cloud &amp; Developer Community Leadership
              </h3>
            </div>

            <div className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
              {leadershipRoles.map((role) => (
                <div key={role.title} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {role.title}
                    </span>
                    <span className="font-mono text-xs text-neutral-500">
                      {role.period}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                    {role.organization}
                  </div>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {role.summary}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <span className="mb-3 block font-mono text-xs uppercase tracking-wider text-neutral-500">
                Verified Certifications
              </span>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/70 p-3 dark:border-neutral-800 dark:bg-neutral-950/60"
                  >
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                        {cert.title}
                      </div>
                      <div className="font-mono text-[11px] text-neutral-500">
                        {cert.organization}
                      </div>
                    </div>
                    <Sparkles className="size-4 text-amber-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
};
