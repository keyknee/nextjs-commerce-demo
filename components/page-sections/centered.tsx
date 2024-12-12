import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { VideoPlayer } from 'components/video/VideoComponent';
import { getSection } from 'lib/wix';
import { Video } from 'lib/wix/types';

export async function AboutTotalTeaseExperience() {
  const section = await getSection('About');
  const video = section?.mediagallery?.[0] as Video | undefined;

  return section ? (
    <div className="relative flex items-center gap-4 max-md:flex-col">
      <div>
        <BrandAccentedHeadings
          className="relative z-[1]"
          headingCopy={section.heading}
          headingLevel={2}
          variant="AccentLastTwo"
          animate={true}
          animateEntryDirection="right"
        />
        {video && <VideoPlayer {...video} />}
      </div>
      <Prose className="my-8 md:max-w-[50%]" html={section.body as string} />
    </div>
  ) : null;
}

export async function OurPhilosophy() {
  const section = await getSection('Our Philosophy');
  return section ? (
    <div className="text-center">
      <h2 className="text-2xl">{section.heading}</h2>
      <Prose className="our-philosophy" html={section.body as string} />
    </div>
  ) : null;
}
