"use client";

import React, { useState } from "react";
import Navbar from "../_components/layout/Navbar";
import countries from "../_source/countryCodes";
import { api } from "~/trpc/react";
import { UserPartialSchema } from "prisma/generated/zod";
import { z } from "zod";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");

  // Validation states
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const registerMutation = api.user.register.useMutation();

  const handleLogin = (data: {
    email: string;
    password: string;
    firstName: string;
    phoneNumber: string | null;
  }) => {
    // Reset validation
    setEmailError(false);
    setFirstNameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setPhoneNumberError(false);

    let isValid = true;

    // Validate First Name
    if (firstName.trim() === "") {
      setFirstNameError(true);
      isValid = false;
    }

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

    // Validate Confirm Password
    if (confirmPassword.trim() === "" || confirmPassword !== password) {
      setConfirmPasswordError(true);
      isValid = false;
    }

    // Validate Phone Number (if entered)
    if (phoneNumber && !/^[1-9]\d*$/.test(phoneNumber)) {
      setPhoneNumberError(true);
      isValid = false;
    }

    // Proceed if all fields are valid
    if (isValid) {
      registerMutation.mutate(data);
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
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="firstName"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFirstNameError(false);
                  }}
                  placeholder="First Name"
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2 ${
                    firstNameError
                      ? "border-red-500 bg-[#F2C2C2] focus:ring-red-500"
                      : "border-[#D6BC97] bg-[#e8e1d6] focus:ring-[#e6d6bd]"
                  }`}
                />
                {firstNameError && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-red-500"
                    title="First name is required"
                  >
                    ❗
                  </span>
                )}
              </div>
            </div>

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

            {/* Confirm Password */}
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(false);
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2 ${
                    confirmPasswordError
                      ? "border-red-500 bg-[#F2C2C2] focus:ring-red-500"
                      : "border-[#D6BC97] bg-[#E8E1D6] focus:ring-[#e6d6bd]"
                  }`}
                />
                {confirmPasswordError && (
                  <div className="mt-2 text-sm text-red-500">
                    {confirmPassword === ""
                      ? "Confirm password is required"
                      : "Passwords do not match"}
                  </div>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="phoneNumber"
              >
                Phone Number (Optional)
              </label>
              <div className="flex items-center">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="mr-2 w-1/4 rounded-md border border-[#D6BC97] bg-[#e8e1d6] px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6d6bd]"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.value}>
                      {country.flag} {country.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(countryCode + e.target.value);
                    setPhoneNumberError(false);
                  }}
                  placeholder="123456789"
                  className={`w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                    phoneNumberError
                      ? "border-red-500 bg-[#F2C2C2] focus:ring-red-500"
                      : "border-[#D6BC97] bg-[#E8E1D6] focus:ring-[#e6d6bd]"
                  }`}
                />
              </div>
              {phoneNumberError && (
                <span className="text-sm text-red-500">
                  Invalid phone number
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full rounded-md bg-[#A68B5C] px-4 py-2 text-sm font-medium text-[#FFF8E6] hover:bg-[#d1a56a]"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
