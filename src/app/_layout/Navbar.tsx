"use client";

import Image from "next/image";
import React, { useState } from "react";
import LoginStatus from "../_components/user/LoginStatus";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [language, setLanguage] = useState("EN");
  const [currency, setCurrency] = useState("USD");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setIsLanguageDropdownOpen(false);
    console.log(`Selected Language: ${selectedLanguage}`);
  };

  const handleCurrencyChange = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setIsCurrencyDropdownOpen(false);
    console.log(`Selected Currency: ${selectedCurrency}`);
  };

  return (
    <>
      <nav className="navbar-default">
        <div className="flex space-x-4">
          {/* Language and Currency Selectors */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
              className="inline-flex w-full justify-center rounded-md"
              id="language-menu-button"
              aria-expanded={isLanguageDropdownOpen}
              aria-haspopup="true"
            >
              {language}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <div
                className="absolute mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="language-menu-button"
              >
                <div className="py-1" role="none">
                  {["EN", "FR", "ES", "DE"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
              className="inline-flex w-full justify-center rounded-md"
              id="currency-menu-button"
              aria-expanded={isCurrencyDropdownOpen}
              aria-haspopup="true"
            >
              {currency}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isCurrencyDropdownOpen && (
              <div
                className="absolute mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="currency-menu-button"
              >
                <div className="py-1" role="none">
                  {["USD", "EUR", "GBP", "JPY"].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => handleCurrencyChange(curr)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Centered content */}
        <div className="navbar-center">
          <Link href={"/dashboard"}>
            <Image
              src="/lora-cassi-logo.svg"
              alt="Centered Logo"
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
              className="object-contain" // Ensures image scales correctly
            />
          </Link>
        </div>
        <SessionProvider>
          <LoginStatus />
        </SessionProvider>
      </nav>

      <div className="navbar-line"></div>
    </>
  );
}
