import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import prefix from "postcss-prefix-selector";
import { readFile, writeFile } from "node:fs/promises";
await build({ entryPoints: ["components/dock-entry.tsx"], bundle: true, minify: true,
  outfile: "assets/floating-dock.js", format: "iife", target: "es2020", jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' } });
const input = await readFile("components/dock.css", "utf8");
const compiled = await postcss([tailwind()]).process(input, { from: "components/dock.css" });
const scoped = await postcss([prefix({ prefix: "#floating-dock-root", transform(prefix, selector, prefixed) {
  if (selector === ":root, :host" || selector === ":root" || selector === ":host") return "#floating-dock-root";
  return prefixed;
} })]).process(compiled.css, { from: undefined });
const flattened = postcss.parse(scoped.css);
flattened.walkAtRules("layer", rule => { if (rule.nodes) rule.replaceWith(rule.nodes); else rule.remove(); });
await writeFile("assets/floating-dock.css", flattened.toString());
console.log("Built local React dock and scoped Tailwind v4 styles.");
