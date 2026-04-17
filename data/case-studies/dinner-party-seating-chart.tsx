import Image from "next/image";
import type { StandardWorkCaseStudyProps } from "@/components/StandardWorkCaseStudy";
import { MetaDot } from "@/components/case-study-icons";
import { DinnerPartyCaseStudyToolLogoStrip } from "@/components/case-study-tool-logos";

const PHOTO_1 = "/media/projects/dinner-party-seating-chart-photo-1.png";
const PHOTO_2 = "/media/projects/dinner-party-seating-chart-photo-2.png";

const BODY_COPY =
  "I built a dinner seating tool for a 23-person alumni event, but the real challenge was staying within a $200 ColorStack budget without risking a declined Ramp charge. I started by thinking through a few basics: where people should sit, what they would eat, and how those choices affected total cost. From there, I built a UI that tracks per-table spend in real time while accounting for dietary needs and headcount. Working with Claude helped me rethink the problem and turn what looked like a simple seating chart into a budget-aware event planning tool. This project shows how I like to work: breaking complex problems into simple questions, streamlining manual tasks with AI, and my bias toward action.";

const demosGrid = (
  <div className="grid max-w-full grid-cols-1 gap-4 lg:grid-cols-2">
    <div className="overflow-hidden rounded-md border border-white/[0.08] bg-black/40 p-2">
      <video
        src="/media/projects/dinner-party-seating-chart-demo-1.mp4"
        controls
        playsInline
        className="h-auto w-full"
        preload="metadata"
      />
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/45">
        Demo 1
      </p>
    </div>
    <div className="overflow-hidden rounded-md border border-white/[0.08] bg-black/40 p-2">
      <video
        src="/media/projects/dinner-party-seating-chart-demo-2.mp4"
        controls
        playsInline
        className="h-auto w-full"
        preload="metadata"
      />
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/45">
        Demo 2
      </p>
    </div>
  </div>
);

const photosGrid = (
  <div className="grid max-w-full grid-cols-1 gap-4 md:grid-cols-2">
    <figure className="overflow-hidden rounded-md border border-white/[0.08] bg-black/40 p-2">
      <Image
        src={PHOTO_1}
        alt="Dinner party seating setup"
        width={1200}
        height={800}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/45">
        Photo 1
      </figcaption>
    </figure>
    <figure className="overflow-hidden rounded-md border border-white/[0.08] bg-black/40 p-2">
      <Image
        src={PHOTO_2}
        alt="Dinner party event"
        width={1200}
        height={800}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/45">
        Photo 2
      </figcaption>
    </figure>
  </div>
);

export const dinnerPartySeatingCaseStudyContent: StandardWorkCaseStudyProps = {
  idPrefix: "dinner-party-seating",
  title: "Dinner Party Seating Chart",
  dateRange: "2026",
  meta: (
    <>
      <span>Side project</span>
      <MetaDot />
      <span>1 day</span>
      <MetaDot />
      <DinnerPartyCaseStudyToolLogoStrip />
    </>
  ),
  hero: {
    src: PHOTO_1,
    alt: "Photo from the ColorStack alumni dinner setup.",
    caption: "I don't wait for solutions; I build them.",
  },
  learningsLayout: "stacked",
  overview: <p>{BODY_COPY}</p>,
  learnings: [
    { title: "Demos", content: demosGrid },
    { title: "Event", content: photosGrid },
  ],
  creditsIntro: "",
  creditsColumns: [],
};
