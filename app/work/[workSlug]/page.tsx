import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import workData from "@/data/work.json";
import { ColorStackCaseStudyClient } from "@/components/ColorStackCaseStudyClient";
import { ComingSoonCaseStudyPage } from "@/components/ComingSoonCaseStudyPage";
import { CornellAppDevCaseStudyClient } from "@/components/CornellAppDevCaseStudyClient";
import { DisneyCaseStudyClient } from "@/components/DisneyCaseStudyClient";
import { FigmaCaseStudyClient } from "@/components/FigmaCaseStudyClient";
import { MetaCaseStudyClient } from "@/components/MetaCaseStudyClient";
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
  if (workSlug === "colorstack") {
    return { title: "ColorStack — Case study" };
  }
  if (workSlug === "disney") {
    return {
      title: "Disney Media and Entertainment Distribution Technology — Case study",
    };
  }
  if (workSlug === "figma") {
    return { title: "Figma — Case study" };
  }
  if (workSlug === "meta") {
    return { title: "Meta — Case study" };
  }
  const experience = experiences.find((item) => item.slug === workSlug);
  return {
    title: experience ? `${experience.title} — Case study` : "Case study",
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { workSlug } = await params;

  if (workSlug === "ramp-spend") {
    redirect("/?ch=1&view=episode&ep=0");
  }
  if (workSlug === "ramp-treasury") {
    redirect("/?ch=2&view=episode&ep=0");
  }

  const experience = experiences.find((item) => item.slug === workSlug);
  if (!experience) notFound();

  if (workSlug === "appdev") {
    return <CornellAppDevCaseStudyClient />;
  }
  if (workSlug === "colorstack") {
    return <ColorStackCaseStudyClient />;
  }
  if (workSlug === "disney") {
    return <DisneyCaseStudyClient />;
  }
  if (workSlug === "figma") {
    return <FigmaCaseStudyClient />;
  }
  if (workSlug === "meta") {
    return <MetaCaseStudyClient />;
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
