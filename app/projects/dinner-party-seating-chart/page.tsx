export const metadata = {
  title: "Dinner Party Seating Chart",
  description: "Videos and photos from the Dinner Party Seating Chart project.",
};

const videos = [
  "/projects/dinner-party-seating-chart-demo-1.mp4",
  "/projects/dinner-party-seating-chart-demo-2.mp4",
];

const images = [
  "/projects/dinner-party-seating-chart-photo-1.png",
  "/projects/dinner-party-seating-chart-photo-2.png",
];

export default function DinnerPartySeatingChartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-12">
          <section className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-neutral-100">
              Dinner Party Seating Chart
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-semibold tracking-wide text-neutral-100 leading-snug">
              I don't wait for solutions; I build them.
            </p>
            <p className="mt-6 text-sm md:text-base text-neutral-400 leading-relaxed">
              I built a dinner seating tool for a 23-person alumni event, but the
              real challenge was staying within a $200 ColorStack budget without
              risking a declined Ramp charge. I started by thinking through a few
              basics: where people should sit, what they would eat, and how those
              choices affected total cost. From there, I built a UI that tracks
              per-table spend in real time while accounting for dietary needs and
              headcount. Working with Claude helped me rethink the problem and turn
              what looked like a simple seating chart into a budget-aware event
              planning tool. This project shows how I like to work: breaking complex
              problems into simple questions, streamlining manual tasks with AI,
              and my bias toward action.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-accent">
              Demos
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {videos.map((src, index) => (
                <article
                  key={src}
                  className="border border-neutral-800 bg-black p-3"
                >
                  <video
                    src={src}
                    controls
                    playsInline
                    className="w-full h-auto"
                  />
                  <p className="mt-2 text-xs text-neutral-500 uppercase tracking-wide">
                    Demo {index + 1}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-accent">
              Photos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((src, index) => (
                <figure
                  key={src}
                  className="border border-neutral-800 bg-black p-3"
                >
                  <img
                    src={src}
                    alt={`Dinner party photo ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                  <figcaption className="mt-2 text-xs text-neutral-500 uppercase tracking-wide">
                    Photo {index + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
