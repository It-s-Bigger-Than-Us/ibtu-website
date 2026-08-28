import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "ibtu",
  title: "IBTU Studio",
  projectId: "0m4ngfcw",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
