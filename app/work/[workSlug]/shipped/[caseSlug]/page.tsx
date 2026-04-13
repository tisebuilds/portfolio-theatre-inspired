import type { Metadata } from "next";
import { notFound } from "next/navigation";
import shippedCaseStudiesData from "@/data/shipped-case-studies.json";
import workData from "@/data/work.json";
import { PrototypeEmbed } from "@/components/PrototypeEmbed";
import { TabbedPrototypeSection } from "@/components/TabbedPrototypeSection";
import { SkillsList } from "@/components/SkillsList";
import { DesignDecisionsDrawer } from "@/components/DesignDecisionsDrawer";
import { ComingSoonCaseStudyPage } from "@/components/ComingSoonCaseStudyPage";
import type { ShippedCaseStudy } from "@/app/types";
import type { WorkExperience } from "@/app/types";

const caseStudies = shippedCaseStudiesData as ShippedCaseStudy[];
const experiences = workData as WorkExperience[];

type Props = {
  params: Promise<{ workSlug: string; caseSlug: string }>;
};

export async function generateStaticParams() {
  const publishedPairs = caseStudies.map((c) => ({
    workSlug: c.workSlug,
    caseSlug: c.slug,
  }));

  const upcomingPairs = experiences.flatMap((exp) =>
    (exp.whatShipped ?? [])
      .filter((item): item is { slug: string; label: string } => {
        return typeof item === "object" && typeof item.slug === "string";
      })
      .filter(
        (item) =>
          !caseStudies.some(
            (study) => study.workSlug === exp.slug && study.slug === item.slug,
          ),
      )
      .map((item) => ({
        workSlug: exp.slug,
        caseSlug: item.slug,
      })),
  );

  return [...publishedPairs, ...upcomingPairs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { workSlug, caseSlug } = await params;
  const study = caseStudies.find(
    (c) => c.workSlug === workSlug && c.slug === caseSlug,
  );
  const experience = experiences.find((e) => e.slug === workSlug);
  if (!experience) {
    return { title: "Case study" };
  }
  if (study && study.status !== "coming-soon") {
    return { title: `${study.title} — ${experience.title}` };
  }
  return { title: `${experience.title} — Case study` };
}

export default async function ShippedCaseStudyPage({ params }: Props) {
  const { workSlug, caseSlug } = await params;
  const study = caseStudies.find(
    (c) => c.workSlug === workSlug && c.slug === caseSlug
  );
  const experience = experiences.find((e) => e.slug === workSlug);
  if (!experience) notFound();

  const isComingSoon = !study || study.status === "coming-soon";
  if (isComingSoon) {
    return (
      <ComingSoonCaseStudyPage
        title={experience.title}
        dateRange={experience.dateRange}
        description={experience.description}
        poster={experience.poster}
        journalUrl={experience.journalUrl}
        journalLabel={experience.journalLabel}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
        <main className="container mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-6 py-16">
        {/* Content aligned with prototype chrome (max-w-4xl mx-auto) */}
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-14">
          {/* Project: title + description at top of page */}
          <section className="flex flex-col gap-6 max-w-2xl" aria-label="Project">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-neutral-200">
                {study.title}
              </h1>
              {study.shippedQuarter && (
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium uppercase tracking-wider bg-neutral-700/80 text-neutral-400"
                  aria-label={`Shipped ${study.shippedQuarter}`}
                >
                  {study.shippedQuarter}
                </span>
              )}
            </div>
            {study.projectDescription ? (
              <p className="text-white text-sm leading-relaxed">
                {study.projectDescription}
              </p>
            ) : (
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {study.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-neutral-700 pl-4 text-neutral-500 text-sm leading-relaxed"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Prototype: tabbed when study.tabs is set, otherwise single */}
          {study.tabs && study.tabs.length > 0 ? (
            <TabbedPrototypeSection tabs={study.tabs} title={study.title} />
          ) : (
            <figure
              className="w-full max-w-4xl mx-auto flex flex-col gap-4"
              aria-label={`${study.title} – prototype and problem`}
            >
              <PrototypeEmbed
                url={study.prototypeUrl}
                type={study.prototypeType ?? "embed"}
                title={study.title}
                tabTitle={study.tabTitle}
                urlBarText={study.urlBarText}
              />
              {study.problem && (
                <figcaption className="flex flex-col gap-1.5">
                  <p className="text-neutral-500 text-sm leading-relaxed text-center">
                    {study.problem}
                  </p>
                </figcaption>
              )}
            </figure>
          )}

          {/* Impact: card-style metrics */}
          {study.impact && study.impact.length > 0 && (
            <section className="flex flex-col w-full max-w-4xl" aria-label="Impact">
              <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
                Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {study.impact.map((card, i) => (
                  <article
                    key={i}
                    className="rounded-none bg-neutral-900/80 p-6 flex flex-col gap-3"
                  >
                    <span className="text-2xl font-bold text-neutral-200">
                      {card.metric}
                    </span>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
              <DesignDecisionsDrawer projectTitle={study.title} />
            </section>
          )}

          {/* Skills used in this case study */}
          {study.skills && study.skills.length > 0 && (
            <SkillsList items={study.skills} />
          )}
        </div>
      </main>
    </div>
  );
}
