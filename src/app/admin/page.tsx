"use client";

import React from "react";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing/uploadthing";
import AdminNavbar from "./_components/AdminNavbar";

export default function Page() {
  return (
    <>
      <AdminNavbar />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
