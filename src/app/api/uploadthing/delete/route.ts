import { utapi } from "~/server/uploadthing/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

const deleteFileSchema = z.object({
  fileKey: z.string(),
});

type DeleteResponse = {
  success: boolean;
  error?: string;
};

export async function POST(request: Request): Promise<NextResponse<DeleteResponse>> {
  try {
    const body = deleteFileSchema.parse(await request.json());
    await utapi.deleteFiles(body.fileKey);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete file", success: false }, { status: 500 });
  }
}
