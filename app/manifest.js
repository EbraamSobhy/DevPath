export default function manifest() {
  return {
    name: "DevPath",
    short_name: "DevPath",
    description: "Roadmap Web App for CS Students and Beginners",
    start_url: "/",
    display: "standalone",
    background_color: "#000075",
    theme_color: "#000075",
    orientation: "portrait",
    icons: [
      {
        src: "/DevPathLogo.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/DevPath icon.png",
        sizes: "263x329",
        type: "image/png",
      },
    ],
  };
}
