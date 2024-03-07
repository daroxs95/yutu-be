import {OpenAPIRouter} from "@cloudflare/itty-router-openapi";
import {ListCreate} from "./endpoints/listCreate";
import {ListDelete} from "./endpoints/listDelete";
import {ListFetch} from "./endpoints/listFetch";
import {ListList} from "./endpoints/listList";
import {ListUpdate} from "./endpoints/listUpdate";

interface Env {
  KV: KVNamespace;
}

export const router = OpenAPIRouter({
  docs_url: "/",
});

router.get("/api/lists/", ListList);
router.get("/api/lists/:listSlug/", ListFetch);
router.post("/api/lists/", ListCreate);
router.put("/api/lists/:listSlug/", ListUpdate);
router.delete("/api/lists/:listSlug/", ListDelete);

// 404 for everything else
router.all("*", () =>
  Response.json(
    {
      success: false,
      error: "Route not found",
    },
    {status: 404}
  )
);

export default {
  fetch: router.handle,
};
