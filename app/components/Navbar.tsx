import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-transparent relative z-20 py-4 px-5 md:px-10">
      <nav className="flex justify-between items-center">
        <h1>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Next Logo"
              width={50}
              height={70}
              className="rotate-90"
            />
          </Link>
        </h1>
        <div className="flex justify-center items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <Link
                href={`/user/${session?.user?.id}`}
                className="hidden md:block"
              >
                <span>{session?.user?.name}</span>
              </Link>
              <form
                className="hidden md:block"
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="cursor-pointer">
                  Logout
                </button>
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="outline">
                    <Menu className="size-4" />
                  </Button>
                </DropdownMenuTrigger>{" "}
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/user/${session?.user?.id}`}>Profile</Link>
                  </DropdownMenuItem>
                  <form
                    className="custom-menu-item"
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button
                      type="submit"
                      className="text-left w-full cursor-pointer"
                    >
                      Logout
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button type="submit" className="cursor-pointer">
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
