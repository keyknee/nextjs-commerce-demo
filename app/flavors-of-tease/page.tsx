import type { Metadata } from 'next';

import { sectionFetcher } from 'components/page-sections';
import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getPage } from 'lib/wix';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage('flavors-of-tease');

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

export default async function FlavorsOfTeasePage({ params }: { params: { page: string } }) {
  const page = await getPage('flavors-of-tease');
  console.log(params);
  if (!page) return notFound();

  interface CustomStyle extends React.CSSProperties {
    '--image-url': string;
  }

  return (
    <>
      {page.headerImage ? (
        <div
          style={{ '--image-url': `url(${page?.headerImage?.url || ''})` } as CustomStyle}
          className="relative h-96 w-full bg-[image:var(--image-url)] bg-cover bg-[center_30%] bg-no-repeat"
        >
          <BrandAccentedHeadings
            headingCopy={page.title}
            headingLevel={1}
            className="absolute bottom-0 z-10 mb-8 w-full text-white"
          />
          <div className="absolute left-0 top-0 z-[9] h-full w-full bg-gradient-to-t from-red-950" />
        </div>
      ) : (
        <BrandAccentedHeadings headingCopy={page.title} headingLevel={1} className="mb-8" />
      )}
      <Prose className="mb-8" html={page.body as string} />
      {page.subPages && (
        <section className="p-6 md:p-12">
          <div className="flex flex-wrap gap-y-8">
            {page.subPages.map((subPage) => (
              <Link
                className="card group mx-auto flex w-full max-w-[565px] justify-between border border-theme-primary/60 hover:border-theme-secondary/60 hover:shadow-md hover:shadow-theme-secondary"
                href={`${page.handle}/${subPage.handle}`}
              >
                <div className="w-1/2">
                  <h2 className="font-decorative-serif text-3xl">{subPage.title}</h2>
                </div>
                {subPage.previewImage && (
                  <Image
                    src={subPage.previewImage!.url}
                    alt={subPage.previewImage!.altText}
                    height={subPage.previewImage?.height}
                    width={subPage.previewImage?.width}
                    className="aspect-video w-1/3"
                  />
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
      {page?.pageSections && sectionFetcher(page.pageSections.map((section) => section.title))}
    </>
  );
}
