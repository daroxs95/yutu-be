import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Query,
} from "@cloudflare/itty-router-openapi";
import {List} from "../types";

export class ListList extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "List lists",
    parameters: {
      page: Query(Number, {
        description: "Page number",
        default: 0,
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of Lists",
        schema: {
          success: Boolean,
          result: {
            tasks: [List],
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
    // Retrieve the validated parameters
    const {page} = data.query;

    const lists = JSON.parse(await env.KV.get("lists"));

    return {
      success: true,
      lists: lists.slice(page * 10, page * 10 + 10),
    };
  }
}
