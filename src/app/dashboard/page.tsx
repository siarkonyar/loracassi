"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // Create this file
import Navbar from "../_layout/Navbar";
import ProductCard from "../_components/product/ProductCard";
import GoldFrameButton from "../_components/buttons/GoldFrameButton";
import Footer from "../_layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="relative w-full">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          navigation={true}
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="header-swiper-carousel"
        >
          <SwiperSlide>
            <Image
              src="/woman-hands-with-mobile-phone-stylish-girl-beige-coat-chatting-modern-city.jpg"
              alt="image 1"
              className="object-contain"
              width={1920}
              height={1080}
              priority
              quality={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/woman-hands-with-mobile-phone-stylish-girl-beige-coat-chatting-modern-city.jpg"
              alt="image 1"
              className="object-contain"
              width={1920}
              height={1080}
              priority
              quality={100}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="w-100 bg-black">
        <h2 className="custom-gold-color lc-header py-12 text-center text-3xl font-bold">
          new featured
        </h2>
        <div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            className="item-card-swiper-carousel"
          >
            <SwiperSlide>
              <div className="product-card-outter">
                <ProductCard productId="cm5ifsyqu0000wv74abfbk4o8" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product-card-outter">
                <ProductCard productId="cm5ifsyqu0000wv74abfbk4o8" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product-card-outter">
                <ProductCard productId="cm5ifsyqu0000wv74abfbk4o8" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product-card-outter">
                <ProductCard productId="cm5ifsyqu0000wv74abfbk4o8" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product-card-outter">
                <ProductCard productId="cm5ifsyqu0000wv74abfbk4o8" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product-card-outter">
                <ProductCard productId="cm5ifsyqu0000wv74abfbk4o8" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product-card-outter">
                <ProductCard productId="cm5ifsyqu0000wv74abfbk4o8" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex justify-center py-12">
          <GoldFrameButton />
        </div>
      </div>
      <div className="w-100 bg-[#E8E1D6] pb-12">
        <h2 className="color-black lc-header py-12 text-center text-3xl font-bold">
          why you should choose us?
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4">
          <div className="w-100 flex justify-center">
            <div className="flex max-w-[250px] flex-col items-center gap-4">
              <div className="h-[250px]">
                <Image
                  src="/free-shipping1.svg"
                  alt="free shipping"
                  width={1920}
                  height={1080}
                  priority
                  quality={100}
                />
              </div>
              <h3 className="text-xl font-bold">Free Shipping</h3>
              <p className="text-center">
                All purchases over $99 are eligible for free shipping via USPS
                First Class Mail.
              </p>
            </div>
          </div>
          <div className="w-100 flex justify-center">
            <div className="flex max-w-[250px] flex-col items-center gap-4">
              <div className="h-[250px]">
                <Image
                  src="/easy-payment1.svg"
                  alt="easy payments"
                  width={1920}
                  height={1080}
                  priority
                  quality={100}
                />
              </div>

              <h3 className="text-xl font-bold">Easy Payments</h3>
              <p className="text-center">
                All payments are processed instantly over a secure payment
                protocol.
              </p>
            </div>
          </div>
          <div className="w-100 flex justify-center">
            <div className="flex max-w-[250px] flex-col items-center gap-4">
              <div className="h-[250px]">
                <Image
                  src="/money-back-guarantee1.svg"
                  alt="money back guarantee"
                  width={1920}
                  height={1080}
                  priority
                  quality={100}
                />
              </div>

              <h3 className="text-xl font-bold">Money-Back Guarantee</h3>
              <p className="text-center">
                If an item arrived damaged or you&apos;ve changed your mind, you
                can send it back for a full refund.
              </p>
            </div>
          </div>
          <div className="w-100 flex justify-center">
            <div className="flex max-w-[250px] flex-col items-center gap-4">
              <div className="h-[250px]">
                <Image
                  src="/finest-quality1.svg"
                  alt="finest quality"
                  width={1920}
                  height={1080}
                  priority
                  quality={100}
                />
              </div>

              <h3 className="text-xl font-bold">Finest Quality</h3>
              <p className="text-center">
                Designed to last, each of our products has been crafted with the
                finest materials.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
