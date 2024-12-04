import OnlyFansLogo from 'assets/images/OF.png';
import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getSection } from 'lib/wix';
import Image from 'next/image';
import { ReactNode } from 'react';

interface CustomStyle extends React.CSSProperties {
  '--image-url': string;
}

function PaneWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col-reverse gap-x-8 lg:flex-row">
      {children}
    </div>
  );
}

export async function WhatIsATotalTease() {
  const section = await getSection('What is a Total Tease');

  return section ? (
    <>
      <PaneWrapper>
        <div className="w-full lg:max-w-[50%]">
          <BrandAccentedHeadings
            headingCopy={section.heading}
            headingLevel={2}
            variant="AccentLastTwo"
            className="relative z-10 mt-8 max-lg:text-white md:mt-16 lg:mt-0"
          />
          <Prose className="my-16 lg:my-8" html={section.body as string} />
        </div>
        {section.sectionBackgroundImage && (
          <div
            style={{ '--image-url': `url(${section.sectionBackgroundImage.url})` } as CustomStyle}
            className="relative -mb-[120px] h-[400px] w-full bg-[image:var(--image-url)] bg-cover bg-[center_30%] bg-no-repeat pt-12 lg:mb-0 lg:h-auto"
          >
            <div className="relative mx-auto h-full w-full max-w-[445px]">
              <svg
                className="absolute left-0 top-0 fill-slate-950/60"
                preserveAspectRatio="xMidYMid meet"
                data-bbox="19.5 19.5 161 161"
                viewBox="19.5 19.5 161 161"
                height="200"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
                data-type="shape"
                role="presentation"
                aria-hidden="true"
                aria-label=""
              >
                <g>
                  <path d="M100 19.5c-44.449 0-80.5 36.051-80.5 80.5s36.051 80.5 80.5 80.5 80.5-36.051 80.5-80.5-36.051-80.5-80.5-80.5zm0 131.735c-28.247 0-51.235-22.903-51.235-51.235 0-28.247 22.903-51.235 51.235-51.235 28.247 0 51.235 22.903 51.235 51.235 0 28.247-22.988 51.235-51.235 51.235z"></path>
                </g>
              </svg>
              <svg
                className="absolute bottom-0 left-[120px] fill-theme-primary/60"
                preserveAspectRatio="xMidYMid meet"
                data-bbox="20 30.5 160 139"
                viewBox="20 30.5 160 139"
                height="200"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
                data-type="shape"
                role="presentation"
                aria-hidden="true"
                aria-label=""
              >
                <g>
                  <path d="M100 30.5l80 139H20l80-139z"></path>
                </g>
              </svg>
              <svg
                className="absolute left-[200px] top-0 fill-theme-primary/30"
                height="160"
                width="160"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="80" cy="80" r="80" />
              </svg>
            </div>
          </div>
        )}
      </PaneWrapper>
    </>
  ) : null;
}

export async function OnlyFansBanner() {
  const section = await getSection('OnlyFans Banner');
  const galleryTest = await getSection('Home Photo Grid');
  return section ? (
    <>
      <PaneWrapper>
        <div className="two-pane-copy w-full">
          <BrandAccentedHeadings
            headingCopy={section.heading}
            headingLevel={2}
            variant="AccentLastTwo"
            className="relative z-[5]"
          />
          <div className="my-8 inline-flex h-[38px] gap-3">
            <span className="font-decorative-serif text-2xl">Join Us on</span>
            <a
              href="https://onlyfans.com/totalteasexxx"
              className="group inline-flex rounded-lg bg-neutral-100 shadow-md shadow-neutral-500 hover:scale-105"
            >
              <Image
                src={OnlyFansLogo}
                alt="OnlyFans logo"
                className="m-2 group-hover:scale-105"
                style={{
                  height: 'auto',
                  width: '100%'
                }}
              />
            </a>
          </div>
          <Prose className="my-8" html={section.body as string} />
        </div>
        {section.sectionBackgroundImage && (
          <div
            style={{ '--image-url': `url(${section.sectionBackgroundImage.url})` } as CustomStyle}
            className="relative -mb-[120px] h-[400px] w-full bg-[image:var(--image-url)] bg-cover bg-[center_30%] bg-no-repeat lg:mb-0 lg:h-auto"
          >
            <div className="bg-radial-light dark:bg-radial-dark relative z-[2] h-full w-full" />
          </div>
        )}
      </PaneWrapper>
    </>
  ) : null;
}

export async function BreakingTheTaboo() {
  const section = await getSection('Breaking the Taboo');

  return section ? (
    <>
      {section && (
        <PaneWrapper>
          <div className="w-full lg:max-w-[50%]">
            <div className="relative flex flex-wrap justify-center gap-1">
              {section.mediagallery &&
                section.mediagallery.map((img, i) => (
                  <Image
                    className="flex-[1_1_auto] last:w-full md:max-w-[50%] md:last:max-w-none"
                    key={i}
                    src={img.url}
                    height={img.height}
                    width={img.width}
                    alt={img.altText}
                    // style={{ width: '40%', height: 'auto' }}
                  />
                ))}
            </div>
          </div>
          <div className="w-full lg:max-w-[50%]">
            <BrandAccentedHeadings
              headingCopy={section.heading}
              headingLevel={2}
              variant="AccentFirstAndLast"
            />
            <Prose className="my-8" html={section.body as string} />
          </div>
        </PaneWrapper>
      )}
    </>
  ) : null;
}

export async function MeetOurFounder() {
  const section = await getSection('Meet Our Founder');
  const sectionBkgrnd = section?.sectionBackgroundImage;

  return section ? (
    <PaneWrapper>
      <div
        style={{ '--image-url': `url(${sectionBkgrnd?.url || ''})` } as CustomStyle}
        className="aspect-video w-full bg-[image:var(--image-url)] bg-cover bg-no-repeat lg:max-w-[50%]"
      />
      <div className="w-full lg:max-w-[50%]">
        <BrandAccentedHeadings
          headingCopy={section.heading}
          headingLevel={2}
          variant="AccentFirstAndLast"
        />
        {section.subHeading && (
          <h2 className="absolute my-14 text-center font-decorative-script text-2xl font-semibold text-theme-primary lg:static">
            {section.subHeading}
          </h2>
        )}
      </div>
    </PaneWrapper>
  ) : null;
}
