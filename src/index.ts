import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { ListCreate } from "./endpoints/listCreate";
import { ListDelete } from "./endpoints/listDelete";
import { ListFetch } from "./endpoints/listFetch";
import { ListList } from "./endpoints/listList";

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.get("/api/lists/", ListList);
router.post("/api/lists/", ListCreate);
router.get("/api/lists/:taskSlug/", ListFetch);
router.delete("/api/lists/:taskSlug/", ListDelete);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
