import "server-only";

import { createClient } from "next-sanity";
import { dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  token
});

if (!writeClient.config().token) {
  throw new Error('Write token not found. Please set the SANITY_WRITE_TOKEN environment variable.');
}