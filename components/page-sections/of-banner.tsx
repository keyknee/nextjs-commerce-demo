import OnlyFansLogo from 'assets/images/OF.png';
import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getSection } from 'lib/wix';
import Image from 'next/image';

interface CustomStyle extends React.CSSProperties {
  '--image-url': string;
}

export default async function OnlyFansBanner() {
  const section = await getSection('OnlyFans Banner');
  const galleryTest = await getSection('Home Photo Grid');
  return section ? (
    <>
      <div className="mx-auto flex max-w-screen-xl flex-col-reverse lg:flex-row">
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
      </div>
    </>
  ) : null;
}
