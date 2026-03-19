import { notFound } from "next/navigation";

import { getLLMText, programsSource } from "@/lib/source";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: RouteContext<"/llms.mdx/programs/[[...slug]]">
) => {
  const { slug } = await params;
  const page = programsSource.getPage(slug);
  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
};

export const generateStaticParams = () => programsSource.generateParams();
