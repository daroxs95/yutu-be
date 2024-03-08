import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import {List} from "../types";

export class ListCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Lists"],
    summary: "Create a new List",
    requestBody: List,
    responses: {
      "200": {
        description: "Returns the created List",
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
    // Retrieve the validated request body
    const listToCreate = data.body;

    const lists = JSON.parse(await env.KV.get("lists") || "[]");
    await env.KV.put("lists", JSON.stringify([...lists, listToCreate]));

    return {
      success: true,
      list: listToCreate
    };
  }
}
