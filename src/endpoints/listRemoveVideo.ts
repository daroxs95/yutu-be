import {
  OpenAPIRoute,
  OpenAPIRouteSchema, Path,
} from "@cloudflare/itty-router-openapi";
import {Video} from "../types";

export class ListRemoveVideo extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "Remove a video from a list by slug and video id",
    parameters: {
      listSlug: Path(String, {
        description: "List slug",
      }),
      videoId: Path(String, {
        description: "Video id",
      }),
    },
    responses: {
      "200": {
        description: "Returns the video that was deleted",
        schema: {
          success: Boolean,
          result: {
            video: Video,
          },
        },
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    data: Record<string, any>
  ) {
    const {listSlug, videoId} = data.params;

    const lists = JSON.parse(await env.KV.get("lists") || "[]");
    const listIndex = lists.findIndex((list: any) => list.slug === listSlug);
    if (listIndex === -1) {
      return {
        success: false,
        error: "List not found",
      };
    }
    const videoIndex = lists[listIndex].videos.findIndex((video: any) => video.id === videoId);
    if (videoIndex === -1) {
      return {
        success: false,
        error: "Video not found in list",
      };
    }
    const oldVideo = lists[listIndex].videos[videoIndex];
    lists[listIndex].videos = [...lists[listIndex].videos.slice(0, videoIndex), ...lists[listIndex].videos.slice(videoIndex + 1)];
    await env.KV.put("lists", JSON.stringify([...lists]));

    return {
      success: true,
      video: oldVideo,
    };
  }
}
