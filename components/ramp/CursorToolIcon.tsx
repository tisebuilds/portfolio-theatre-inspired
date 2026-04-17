import Image from "next/image";
import { SITE_MEDIA } from "@/lib/site-media";

export function CursorToolIcon() {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      title="Cursor"
    >
      <Image
        src={SITE_MEDIA.toolIcons.cursor}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 object-contain"
        sizes="20px"
      />
    </span>
  );
}
