import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export const getMDXComponents = (
  components?: MDXComponents
): MDXComponents => ({
  ...defaultMdxComponents,
  ...components,
});

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
