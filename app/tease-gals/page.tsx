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
      <BrandAccentedHeadings
        headingCopy={page.title}
        headingLevel={1}
        variant="AccentLastTwo"
        className="mb-8"
      />

      <Prose className="mb-8" html={page.body as string} />
      <section className="grid max-w-screen-xl grid-cols-2 gap-8 max-md:grid-cols-1">
        {gals.map((gal, i: number) => (
          <Link
            className="group relative flex flex-col items-center"
            href={gal.url || ''}
            key={`${i}_${gal.name}`}
          >
            <Image
              className="group-hover:border-gradient-theme-secondary group-hover:border-4"
              alt={gal.image.alt}
              height={gal.image.height}
              width={gal.image.width}
              src={gal.image.url}
            />
            <h2 className="text-semibold relative -top-2 w-fit -skew-y-3 bg-theme-primary p-2 font-decorative-serif">
              {gal.name}
            </h2>
          </Link>
        ))}
      </section>
    </>
  );
}
