import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { List } from "../types";

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
						task: List,
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
		const taskToCreate = data.body;

		// Implement your own object insertion here

		// return the new task
		return {
			success: true,
			task: {
				name: taskToCreate.name,
				slug: taskToCreate.slug,
				description: taskToCreate.description,
				completed: taskToCreate.completed,
				due_date: taskToCreate.due_date,
			},
		};
	}
}
