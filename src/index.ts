import {OpenAPIRouter} from "@cloudflare/itty-router-openapi";
import {ListCreate} from "./endpoints/listCreate";
import {ListDelete} from "./endpoints/listDelete";
import {ListFetch} from "./endpoints/listFetch";
import {ListList} from "./endpoints/listList";
import {ListUpdate} from "./endpoints/listUpdate";
import {createCors} from 'itty-router';
import {ListAddVideo} from "./endpoints/listAddVideo";

interface Env {
  KV: KVNamespace;
}

export const router = OpenAPIRouter({
  docs_url: "/",
});

const {preflight, corsify} = createCors({
  methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
});

router.all('*', preflight);

router.get("/api/lists/", ListList);
router.get("/api/lists/:listSlug/", ListFetch);
router.post("/api/lists/", ListCreate);
router.put("/api/lists/:listSlug/", ListUpdate);
router.delete("/api/lists/:listSlug/", ListDelete);
router.post("/api/lists/:listSlug/video/", ListAddVideo);

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
  fetch: async (request, env, ctx) => {
    return router.handle(request, env, ctx).then(corsify)
  },
};