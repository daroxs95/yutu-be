import {
  OpenAPIRoute,
  OpenAPIRouteSchema, Path,
} from "@cloudflare/itty-router-openapi";
import {ListUpdate as ListUpdateRequest, List} from "../types";

export class ListUpdate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "Update a list by slug",
    parameters: {
      listSlug: Path(String, {
        description: "List slug",
      }),
    },
    requestBody: ListUpdateRequest,
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
    const listData = data.body;

    const lists = JSON.parse(await env.KV.get("lists"));
    const listIndex = lists.findIndex((list: any) => list.slug === listSlug);
    if (listIndex === -1) {
      return {
        success: false,
        error: "List not found",
      };
    }
    lists[listIndex] = {slug: listData.slug, ...listData};
    await env.KV.put("lists", JSON.stringify([...lists]));

    return {
      success: true,
      list: lists[listIndex],
    };
  }
}
