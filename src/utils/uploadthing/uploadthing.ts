import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";
import { UTApi } from "uploadthing/server";
import type { UploadThingRouter } from "~/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<UploadThingRouter>();
export const UploadDropzone = generateUploadDropzone<UploadThingRouter>();
export const { useUploadThing } = generateReactHelpers<UploadThingRouter>();

export const utapi = new UTApi();