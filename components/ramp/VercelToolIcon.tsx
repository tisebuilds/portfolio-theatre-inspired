import Image from "next/image";

export function VercelToolIcon() {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      title="Vercel"
    >
      <Image
        src="/images/vercel-app-icon.png"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 object-contain"
        sizes="20px"
      />
    </span>
  );
}
