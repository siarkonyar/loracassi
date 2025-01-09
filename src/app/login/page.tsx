"use client";

import React, { useState } from "react";
import Navbar from "../_layout/Navbar";
import { api } from "~/trpc/react";

export default function Page() {
  const loginMutation = api.user.login.useMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation states
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset validation
    setEmailError(false);
    setPasswordError(false);

    let isValid = true;

    // Validate Email
    if (email.trim() === "") {
      setEmailError(true);
      isValid = false;
    }

    // Validate Password
    if (password.trim() === "") {
      setPasswordError(true);
      isValid = false;
    }

    // Proceed if all fields are valid
    if (isValid) {
      loginMutation.mutate({
        email,
        password,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-[#E8E1D6]">
        <div className="w-[400px] rounded-lg px-6 py-20">
          <h2 className="lc-header mb-4 text-center text-2xl font-semibold">
            Sign Up
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
                    title="Email is required"
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
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-500 bg-[#F2C2C2] focus:ring-red-500"
                      : "border-[#D6BC97] bg-[#E8E1D6] focus:ring-[#e6d6bd]"
                  }`}
                />
                {passwordError && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-red-500"
                    title="Password is required"
                  >
                    ❗
                  </span>
                )}
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
        </div>
      </div>
    </>
  );
}
