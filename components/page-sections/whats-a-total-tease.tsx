import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getSection } from 'lib/wix';

interface CustomStyle extends React.CSSProperties {
  '--image-url': string;
}

export default async function WhatIsATotalTease() {
  const section = await getSection('What is a Total Tease');

  return (
    <>
      {section && (
        <div className="mx-auto flex max-w-screen-xl flex-col-reverse lg:flex-row">
          <div className="w-full lg:max-w-[50%]">
            <BrandAccentedHeadings
              headingCopy={section.heading}
              headingLevel={2}
              variant="AccentLastTwo"
            />
            <Prose className="my-8" html={section.body as string} />
          </div>
          <div className="w-full lg:max-w-[50%]"></div>
        </div>
      )}
    </>
  );
}
