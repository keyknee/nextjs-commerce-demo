import { Carousel } from 'components/carousel';
import { MailingListForm } from 'components/forms';
import { ThreeItemGrid } from 'components/grid/three-items';
import { sectionFetcher } from 'components/page-sections';
import { getPage } from 'lib/wix';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Wix.',
  openGraph: {
    type: 'website'
  }
};

interface CustomStyle extends React.CSSProperties {
  '--image-url': string;
}

export default async function HomePage() {
  const page = await getPage('home');
  // console.log(page);
  return (
    <>
      <div
        style={{ '--image-url': `url(${page?.headerImage?.url || ''})` } as CustomStyle}
        className="bg-full-fill relative min-h-screen bg-[image:var(--image-url)]"
      >
        <div className="absolute left-0 top-0" />
        <div className="h-content relative z-10 mx-10">
          <h1 className="text-shadow-sm ml-[2.5vw] w-fit pt-[calc(40vh)] font-decorative-serif text-[calc(25vw)] font-semibold uppercase leading-tight tracking-tightest text-theme-secondary min-[623px]:text-[10rem] md:py-[calc(40vh)]">
            Total{' '}
            <span className="block font-decorative-script normal-case tracking-normal text-theme-primary">
              Tease
            </span>
          </h1>
        </div>
        {page?.pageSections && sectionFetcher(page.pageSections.map((section) => section.title))}
        <MailingListForm />
      </div>

      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
