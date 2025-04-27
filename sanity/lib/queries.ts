import { defineQuery } from "next-sanity";

export const startupQuery = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || author->name match $search || category match $search] | order(createdAt desc)
  {_id,
  title,
  slug,
  description,
  image,
  pitch,
  author -> {_id, name, image, email, username},
  views,
  category,
  _createdAt}`)