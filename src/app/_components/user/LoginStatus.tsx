import Link from "next/link";
import React from "react";
import { auth } from "~/server/auth";

export default async function LoginStatus() {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div className="color-[#D6BC97]">{session.user.name}</div>
      ) : (
        <div className="color-[#D6BC97]">
          <Link href={"/login"}>
            <a>Login</a>
          </Link>
        </div>
      )}
    </>
  );
}
