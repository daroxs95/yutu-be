import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { List } from "../types";

export class ListFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Lists"],
		summary: "Get a single list by slug",
		parameters: {
			taskSlug: Path(String, {
				description: "List slug",
			}),
		},
		responses: {
			"200": {
				description: "Returns a single task if found",
				schema: {
					success: Boolean,
					result: {
						task: List,
					},
				},
			},
			"404": {
				description: "Task not found",
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
		const { taskSlug } = data.params;

		// Implement your own object fetch here

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
			task: {
				name: "my task",
				slug: taskSlug,
				description: "this needs to be done",
				completed: false,
				due_date: new Date().toISOString().slice(0, 10),
			},
		};
	}
}
