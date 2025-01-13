import { TRPCError } from "@trpc/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "~/server/auth";

const f = createUploadthing(); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const session = await auth();

      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type UploadThingRouter = typeof uploadThingRouter;