import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Pacto Blogger",
    short_name: "Pacto",
    description: "캠페인을 찾고 미션과 보상을 관리하는 Pacto 블로거 앱",
    start_url: "/campaigns",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1677f2",
    orientation: "portrait-primary",
    lang: "ko-KR",
    categories: ["business", "productivity", "social"],
    icons: [
      {
        src: "/icons/pacto-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/pacto-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/pacto-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
