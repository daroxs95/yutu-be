import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { List } from "../types";

export class ListDelete extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Lists"],
		summary: "Delete a List",
		parameters: {
			taskSlug: Path(String, {
				description: "List slug",
			}),
		},
		responses: {
			"200": {
				description: "Returns if the list was deleted successfully",
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
		// Retrieve the validated slug
		const { taskSlug } = data.params;

		// Implement your own object deletion here

		// Return the deleted task for confirmation
		return {
			result: {
				task: {
					name: "Build something awesome with Cloudflare Workers",
					slug: taskSlug,
					description: "Lorem Ipsum",
					completed: true,
					due_date: "2022-12-24",
				},
			},
			success: true,
		};
	}
}
