import type { Metadata } from 'next';

import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getPage, getTeaseGals } from 'lib/wix';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage('tease-gals');

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
  const page = await getPage('tease-gals');
  const gals = await getTeaseGals();
  // console.log(page);
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
      <section className="grid max-w-screen-xl grid-cols-2 gap-8 max-md:grid-cols-1">
        {gals.map((gal, i: number) => (
          <Link href={gal.url || ''} key={`${i}_${gal.name}`}>
            <Image
              alt={gal.image.alt}
              height={gal.image.height}
              width={gal.image.width}
              src={gal.image.url}
            />
          </Link>
        ))}
      </section>
    </>
  );
}
