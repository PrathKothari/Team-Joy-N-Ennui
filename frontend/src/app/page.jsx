import React from "react";
import Link from "next/link";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Navbar from "./MainComponents/Navbar";

function page() {
  return (
    <div className="h-screen w-full relative overflow-hidden bg-white text-black flex flex-col items-center justify-center">
      <Navbar />
      <div className="mt-[80px] ml-[40px] text-center">
        <TextGenerateEffect />
      </div>

      <div className="mt-[200px] -ml-[40px] flex gap-[20px] mb-24 ">
        <Link href="/form">
          <DirectionAwareHover imageUrl="/one.jpeg" children={"feature-1"} />
        </Link>
        <Link href="/model">
          <DirectionAwareHover imageUrl="/two.jpeg" children={"feature-2"} />
        </Link>
        <Link href="/model">
          <DirectionAwareHover imageUrl="/three.jpeg" children={"feature-3"} />
        </Link>
      </div>
    </div>
  );
}

export default page;
