"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";
import AdminNavbar from "../../_components/AdminNavbar";

export default function AddCategoryPage() {
  const router = useRouter();
  const createCategoryMutation = api.category.createCategory.useMutation({
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
      await createCategoryMutation.mutateAsync({
        name,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating category:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Add New Category</h1>
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
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
