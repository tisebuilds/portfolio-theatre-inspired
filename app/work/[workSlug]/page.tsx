import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import workData from "@/data/work.json";
import { ColorStackCaseStudyClient } from "@/components/ColorStackCaseStudyClient";
import { ComingSoonCaseStudyPage } from "@/components/ComingSoonCaseStudyPage";
import { CornellAppDevCaseStudyClient } from "@/components/CornellAppDevCaseStudyClient";
import { DisneyCaseStudyClient } from "@/components/DisneyCaseStudyClient";
import { FigmaCaseStudyClient } from "@/components/FigmaCaseStudyClient";
import { MetaCaseStudyClient } from "@/components/MetaCaseStudyClient";
import { RampSpendCaseStudyClient } from "@/components/RampSpendCaseStudyClient";
import { RampTreasuryCaseStudyClient } from "@/components/RampTreasuryCaseStudyClient";
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
  if (workSlug === "ramp-treasury") {
    return {
      title: "Ramp Treasury — Tise",
      description:
        "Ramp Treasury work by Tise — Move Money and RBA cashback redemption.",
      openGraph: {
        title: "Ramp Treasury — Tise",
        description:
          "Ramp Treasury work by Tise — Move Money and RBA cashback redemption.",
        images: [{ url: "/ramp/treasury/move-money-hero.png" }],
      },
    };
  }
  if (workSlug === "ramp-spend") {
    return {
      title: "Ramp Spend Management — Tise",
      description:
        "Ramp Spend Management work by Tise — Employee onboarding, Wallet Drawer, Quality of life updates for Akuma.",
      openGraph: {
        title: "Ramp Spend Management — Tise",
        description:
          "Ramp Spend Management work by Tise — Employee onboarding, Wallet Drawer, Quality of life updates for Akuma.",
        images: [{ url: "/ramp/spend/cardholder-creation-hero.png" }],
      },
    };
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
  if (workSlug === "ramp-treasury") {
    return (
      <Suspense
        fallback={
          <div
            className="fixed inset-0 z-40 bg-[#111111]"
            aria-label="Loading case study"
          />
        }
      >
        <RampTreasuryCaseStudyClient />
      </Suspense>
    );
  }
  if (workSlug === "ramp-spend") {
    return (
      <Suspense
        fallback={
          <div
            className="fixed inset-0 z-40 bg-[#111111]"
            aria-label="Loading case study"
          />
        }
      >
        <RampSpendCaseStudyClient />
      </Suspense>
    );
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
