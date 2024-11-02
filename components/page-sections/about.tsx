import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getSection } from 'lib/wix';

export default async function AboutTotalTeaseExperience() {
  const section = await getSection('About');
  return section ? (
    <section className="bg-neutral-100 p-12 dark:bg-neutral-900">
      <BrandAccentedHeadings
        headingCopy={section.heading}
        headingLevel={2}
        variant="AccentLastTwo"
      />
      <Prose className="my-8" html={section.body as string} />
    </section>
  ) : null;
}
