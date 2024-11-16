import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getSection } from 'lib/wix';

export async function AboutTotalTeaseExperience() {
  const section = await getSection('About');
  return section ? (
    <>
      <BrandAccentedHeadings
        headingCopy={section.heading}
        headingLevel={2}
        variant="AccentLastTwo"
      />
      <Prose className="my-8" html={section.body as string} />
    </>
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
