import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/:slug/case-study-coming-soon",
        destination: "/work/:slug",
        permanent: true,
      },
      {
        source: "/posters/figma-case-study-hero.png",
        destination: "/media/heroes/figma-case-study-hero.png",
        permanent: true,
      },
      {
        source: "/media/posters/figma-case-study-hero.png",
        destination: "/media/heroes/figma-case-study-hero.png",
        permanent: true,
      },
      { source: "/posters/:path*", destination: "/media/posters/:path*", permanent: true },
      { source: "/stickers/:path*", destination: "/media/stickers/:path*", permanent: true },
      { source: "/profile/:path*", destination: "/media/profile/:path*", permanent: true },
      { source: "/awards/:path*", destination: "/media/awards/:path*", permanent: true },
      { source: "/mentors/:path*", destination: "/media/mentors/:path*", permanent: true },
      { source: "/logos/:path*", destination: "/media/logos/:path*", permanent: true },
      { source: "/ramp/:path*", destination: "/media/ramp/:path*", permanent: true },
      {
        source: "/images/colorstack-instagram/:file",
        destination: "/media/colorstack-instagram/:file",
        permanent: true,
      },
      {
        source: "/images/disney-streaming-cross-platform-hero.png",
        destination: "/media/heroes/disney-streaming-cross-platform-hero.png",
        permanent: true,
      },
      {
        source: "/images/meta-internship-case-study-hero.png",
        destination: "/media/heroes/meta-internship-case-study-hero.png",
        permanent: true,
      },
      {
        source: "/images/jehron-petty-headshot.png",
        destination: "/media/people/jehron-petty-headshot.png",
        permanent: true,
      },
      {
        source: "/images/iphone-16-pink-wallpaper.png",
        destination: "/media/device/iphone-16-pink-wallpaper.png",
        permanent: true,
      },
      {
        source: "/images/iphone-16-plus-pink-back.png",
        destination: "/media/device/iphone-16-plus-pink-back.png",
        permanent: true,
      },
      { source: "/images/:file", destination: "/media/icons/:file", permanent: true },
      {
        source: "/projects/letterboxd-website-wall-demo.mp4",
        destination: "/media/projects/letterboxd-website-wall-demo.mp4",
        permanent: true,
      },
      {
        source: "/projects/ipod-concert-diary-demo.mp4",
        destination: "/media/projects/ipod-concert-diary-demo.mp4",
        permanent: true,
      },
      {
        source: "/projects/dinner-party-seating-chart-demo-1.mp4",
        destination: "/media/projects/dinner-party-seating-chart-demo-1.mp4",
        permanent: true,
      },
      {
        source: "/projects/dinner-party-seating-chart-demo-2.mp4",
        destination: "/media/projects/dinner-party-seating-chart-demo-2.mp4",
        permanent: true,
      },
      {
        source: "/projects/dinner-party-seating-chart-photo-1.png",
        destination: "/media/projects/dinner-party-seating-chart-photo-1.png",
        permanent: true,
      },
      {
        source: "/projects/dinner-party-seating-chart-photo-2.png",
        destination: "/media/projects/dinner-party-seating-chart-photo-2.png",
        permanent: true,
      },
      { source: "/projects/htr.png", destination: "/media/projects/htr.png", permanent: true },
      {
        source: "/reserve-account.png",
        destination: "/media/shipped/reserve-account.png",
        permanent: true,
      },
      {
        source: "/reserve-limit-update.png",
        destination: "/media/shipped/reserve-limit-update.png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
