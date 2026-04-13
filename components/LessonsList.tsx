type LessonsListProps = {
  items: string[];
};

export function LessonsList({ items }: LessonsListProps) {
  return (
    <section aria-labelledby="lessons-heading">
      <h2
        id="lessons-heading"
        className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3"
      >
        Lessons
      </h2>
      <ul className="list-none p-0 m-0 flex flex-col gap-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="border border-neutral-700 bg-neutral-950 px-4 py-3 rounded-none text-[14px] leading-[1.85] text-neutral-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
