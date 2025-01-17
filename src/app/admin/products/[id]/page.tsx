"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import AdminNavbar from "../../_components/AdminNavbar";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { useUploadThing, utapi } from "~/utils/uploadthing/uploadthing";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: product } = api.product.getProduct.useQuery({
    id: resolvedParams.id,
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const categoryId = formData.get("categoryId")
      ? parseInt(formData.get("categoryId") as string, 10)
      : undefined;

    try {
      let headImage = product?.headImage ?? "";

      if (selectedFile) {
        // Delete old image if it exists
        if (product?.headImage) {
          const fileKey = product.headImage.split("/").pop();
          if (fileKey) {
            await utapi.deleteFiles(fileKey);
          }
        }

        // Upload new image
        const uploadResult = await startUpload([selectedFile]);
        if (uploadResult?.[0]) {
          headImage = uploadResult[0].url;
        }
      }

      await updateProductMutation.mutateAsync({
        id: resolvedParams.id,
        name,
        price,
        stock,
        categoryId,
        headImage,
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
