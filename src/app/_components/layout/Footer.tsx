import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="footer-line"></div>
      <footer className="w-100 bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {/* Logo Column */}
            <div className="flex justify-center md:justify-start">
              <Image
                src="/lora-cassi-logo.svg"
                alt="Lora Cassi Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Navigation Links Column */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
