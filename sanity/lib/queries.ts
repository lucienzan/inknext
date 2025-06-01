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
  _createdAt}`);

export const getStartupByIdQuery = defineQuery(
`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
    description,
    category,
    image,
    pitch
}`
);

export const getViewQuery = defineQuery(
  `*[_type == "startup" && _id == $id][0]{
    _id,
    views
  }`
)