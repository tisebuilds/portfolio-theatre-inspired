import siteMedia from "@/data/site-media.json";

export type SiteMedia = typeof siteMedia;

/** Central list of public image paths — edit `data/site-media.json` to swap files without touching components. */
export const SITE_MEDIA: SiteMedia = siteMedia;
