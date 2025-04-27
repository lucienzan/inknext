import { AuroraText } from "@/components/magicui/aurora-text";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupProps } from "@/components/StartupCard";
import { startupQuery } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({query: startupQuery, params});
  return (
    <>
      <div className="isolate px-6 pt-14 lg:px-8">
        {/*Background polygon*/}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="polygon-one"
          />
        </div>
        {/*Hero Description*/}
        <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-5">
          <div className="text-center">
            <h2 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              <AuroraText speed={1}>Think. Build. Repeat.</AuroraText>A Deep
              Dive into the Startup Life Cycle
            </h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Quick hits, deep dives, and straight talk from the startup runway.
              This is where ideas take off—and we document the turbulence and
              triumphs along the way.
            </p>
            <div className="mt-10 w-2xs md:w-md m-auto">
              <SearchForm query={query} />
            </div>
          </div>
        </div>
        {/*Startup search name*/}
        <section className="pt-14 py-20 max-w-6xl mx-auto">
          <p className="text-xl font-semibold pb-[28px]">
            {query ? `Search results for "${query}"` : "All Startups"}
          </p>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {posts?.length > 0 ? (
              posts.map((post: StartupProps) => (
                <StartupCard key={post._id} startup={post} />
              ))
            ) : (
              <p className="text-center col-span-12">No startup available</p>
            )}
          </ul>
        </section>
      </div>
      <SanityLive/>
    </>
  );
}
