import type { Metadata } from 'next';

import { getPage } from 'lib/wix';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { subPage: string };
}): Promise<Metadata> {
  const page = await getPage(params.subPage);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string; subPage: string } }) {
  const page = await getPage(params.subPage).then((page) =>
    page?.parentPage?.includes(params.page) ? page : undefined
  );
  console.log(page);
  if (!page) return notFound();
  return <></>;
}
