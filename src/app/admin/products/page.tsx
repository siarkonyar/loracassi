"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import AdminNavbar from "../_components/AdminNavbar";
import Link from "next/link";

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    refetch,
  } = api.product.getAllProducts.useQuery();

  const { data: categories } = api.category.getAllCategories.useQuery();

  const deleteProductMutation = api.product.deleteProduct.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductMutation.mutateAsync({ id });
      } catch (error) {
        console.error("Error deleting product:", error);
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
          <h1 className="text-2xl font-bold">Products</h1>
          <button className="rounded-md bg-[#A68B5C] px-4 py-2 text-white hover:bg-[#8B7355]">
            <Link href="/admin/products/addProduct">Add New Product</Link>
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
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products?.map((product) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10">
                        <Image
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.headImage ?? "/placeholder.png"}
                          alt={product.name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ${product.price}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {product.categoryId
                        ? categories?.find((c) => c.id === product.categoryId)
                            ?.name
                        : ""}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {product.discount}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="mr-2 text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
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
