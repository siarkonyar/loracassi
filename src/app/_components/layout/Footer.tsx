import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="footer-line"></div>
      <footer className="w-100 bg-black">
        <div className="flex justify-center py-12">
          <div>
            <Image
              src="/lora-cassi-logo.svg"
              alt="Centered Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div>
            
          </div>
        </div>
      </footer>
    </>
  );
}
