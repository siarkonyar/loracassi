import { signIn } from "~/server/auth";
import Navbar from "../../_layout/Navbar";
import { redirect } from "next/navigation";

export default function Page() {
  /* const loginMutation = api.user.login.useMutation({
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  }); */

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
            /* onSubmit={async (event) => {
              "use server";
              event.preventDefault();

              const formData = new FormData(event.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;

              loginMutation.mutate({ email, password });
            }} */
            action={async (formData) => {
              "use server";
              try {
                await signIn("credentials", formData);
                redirect(`/dashboard`);
              } catch (error) {
                throw error;
              }
            }}
          >
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="abc@example.com"
                  aria-describedby="email-error"
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2`}
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
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  aria-describedby="password-error"
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full rounded-md bg-[#A68B5C] px-4 py-2 text-sm font-medium text-[#FFF8E6] hover:bg-[#d1a56a]"
                /* className={`w-full rounded-md px-4 py-2 text-sm font-medium text-[#FFF8E6] ${
                  isLoading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-[#A68B5C] hover:bg-[#d1a56a]"
                }`}
                disabled={isLoading} */
              >
                {/* {isLoading ? "Signing In..." : "Sign In"} */}
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
