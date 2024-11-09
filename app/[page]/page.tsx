import type { Metadata } from 'next';

import { sectionFetcher } from 'components/page-sections';
import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getPage } from 'lib/wix';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage(params.page);

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

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);
  if (!page || params.page === 'home') return notFound();

  interface CustomStyle extends React.CSSProperties {
    '--image-url': string;
  }

  return (
    <>
      {page.headerImage ? (
        <div
          style={{ '--image-url': `url(${page?.headerImage?.url || ''})` } as CustomStyle}
          className="relative h-96 w-full bg-[image:var(--image-url)] bg-cover bg-no-repeat"
        >
          <BrandAccentedHeadings
            headingCopy={page.title}
            headingLevel={1}
            className="absolute bottom-0 z-10 mb-8 w-full"
          />
          <div className="absolute left-0 top-0 z-[9] h-full w-full bg-gradient-to-t from-red-950" />
        </div>
      ) : (
        <BrandAccentedHeadings headingCopy={page.title} headingLevel={1} className="mb-8" />
      )}
      <Prose className="mb-8" html={page.body as string} />
      {page?.pageSections && sectionFetcher(page.pageSections.map((section) => section.title))}
    </>
  );
}
