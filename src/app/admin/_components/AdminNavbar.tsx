import Link from "next/link";
import React from "react";

export default function AdminNavbar() {
  return (
    <>
      <div className="flex items-center justify-between bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-white">Admin</h1>
        <div className="flex items-center gap-2 text-white">
          <Link href="/dashboard">Homepage</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/users">Users</Link>
        </div>
      </div>
    </>
  );
}
