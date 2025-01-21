import { signIn } from "~/server/auth";
import Navbar from "../../_layout/Navbar";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-[#E8E1D6]">
        <div className="w-[400px] rounded-lg px-6 py-20">
          <h2 className="lc-header mb-4 text-center text-2xl font-semibold">
            Sign In
          </h2>
          <form
            className="space-y-4"
            action={async (formData: FormData) => {
              "use server";
              try {
                const email = formData.get("email");
                const password = formData.get("password");

                await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });
              } catch (error) {
                console.error("Sign in error:", error);
                redirect("/auth/login?error=AuthenticationError");
              }
              redirect("/dashboard");
            }}
          >
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="abc@example.com"
                  required
                  className="w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-[#D6BC97]">
                  @
                </span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full rounded-md bg-[#A68B5C] px-4 py-2 text-sm font-medium text-[#FFF8E6] hover:bg-[#d1a56a]"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-[#A68B5C]">
            <Link href="/auth/register">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
