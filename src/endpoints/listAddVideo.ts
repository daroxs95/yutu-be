import {
  OpenAPIRoute,
  OpenAPIRouteSchema, Path,
} from "@cloudflare/itty-router-openapi";
import {Video, List} from "../types";

export class ListAddVideo extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "Add a video to a list by slug",
    parameters: {
      listSlug: Path(String, {
        description: "List slug",
      }),
    },
    requestBody: Video,
    responses: {
      "200": {
        description: "Returns the updated List",
        schema: {
          success: Boolean,
          result: {
            list: List,
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
    const {listSlug} = data.params;

    // Retrieve the validated request body
    const videoData = data.body;

    const lists = JSON.parse(await env.KV.get("lists") || "[]");
    const listIndex = lists.findIndex((list: any) => list.slug === listSlug);
    if (listIndex === -1) {
      return {
        success: false,
        error: "List not found",
      };
    }
    lists[listIndex].videos.push(videoData);
    await env.KV.put("lists", JSON.stringify([...lists]));

    return {
      success: true,
      list: lists[listIndex],
    };
  }
}
