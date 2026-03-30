import { notFound } from "next/navigation";
import workData from "@/data/work.json";
import { ComingSoonCaseStudyPage } from "@/components/ComingSoonCaseStudyPage";
import type { WorkExperience } from "@/app/types";

const experiences = workData as WorkExperience[];

type Props = {
  params: Promise<{ workSlug: string }>;
};

export async function generateStaticParams() {
  return experiences.map((experience) => ({ workSlug: experience.slug }));
}

export default async function WorkCaseStudyComingSoonPage({ params }: Props) {
  const { workSlug } = await params;
  const experience = experiences.find((item) => item.slug === workSlug);
  if (!experience) notFound();

  return (
    <ComingSoonCaseStudyPage
      journalUrl={experience.journalUrl}
      journalLabel={experience.journalLabel}
    />
  );
}
