import Prose from 'components/prose';
import { getSection } from 'lib/wix';

export default async function AboutTotalTeaseExperience() {
  const section = await getSection('Home About');
  const headingParts = section?.heading.split(' ') || [];
  return section ? (
    <section className="bg-neutral-100 p-12 dark:bg-neutral-900">
      <h2 className="text-center font-decorative-serif text-5xl font-semibold uppercase">
        {headingParts?.slice(0, headingParts.length - 2)}{' '}
        <span className="font-bold text-theme-secondary">{headingParts?.at(-2)} </span>
        <span className="relative -bottom-4 -left-2 font-decorative-script text-7xl capitalize text-theme-primary">
          {headingParts?.at(-1)}
        </span>
      </h2>
      <Prose className="my-8" html={section.body as string} />
    </section>
  ) : null;
}
