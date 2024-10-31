import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Wix.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <div className="bg-page-header-img bg-full-fill relative min-h-screen">
        {/* <Image src={headerImage} alt="header image" sizes="100vw" className="w-full" /> */}
        <div className="relative z-10 mx-10">
          <h1 className="text-shadow-sm text-theme-secondary font-decorative-serif tracking-tightest py-[calc(33vh)] text-[calc(25vw)] font-semibold uppercase leading-tight min-[623px]:text-[10rem]">
            Total{' '}
            <span className="text-theme-primary font-decorative-script block normal-case tracking-normal">
              Tease
            </span>
          </h1>
        </div>
      </div>

      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
