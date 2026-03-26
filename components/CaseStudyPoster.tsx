type CaseStudyPosterItem = {
  title: string;
  dateRange?: string;
  poster?: string;
  image?: string;
};

type CaseStudyPosterProps = {
  experience: CaseStudyPosterItem;
};

export function CaseStudyPoster({ experience }: CaseStudyPosterProps) {
  const image = experience.poster ?? experience.image;

  return (
    <div className="w-full min-w-[168px] max-w-[320px] mx-auto">
      <div
        className="block border border-neutral-400 bg-neutral-950 rounded-none w-full aspect-[27/40] overflow-hidden shadow-[0_0_16px_rgba(255,255,255,0.12)]"
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full p-6 flex flex-col justify-end">
            <span className="text-neutral-300 text-sm font-medium uppercase tracking-wider">
              {experience.title}
            </span>
          </div>
        )}
      </div>
      {experience.dateRange && (
        <span className="text-neutral-500 text-xs mt-1 block">
          {experience.dateRange}
        </span>
      )}
    </div>
  );
}
