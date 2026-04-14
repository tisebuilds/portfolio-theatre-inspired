import {
  caseStudySectionHeadingClass,
  caseStudySpacing,
} from "@/components/case-study-spacing";

type SkillsListProps = {
  items: string[];
};

export function SkillsList({ items }: SkillsListProps) {
  return (
    <section aria-labelledby="skills-heading" className="rounded-none">
      <h2 id="skills-heading" className={caseStudySectionHeadingClass}>
        Skills
      </h2>
      <ul
        className={`list-none p-0 m-0 flex flex-wrap gap-2 ${caseStudySpacing.labelToContent}`}
      >
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
