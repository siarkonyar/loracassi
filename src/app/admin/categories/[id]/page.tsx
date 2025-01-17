"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import AdminNavbar from "../../_components/AdminNavbar";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();

  const { data: category } = api.category.getCategory.useQuery({
    id: parseInt(resolvedParams.id),
  });

  const updateCategoryMutation = api.category.updateCategory.useMutation({
    onSuccess: () => {
      router.push("/admin/categories");
      router.refresh();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      await updateCategoryMutation.mutateAsync({
        id: parseInt(resolvedParams.id),
        name,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating category:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Edit Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              Category Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              defaultValue={category.name}
              placeholder="Enter category name"
              required
              className="w-full rounded-md border border-black px-4 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full rounded-md bg-[#A68B5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#8B7355]"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
