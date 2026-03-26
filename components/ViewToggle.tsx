"use client";

type View = "theatre" | "list";

type ViewToggleProps = {
  view: View;
  onViewChange: (view: View) => void;
};

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex border border-neutral-600 rounded-none overflow-hidden w-fit">
      <button
        type="button"
        onClick={() => onViewChange("theatre")}
        className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors rounded-none border-0 border-r border-neutral-600 ${
          view === "theatre"
            ? "bg-neutral-200 text-black"
            : "bg-black text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
        }`}
      >
        Theatre
      </button>
      <button
        type="button"
        onClick={() => onViewChange("list")}
        className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors rounded-none border-0 ${
          view === "list"
            ? "bg-neutral-200 text-black"
            : "bg-black text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
        }`}
      >
        List
      </button>
    </div>
  );
}
