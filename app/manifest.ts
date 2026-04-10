import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "It's Bigger Than Us",
    short_name: "IBTU",
    description:
      "Community is the infrastructure. Trusted, place-based programs in Los Angeles.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#FFC700",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
  };
}
