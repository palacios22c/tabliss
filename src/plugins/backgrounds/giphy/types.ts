import { RotatingCache } from "../../../hooks";
import { API } from "../../types";

export type Gif = {
  url: string;
  link: string;
};

export type Data = {
  nsfw: boolean;
  tag: string;
  paused?: boolean;
  timeout: number;
  showTitle: boolean;
};

export type Cache = RotatingCache<Gif>;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  nsfw: false,
  tag: "pattern",
  paused: false,
  timeout: 900,
  showTitle: true,
};
