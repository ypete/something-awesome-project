"use client";

import { useSearchParams } from 'next/navigation';

import Nav from "@/app/components/Nav";
import Footer from '@/app/components/Footer';
import { Suspense } from 'react';

export default function Error() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message") || "Something went wrong";

  return (
    <>
      <Nav/>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative flex flex-col font-bold items-center min-h-screen mt-36">
          <h2 className="bg-gradient-to-r from-red-100 to-red-300 rounded w-max text-4xl px-4 py-1 my-2 text-white">ERROR</h2>
          <h1 className="text-7xl text-red-500 mt-2 mb-4">{errorMessage}</h1>
          <h1 className="text-3xl">That&apos;s all we know.</h1>
        </div>
      </Suspense>
      <Footer/>
    </>
  );
}
