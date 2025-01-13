import { createRouteHandler } from "uploadthing/next";

import { uploadThingRouter } from "~/app/api/uploadthing/core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: uploadThingRouter,
});