"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-100 p-4 text-white items-center w-[600px] shadow-sm flex justify-between">
      <div className="flex gap-x-2">
        <Button
          className="text-red-500"
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          className="text-red-500"
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <Button
          className="text-red-500"
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          className="text-red-500"
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
