const LETTERBOXD_URL = "https://letterboxd.com/teeshay24/";

const line1 = ["Tise", "moves", "ideas", "from", "draft", "to", "production,"];
const line2 = ["using", "lessons", "from", "great"];

export function Marquee() {
  return (
    <div className="w-full py-5 px-6 rounded-none text-center">
      <span className="text-2xl md:text-3xl font-bold tracking-normal text-neutral-200">
        {line1.map((word, i) => (
          <span key={i} className="word-glow cursor-default">
            {word}{" "}
          </span>
        ))}
        <br />
        {line2.map((word, i) => (
          <span key={i} className="word-glow cursor-default">
            {word}{" "}
          </span>
        ))}
        <a
          href={LETTERBOXD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="word-glow underline underline-offset-2 hover:text-white"
        >
          films
        </a>
      </span>
    </div>
  );
}
