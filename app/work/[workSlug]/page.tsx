import type { Metadata } from "next";
import { notFound } from "next/navigation";
import workData from "@/data/work.json";
import { ComingSoonCaseStudyPage } from "@/components/ComingSoonCaseStudyPage";
import { CornellAppDevCaseStudyClient } from "@/components/CornellAppDevCaseStudyClient";
import type { WorkExperience } from "@/app/types";

const experiences = workData as WorkExperience[];

type Props = {
  params: Promise<{ workSlug: string }>;
};

export async function generateStaticParams() {
  return experiences.map((experience) => ({ workSlug: experience.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { workSlug } = await params;
  if (workSlug === "appdev") {
    return { title: "Cornell AppDev — Case study" };
  }
  const experience = experiences.find((item) => item.slug === workSlug);
  return {
    title: experience ? `${experience.title} — Case study` : "Case study",
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { workSlug } = await params;
  const experience = experiences.find((item) => item.slug === workSlug);
  if (!experience) notFound();

  if (workSlug === "appdev") {
    return <CornellAppDevCaseStudyClient />;
  }

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
