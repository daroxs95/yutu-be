import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import {List} from "../types";

export class ListList extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "List lists",
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

    const lists = JSON.parse(await env.KV.get("lists"));

    return {
      success: true,
      lists,
    };
  }
}
