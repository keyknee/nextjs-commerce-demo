import type { Metadata } from 'next';

import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getPage, getTeaseServices } from 'lib/wix';
import Image from 'next/image';
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

interface CustomStyle extends React.CSSProperties {
  '--image-url': string;
}

export default async function Page({ params }: { params: { subPage: string } }) {
  const page = await getPage(params.subPage).then((page) =>
    page?.parentPage?.includes('flavors-of-tease') ? page : undefined
  );
  if (!page) return notFound();
  const service = await getTeaseServices()
    .then((data) => data?.filter((service) => service.servicePage === page.id) || [])
    .then((data) => data[0]);
  console.log(page);
  return (
    <div>
      <header className="relative aspect-video w-full">
        {page.headerImage && (
          <Image
            src={page.headerImage!.url}
            alt={page.headerImage!.altText}
            style={{ width: '100%' }}
            fill={true}
          />
        )}
        <h1>Tease</h1>
      </header>
      <div className="px-12">
        <section className="flex flex-col items-center">
          <img src={service?.icon?.url} width={80} />
          <BrandAccentedHeadings
            headingLevel={2}
            headingCopy={service?.tagline || ''}
            variant="AccentFirstAndLast"
          />
          <Prose html={service?.descrption || ''} />
        </section>
        <section className="flex">
          <div>
            <BrandAccentedHeadings
              headingLevel={2}
              headingCopy={`Why should I book a ${service?.title ?? ''} session?`}
              variant="AccentLastThree"
            />
          </div>
          <div>
            <Prose html={service?.reasonsToBook || ''} />
          </div>
        </section>
        <section className="flex">
          <div>
            <BrandAccentedHeadings
              headingLevel={2}
              headingCopy={`What goes down in a ${service?.title || ''} session?`}
            />
          </div>
          <div>
            <Prose html={service?.whatGoesDown || ''} />
          </div>
        </section>
      </div>
    </div>
  );
}
