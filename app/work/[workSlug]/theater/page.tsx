import type { Metadata } from "next";
import { notFound } from "next/navigation";
import workData from "@/data/work.json";
import caseStudyData from "@/data/shipped-case-studies.json";
import { TheaterExperiencePage } from "@/components/theater/TheaterExperiencePage";
import type { WorkExperience, ShippedCaseStudy } from "@/app/types";

const experiences = workData as WorkExperience[];
const caseStudies = caseStudyData as ShippedCaseStudy[];

type Props = {
  params: Promise<{ workSlug: string }>;
};

export async function generateStaticParams() {
  return experiences.map((e) => ({ workSlug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { workSlug } = await params;
  const experience = experiences.find((e) => e.slug === workSlug);
  return {
    title: experience ? `${experience.title} — Experience` : "Experience",
  };
}

export default async function WorkTheaterPage({ params }: Props) {
  const { workSlug } = await params;
  const experience = experiences.find((e) => e.slug === workSlug);
  if (!experience) notFound();

  return (
    <TheaterExperiencePage
      initialSlug={workSlug}
      experiences={experiences}
      caseStudies={caseStudies}
    />
  );
}
