import { client } from "@/sanity/lib/client";
import { getStartupByIdQuery, getViewQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import markdownit from "markdown-it";
import { writeClient } from "@/sanity/lib/write-client";

const detail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(getStartupByIdQuery, { id });
  const {views: totalViewers} = await client.withConfig({ useCdn: false }).fetch(getViewQuery, {id});
  if (!post) return notFound();
  const mdContent = markdownit().render(post?.pitch || "");
  await writeClient.patch(id).set({ views: totalViewers + 1 }).commit();

  return (
    <>
      <section className="pt-10 pb-14 px-5 sm:pt-14 sm:pb-20 sm:px-6 max-w-6xl mx-auto lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="leading-[35.5px] mt-10 mb-2">
          <span className="text-gray-500 dark:text-neutral-500">
            {formatDate(post._createdAt)}
          </span>
          <span>
            {" "}
            by{" "}
            <span className="text-primary font-bold">{post.author.name}</span>
          </span>
          <h2 className="text-2xl font-bold leading-[36px]">{post.title}</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:gap-4 justify-between items-center mb-10">
          <div className="h-full flex-1 pr-4">
            <p className="text-[16px] pt-3 leading-[27px]">
              {post.description}
            </p>
            <Image
              width={320}
              height={300}
              className="rounded-xl mt-5 object-cover w-full max-h-[350px]"
              src={post.image || "/default-image.png"}
              alt="Startup Image"
              loading="lazy"
            />
            {mdContent ? (
              <article className="text-[16px] pt-5 leading-[27px] prose" dangerouslySetInnerHTML={{ __html: mdContent }}/>
            ): null}
          </div>
          <div className="fixed bottom-5 w-[200px] md:w-auto md:relative md:bottom-auto z-50">
            <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl md:rounded-none p-4 shadow-lg md:shadow-none flex justify-around md:flex-col md:items-end gap-5">
              <div className="flex items-center gap-2 text-black">
                <Heart className="size-6 transition-all duration-200 ease-in-out hover:text-red-500 hover:fill-red-500 cursor-pointer" />
                <span>15</span>
              </div>
              <div className="flex items-center gap-2 text-black">
                <Eye className="size-6" />
                <Suspense>
                  <span>{totalViewers}</span>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <hr className="divider" />

      </section>
    </>
  );
};

export default detail;
