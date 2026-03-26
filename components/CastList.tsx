type CastMember = { name: string; role?: string };

type CastListProps = {
  cast: CastMember[];
};

export function CastList({ cast }: CastListProps) {
  return (
    <section aria-labelledby="cast-heading">
      <h2
        id="cast-heading"
        className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-4"
      >
        Cast
      </h2>
      <ul className="list-none p-0 m-0 flex flex-wrap gap-4 sm:gap-6">
        {cast.map((member, i) => (
          <li key={i} className="relative group">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-neutral-600 bg-neutral-800/80 flex items-center justify-center shrink-0 transition-colors group-hover:border-neutral-500 cursor-default"
              aria-label={
                member.role
                  ? `${member.name} · ${member.role}`
                  : member.name
              }
            />
            <span
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs font-medium text-neutral-200 bg-neutral-800 border border-neutral-600 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 z-10"
              aria-hidden
            >
              {member.role ? `${member.name} · ${member.role}` : member.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
