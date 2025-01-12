import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function LoginStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-[#D6BC97]">Loading...</div>;
  }

  return (
    <>
      {session?.user ? (
        <div className="flex items-center gap-4 text-[#D6BC97]">
          <span>{session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="rounded bg-gray-800 px-2 py-1 text-white"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="text-[#D6BC97]">
          <Link href="/login">
            <div className="rounded bg-gray-800 px-2 py-1 text-white">
              Login
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
