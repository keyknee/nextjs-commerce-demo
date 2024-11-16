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
    <div className="mx-auto flex max-w-screen-xl flex-col-reverse lg:flex-row">{children}</div>
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
          />
          <Prose className="my-8" html={section.body as string} />
        </div>
        <div className="mx-auto flex max-w-screen-xl flex-col-reverse lg:flex-row">
          <div className="w-full lg:max-w-[50%]"></div>
        </div>
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
          />
          <div className="my-8 inline-flex h-[38px] gap-3">
            <span className="font-decorative-serif text-2xl">Join Us on</span>
            <a
              href="https://onlyfans.com/totalteasexxx"
              className="inline-flex rounded-lg bg-neutral-100 shadow-md shadow-neutral-500"
            >
              <Image
                src={OnlyFansLogo}
                alt="OnlyFans logo"
                className="m-2"
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
          ></div>
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
          <div className="w-full lg:max-w-[50%]"></div>
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
