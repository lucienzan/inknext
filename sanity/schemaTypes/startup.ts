import { defineField, defineType } from "sanity";
import { apiVersion } from '../../sanity/env';

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "id",
      type: "string"
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Title is required.").min(5).max(100).custom(async (title, context) => {
          if (!title) {
            return true;
          };

          const { document } = context;
          const client = context.getClient({ apiVersion: apiVersion });

          const query = `
          *[_type == "startup" && title == $title && _id != $currentId] {
            _id
          }
        `;
        const params = {
          title,
          currentId: document?._id || '', // Exclude the current document if it's being edited
        };

        const results = await client.fetch(query, params);

        if (results.length > 0) {
          return 'This title is already in use. Please choose a unique title.';
        }

        return true;

      })
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-").slice(0, 96)
      }
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author"}]
    }),
    defineField({
      name: "views",
      type: "number"
    }),
    defineField({
      name: "description",
      type: "text"
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) => Rule.required().error("Category is required.").min(1).max(50)
    }),
    defineField({
      name: "image",
      type: "url"
    }),
    defineField({
      name: "pitch",
      type: "markdown"
    })
  ]
})