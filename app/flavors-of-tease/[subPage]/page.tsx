import type { Metadata } from 'next';

import { JoinCommunity } from 'components/forms/join-community';
import { ReasonsToBookSection, WhatGoesDownSection } from 'components/page-sections';
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
  return (
    <>
      <header className="relative aspect-video h-96 w-full overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={page.headerImage?.url || ''}
            alt={page.headerImage?.altText || ''}
            style={{ width: '100%', height: '100%' }}
            fill={true}
          />
        </div>
        <BrandAccentedHeadings headingLevel={1} headingCopy={`${service?.title} Tease`} />
      </header>
      <div
        className={`relative z-[1] flex min-h-screen w-full flex-col items-center gap-12 bg-neutral-100 px-12 dark:bg-neutral-900`}
      >
        <section className="my-8 flex max-w-screen-sm flex-col items-center gap-y-8">
          <div className="relative h-20 w-20">
            <Image src={service?.icon?.url || ''} fill={true} alt={`${page.title} icon`} />
          </div>
          <BrandAccentedHeadings
            headingLevel={2}
            headingCopy={service?.tagline || ''}
            variant="AccentFirstAndLast"
          />
          <Prose html={service?.descrption || ''} />
        </section>
        <ReasonsToBookSection
          serviceTitle={service?.title || ''}
          copy={service?.reasonsToBook || ''}
          image={service?.reasonsToBookImage}
        />
        <WhatGoesDownSection
          serviceTitle={service?.title || ''}
          copy={service?.whatGoesDown || ''}
          image={service?.whatGoesDownImage}
          video={service?.whatGoesDownVideo}
        />
      </div>
      <JoinCommunity />
    </>
  );
}
