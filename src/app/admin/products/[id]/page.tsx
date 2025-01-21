"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import AdminNavbar from "../../_components/AdminNavbar";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { useUploadThing } from "~/utils/uploadthing/uploadthing";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { data: product } = api.product.getProduct.useQuery({
    id: resolvedParams.id,
  });

  let headImage = product?.headImage ?? "";
  let images = product?.images ?? [];

  const { data: categories } = api.category.getAllCategories.useQuery();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      alert("Upload completed");
      console.log("Files: ", res);
    },
    onUploadError: (error: Error) => {
      alert(`ERROR! ${error.message}`);
    },
    onUploadBegin: (name) => {
      console.log("Uploading:", name);
    },
  });

  const updateProductMutation = api.product.updateProduct.useMutation({
    onSuccess: () => {
      router.push("/admin/products");
      router.refresh();
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleAdditionalImagesSelect = (files: FileList) => {
    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removeAdditionalImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]!);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const discount = parseInt(formData.get("discount") as string, 10) || 0;
    const categoryId = formData.get("categoryId")
      ? parseInt(formData.get("categoryId") as string, 10)
      : undefined;

    try {
      if (selectedFile) {
        // Delete old image if it exists
        if (product?.headImage) {
          const fileKey = product.headImage.split("/").pop();
          if (fileKey) {
            await fetch("/api/uploadthing/delete", {
              method: "POST",
              body: JSON.stringify({ fileKey }),
            });
          }
        }

        // Upload new image
        const uploadResult = await startUpload([selectedFile]);
        if (uploadResult?.[0]) {
          headImage = uploadResult[0].url;
        }
      }

      if (selectedFiles.length > 0) {
        // Delete old images if they exist
        if (product?.images?.length) {
          for (const imageUrl of product.images) {
            const fileKey = imageUrl.split("/").pop();
            if (fileKey) {
              await fetch("/api/uploadthing/delete", {
                method: "POST",
                body: JSON.stringify({ fileKey }),
              });
            }
          }
        }

        // Upload new images
        const uploadResult = await startUpload(selectedFiles);
        if (uploadResult) {
          images = uploadResult.map((file) => file.url);
        }
      }

      await updateProductMutation.mutateAsync({
        id: resolvedParams.id,
        name,
        price,
        stock,
        categoryId,
        headImage,
        images,
        discount,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating product:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Product Image
            </label>
            <div className="flex items-start gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileSelect(e.target.files[0])
                }
                className="rounded-md border border-gray-300 px-4 py-2"
              />
              {(previewUrl ?? product.headImage) && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute -right-2 -top-2 z-10 rounded-full bg-white text-gray-500 hover:text-red-500"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                  <Image
                    src={previewUrl ?? product.headImage ?? "/placeholder.png"}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              defaultValue={product.name}
              placeholder="Enter product name"
              required
              className="w-full rounded-md border border-black px-4 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="price">
              Price
            </label>
            <input
              name="price"
              type="number"
              id="price"
              defaultValue={product.price}
              step="0.01"
              min="0"
              placeholder="Enter price"
              required
              className="w-full rounded-md border border-black px-4 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="stock">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              id="stock"
              defaultValue={product.stock}
              placeholder="Enter stock quantity"
              required
              className="w-full rounded-md border border-black px-4 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="categoryId"
            >
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              defaultValue={product.categoryId ?? ""}
              required
              className="w-full rounded-md border border-black px-4 py-2 text-sm focus:outline-none focus:ring-2"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Discount */}
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="discount"
            >
              Discount (%)
            </label>
            <input
              name="discount"
              type="number"
              id="discount"
              defaultValue={product.discount ?? 0}
              min="0"
              max="100"
              placeholder="Enter discount percentage"
              className="w-full rounded-md border border-black px-4 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Additional Images Upload */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Additional Images
            </label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  e.target.files && handleAdditionalImagesSelect(e.target.files)
                }
                className="rounded-md border border-gray-300 px-4 py-2"
              />
              <div className="grid grid-cols-3 gap-4">
                {/* Show existing images */}
                {images.map((imageUrl, index) => (
                  <div key={imageUrl} className="relative">
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute -right-2 -top-2 z-10 rounded-full bg-white text-gray-500 hover:text-red-500"
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                    <Image
                      src={imageUrl}
                      alt={`Product image ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                ))}
                {/* Show preview of new images */}
                {previewUrls.map((url, index) => (
                  <div key={url} className="relative">
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute -right-2 -top-2 z-10 rounded-full bg-white text-gray-500 hover:text-red-500"
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                    <Image
                      src={url}
                      alt={`New image ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full rounded-md bg-[#A68B5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#8B7355]"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
