"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0f1e] px-8 py-10 flex items-center justify-between">

      {/* Left Box — Nav Links */}
      <div className="bg-[#13192B] border border-[#334155] rounded-lg px-6 py-3 flex items-center gap-10 w-2xl">
        <Link href="/home" className={linkStyle}>HOME</Link>
        <Link href="/about" className={linkStyle}>ABOUT</Link>
        <Link href="/team" className={linkStyle}>TEAM</Link>
        <Link href="/events" className={linkStyle}>EVENTS</Link>
      </div>

      {/* Center — MLSA Badge */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/mlsa-badge.png"
          alt="MLSA Badge"
          className="mt-4"
          width={120}
          height={120}
        />
      </div>

      {/* Right Box — Newsletter */}
      <div className="bg-[#13192B] border border-[#334155] rounded-lg px-6 py-3 w-2xl mr-0">
        <Link href="/newsletter" className={linkStyle}>NEWSLETTER</Link>
      </div>

    </nav>
  );
}

const linkStyle = "text-white font-bold text-sm tracking-wider hover:text-blue-400 hover:underline transition-all duration-300";