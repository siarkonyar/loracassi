import { createUploadthing } from "uploadthing/next";

const f = createUploadthing(); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // const session = await auth();

      // if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      // return { userId: session.user.id };
      return { userId: "123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // Ensure the response is a valid JSON object
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
};

export type UploadThingRouter = typeof uploadThingRouter;