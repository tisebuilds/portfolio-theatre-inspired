import Link from "next/link";
import type { WorkExperience } from "@/app/types";

type PosterCardProps = {
  experience: WorkExperience;
};

export function PosterCard({ experience }: PosterCardProps) {
  return (
    <div className="w-full flex flex-col">
      <Link
        href={`/work/${experience.slug}`}
        className="block border border-white/[0.06] bg-neutral-950 rounded-none w-full h-[296px] md:h-[356px] overflow-hidden focus:outline-none shadow-[0_1px_2px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.4),0_12px_40px_rgba(0,0,0,0.3)] transition-[box-shadow,border-color] duration-300 ease-spring hover:shadow-[0_2px_4px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5),0_20px_60px_rgba(0,0,0,0.4)] hover:border-white/[0.12]"
      >
        {experience.poster ? (
          <img
            src={experience.poster}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full p-6 flex flex-col justify-end">
            <span className="text-neutral-300 text-sm font-medium uppercase tracking-wider">
              {experience.title}
            </span>
          </div>
        )}
      </Link>
      {/* <span className="text-neutral-500 text-xs mt-4 block text-center">{experience.dateRange}</span> */}
    </div>
  );
}
