import { extractDescription, formatDate } from "@/lib/utils";
import { Startup, Author } from "@/sanity/types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type StartupProps = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ startup }: {startup: StartupProps}) => {
  const { _id, title, description, slug, image, views, author, category, _createdAt } = startup;
  return (
    <li className="startup-card">
      <div className="pb-4">
        <div className="flex gap-3 items-center">
          <Link href={`/user/${author?._id}`}>
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
            <Link href={`/user/${author?._id}`}>
              <p className="text-[14px] text-gray-600 font-medium hover:text-gray-800 transition ease-in">
                {author?.name}
              </p>
            </Link>
            <Link href={`/intNext/${_id}`}>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {title}
              </h3>
            </Link>
          </div>
        </div>
        <Link href={`/intNext/${_id}`}>
          <p className="mt-2 text-gray-500 dark:text-neutral-400">
            {extractDescription(description || "")}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-5">
          <p className="text-xs text-gray-500 dark:text-neutral-500">
            {formatDate(_createdAt)}
          </p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-4 text-primary" />
            <span className="text-xs font-medium">{views}</span>
          </div>
        </div>
      </div>
      <Link href={`/startup/${slug?.current}`} className="w-full">
        <Image
          width={320}
          height={180}
          className="h-auto rounded-xl w-full"
          src={image || "/default-image.png"}
          alt="Startup Image"
          loading="lazy"
        />
      </Link>
      <div className="mt-4">
        <Link href={`/query?=${category}`}>
          <span className="badge">
            {category}
          </span>
        </Link>
      </div>
    </li>
  );
};

export default StartupCard;
