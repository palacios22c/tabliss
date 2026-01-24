import { API } from "../../types";
import { Gif } from "./types";

type Config = {
  tag: string;
  nsfw: boolean;
};

export async function getGifs(
  { tag, nsfw }: Config,
  loader: API["loader"],
): Promise<Gif[]> {
  loader.push();
  try {
    // Fetch multiple GIFs for rotation
    const count = 10;
    const tags = tag.split(",").map((t) => t.trim());
    const randomTag = tags[Math.floor(Math.random() * tags.length)];

    if (!GIPHY_API_KEY) {
      throw new Error("You must set the GIPHY_API_KEY environment variable.");
    }

    const request = new Request(
      "https://api.giphy.com/v1/gifs/search" +
        `?api_key=${GIPHY_API_KEY}` +
        "&rating=" +
        (nsfw ? "r" : "g") +
        `&limit=${count}` +
        (randomTag ? `&q=${encodeURIComponent(randomTag)}` : "&q=pattern"),
    );

    const res = await (await fetch(request)).json();
    if (!res.data || res.data.length === 0) {
      throw new Error("No GIFs found.");
    }

    const gifs = res.data.map(
      (gif: { images: { original: { webp: string } }; url: string }) => ({
        url: gif.images.original.webp,
        link: gif.url,
      }),
    );

    return gifs;
  } finally {
    loader.pop();
  }
}

// Backwards compatible single GIF fetch
export async function getGif(
  { tag, nsfw }: Config,
  loader: API["loader"],
): Promise<Gif> {
  loader.push();
  try {
    const tags = tag.split(",").map((t) => t.trim());
    const randomTag = tags[Math.floor(Math.random() * tags.length)];

    if (!GIPHY_API_KEY) {
      throw new Error("You must set the GIPHY_API_KEY environment variable.");
    }

    const request = new Request(
      "https://api.giphy.com/v1/gifs/random" +
        `?api_key=${GIPHY_API_KEY}` +
        "&rating=" +
        (nsfw ? "r" : "g") +
        (randomTag ? `&tag=${encodeURIComponent(randomTag)}` : ""),
    );

    const res = await (await fetch(request)).json();
    if (!res.data) {
      throw new Error("No GIF found.");
    }

    return {
      url: res.data.images.original.webp,
      link: res.data.url,
    };
  } finally {
    loader.pop();
  }
}
