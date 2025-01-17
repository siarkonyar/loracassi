"use client";

import React, { useEffect } from "react";
import { api } from "~/trpc/react";
import AdminNavbar from "../_components/AdminNavbar";
import Link from "next/link";

export default function CategoriesPage() {
  const {
    data: categories,
    isLoading,
    refetch,
  } = api.category.getAllCategories.useQuery();

  const deleteCategoryMutation = api.category.deleteCategory.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategoryMutation.mutateAsync({ id });
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  useEffect(() => {
    void refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Categories</h1>
          <button className="rounded-md bg-[#A68B5C] px-4 py-2 text-white hover:bg-[#8B7355]">
            <Link href="/admin/categories/addCategory">Add New Category</Link>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className="mr-2 text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
