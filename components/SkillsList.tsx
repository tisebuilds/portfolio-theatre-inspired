type SkillsListProps = {
  items: string[];
};

export function SkillsList({ items }: SkillsListProps) {
  return (
    <section aria-labelledby="skills-heading" className="rounded-none">
      <h2
        id="skills-heading"
        className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3"
      >
        Skills
      </h2>
      <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <li
            key={i}
            className="rounded-none bg-neutral-900/80 px-3 py-1.5 text-neutral-200 text-sm"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
