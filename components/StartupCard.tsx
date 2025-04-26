import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StartupCard = () => {
  return (
    <li className="startup-card">
      <div className="pb-4">
        <div className="flex gap-3 items-center">
          <Link href={`/user/${1}`}>
            <Image
              width={48}
              height={48}
              loading="lazy"
              src="/user.png"
              alt="user image"
              className="rounded-md"
            />
          </Link>
          <div className="flex flex-col">
            <Link href={`/user/${1}`}>
              <p className="text-[14px] text-gray-600 font-medium hover:text-gray-800 transition ease-in">
                Thomas
              </p>
            </Link>
            <Link href={`/startup/${12}`}>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Card title
              </h3>
            </Link>
          </div>
        </div>
        <Link href={`/startup/${12}`}>
          <p className="mt-2 text-gray-500 dark:text-neutral-400">
            Some quick example text to build on the card title and make up the
            bulk of the card content.
          </p>
        </Link>
        <div className="flex items-center justify-between mt-5">
          <p className="text-xs text-gray-500 dark:text-neutral-500">
            Last updated 5 mins ago
          </p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-4 text-primary" />
            <span className="text-xs font-medium">12</span>
          </div>
        </div>
      </div>
      <Link href={`/startup/${12}`} className="w-full">
        <Image
          width={320}
          height={180}
          className="h-auto rounded-xl w-full"
          src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
          alt="Startup Image"
          loading="lazy"
        />
      </Link>
      <div className="mt-4">
        <Link href={`/query?=${3}`}>
          <span className="badge">
            Tech
          </span>
        </Link>
      </div>
    </li>
  );
};

export default StartupCard;
