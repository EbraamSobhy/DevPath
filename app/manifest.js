export default function manifest() {
  return {
    name: "DevPath",
    short_name: "DevPath",
    id: "/",
    description: "Roadmap Web App for CS Students and Beginners",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000075",
    theme_color: "#000075",
    orientation: "portrait",
    icons: [
      {
        src: "/DevPath icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
