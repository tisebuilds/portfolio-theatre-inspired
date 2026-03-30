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
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-neutral-100">
              Dinner Party Seating Chart
            </h1>
            <p className="mt-4 text-sm md:text-base text-neutral-400 leading-relaxed">
              All demos and photos from the 2026 project.
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
