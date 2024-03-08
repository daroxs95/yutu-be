import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import {List, ListType} from "../types";

export class ListFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "Get a single list by slug",
    parameters: {
      listSlug: Path(String, {
        description: "List slug",
      }),
    },
    responses: {
      "200": {
        description: "Returns a single list if found",
        schema: {
          success: Boolean,
          result: {
            list: List,
          },
        },
      },
      "404": {
        description: "List not found",
        schema: {
          success: Boolean,
          error: String,
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

    // Implement your own object fetch here
    // For example, you can use KV to fetch the object
    const lists = JSON.parse(await env.KV.get("lists") || "[]");
    const list = lists.find((list: ListType) => list.slug === listSlug)

    const exists = true;

    // @ts-ignore: check if the object exists
    if (exists === false) {
      return Response.json(
        {
          success: false,
          error: "Object not found",
        },
        {
          status: 404,
        }
      );
    }

    return {
      success: true,
      list,
    };
  }
}
