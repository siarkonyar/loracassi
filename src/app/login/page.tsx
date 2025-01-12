"use client";

import React, { useState } from "react";
import Navbar from "../_layout/Navbar";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const loginMutation = api.user.login.useMutation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation and state management
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setServerError("");
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    }

    if (password.trim().length < 6) {
      setPasswordError(true);
      isValid = false;
    }

    if (isValid) {
      try {
        await loginMutation.mutateAsync({ email, password });
        setIsLoading(false);
        void router.push("/dashboard");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setServerError(error.message || "An error occurred during login.");
        } else {
          setServerError("An unexpected error occurred.");
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-[#E8E1D6]">
        <div className="w-[400px] rounded-lg px-6 py-20">
          <h2 className="lc-header mb-4 text-center text-2xl font-semibold">
            Sign In
          </h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  placeholder="abc@example.com"
                  aria-invalid={emailError}
                  aria-describedby="email-error"
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2 ${
                    emailError
                      ? "border-red-500 bg-[#F2C2C2] focus:ring-red-500"
                      : "border-[#D6BC97] bg-[#e8e1d6] focus:ring-[#e6d6bd]"
                  }`}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-[#D6BC97]">
                  @
                </span>
                {emailError && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-red-500"
                    title="Invalid email address"
                  >
                    ❗
                  </span>
                )}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="••••••••"
                  aria-invalid={passwordError}
                  aria-describedby="password-error"
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-500 bg-[#F2C2C2] focus:ring-red-500"
                      : "border-[#D6BC97] bg-[#E8E1D6] focus:ring-[#e6d6bd]"
                  }`}
                />
                {passwordError && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-red-500"
                    title="Password must be at least 6 characters"
                  >
                    ❗
                  </span>
                )}
              </div>
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="mb-4 text-sm text-red-500">{serverError}</div>
            )}

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className={`w-full rounded-md px-4 py-2 text-sm font-medium text-[#FFF8E6] ${
                  isLoading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-[#A68B5C] hover:bg-[#d1a56a]"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
