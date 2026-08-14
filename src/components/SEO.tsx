import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageMeta: Record<string, { title: string; description: string; image: string }> = {
  "/": {
    title: "Sansar | Explore Nepal Heritage in 3D",
    description:
      "An immersive Nepal travel guide with heritage stories, cinematic visuals, and Kathmandu Valley destination experiences.",
    image: "/img/kathmandu.jpeg",
  },
  "/destination": {
    title: "3D Nepal Heritage Destinations | Sansar",
    description:
      "Enter interactive 3D models of Kathmandu, Patan, and Bhaktapur Durbar Squares with guided hotspots.",
    image: "/img/bhaktapur.jpg",
  },
  "/discover": {
    title: "Discover Kathmandu Valley Heritage | Sansar",
    description:
      "Discover UNESCO-listed Kathmandu Valley courtyards, royal squares, maps, videos, and field notes.",
    image: "/img/patan.jpg",
  },
  "/budget": {
    title: "Nepal Trip Budget Planner | Sansar",
    description:
      "Plan a Nepal journey with modular itinerary segments, daily estimates, category breakdowns, and curated travel recommendations.",
    image: "/img/sagarmatha.jpg",
  },
};

const setMeta = (selector: string, attribute: "content" | "href", value: string) => {
  const element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  element?.setAttribute(attribute, value);
};

const setCanonical = (url: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
};

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = pageMeta[pathname] ?? pageMeta["/"];
    const canonicalUrl = `${window.location.origin}${pathname}`;
    const imageUrl = new URL(meta.image, window.location.origin).toString();

    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:image"]', "content", imageUrl);
    setCanonical(canonicalUrl);
  }, [pathname]);

  return null;
}
