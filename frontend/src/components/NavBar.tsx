"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();
  return (
    <div
      className={`w-full z-50 left-0 h-20 bg-gray-100 top-0 fixed flex justify-between items-center transition-all duration-300 p-4
        `}
    >
      <div className="flex items-center p-8">
        <ApplicationLogo />
      </div>
      <PrimaryButton
        onClicked={() => router.push("/client")}
        title={"Importer un fichier"}
      />
    </div>
  );
}

export default NavBar;
