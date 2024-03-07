import {Str, Arr} from "@cloudflare/itty-router-openapi";

export const Video = {
  name: new Str({example: "lorem"}),
  url: String,
};

export const List = {
  name: new Str({example: "lorem"}),
  slug: String,
  videos: new Arr(Video),
  description: new Str({example: "lorem ipsum"}),
};

export const ListUpdate = {
  name: new Str({example: "lorem"}),
  videos: new Arr(Video),
};

export type ListType = typeof List;