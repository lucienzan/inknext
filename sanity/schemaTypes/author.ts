import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { apiVersion } from "../env";
import { v4 as uuid } from "uuid";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
      readOnly: true,
      initialValue: () => uuid()
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name is required."),
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .error("Email is required.")
          .email()
          .error("Please enter a valid email address.")
          .custom(async (email, context) => {
            if (!email) {
              return true;
            }

            const { document } = context;
            const client = context.getClient({ apiVersion: apiVersion });

            // GROQ query to check for existing authors with the same email
            const query = `
          *[_type == "author" && email == $email && _id != $currentId] {
            _id
          }
        `;
            const params = {
              email,
              currentId: document?._id || "", // Exclude the current document if it's being edited
            };

            const results = await client.fetch(query, params);

            if (results.length > 0) {
              return "This email address is already in use. Please use a different one.";
            }

            return true;
          }),
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
