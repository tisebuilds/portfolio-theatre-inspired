import Image from "next/image";
import type { StandardWorkCaseStudyProps } from "@/components/StandardWorkCaseStudy";
import { MetaDot } from "@/components/case-study-icons";
import { DinnerPartyCaseStudyToolLogoStrip } from "@/components/case-study-tool-logos";

const PHOTO_1 = "/media/projects/dinner-party-seating-chart-photo-1.png";
const PHOTO_2 = "/media/projects/dinner-party-seating-chart-photo-2.png";

const demosGrid = (
  <div className="grid max-w-full grid-cols-1 gap-4 lg:grid-cols-2">
    <div className="overflow-hidden rounded-md bg-black/40 py-2">
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
    <div className="overflow-hidden rounded-md bg-black/40 py-2">
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
  overview: (
    <>
      <p>
        I needed a dinner party seating chart for a 23-person alumni event to help
        me stay in ColorStack&apos;s $200 budget. I started by breaking the
        problem into a few simple questions:
      </p>
      <ol className="mt-4 list-none space-y-1 p-0">
        <li>1. Where people should sit?</li>
        <li>2. What can they eat?</li>
        <li>3. How those decisions affected the total cost?</li>
      </ol>
      <p style={{ marginTop: 24 }}>
        Building with Claude forced me to rethink the problem. I didn&apos;t
        need a seating chart, I needed a budget-aware event planning tool. The
        result, a tool that can track spend in real time while handling dietary
        restrictions.
      </p>
      <p>The project reflects how I like to work:</p>
      <ol className="mt-4 list-none space-y-1 p-0">
        <li>1. Breaking complex problems into simple questions</li>
        <li>2. Using AI to streamline tedious tasks</li>
      </ol>
    </>
  ),
  learnings: [
    { title: "", content: demosGrid },
    { title: "", content: photosGrid },
  ],
  creditsIntro: "",
  creditsColumns: [],
};
