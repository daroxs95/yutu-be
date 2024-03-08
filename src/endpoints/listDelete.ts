import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import {List, ListType} from "../types";

export class ListDelete extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "Delete a List",
    parameters: {
      listSlug: Path(String, {
        description: "List slug",
      }),
    },
    responses: {
      "200": {
        description: "Returns if the list was deleted successfully",
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
    // Retrieve the validated slug
    const {listSlug} = data.params;

    const lists = JSON.parse(await env.KV.get("lists") || "[]");
    const listIndex = lists.findIndex((list: ListType) => list.slug === listSlug);
    if (listIndex === -1) {
      return {
        success: false,
        error: "List not found",
      };
    }
    await env.KV.put("lists", JSON.stringify([...lists.slice(0, listIndex), ...lists.slice(listIndex + 1)]));

    // Return the deleted task for confirmation
    return {
      result: {
        list: {
          name: "Build something awesome with Cloudflare Workers",
          slug: listSlug,
          description: "Lorem Ipsum",
          completed: true,
          due_date: "2022-12-24",
        },
      },
      success: true,
    };
  }
}
