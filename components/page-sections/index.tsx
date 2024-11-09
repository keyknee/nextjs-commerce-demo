import React from 'react';
import AboutTotalTeaseExperience from './about';
import BreakingTheTaboo from './breaking-the-taboo';
import FlavorsOfTease from './flavors-of-tease';
import OnlyFansBanner from './of-banner';
import Testimonials from './testimonials';
import WhatIsATotalTease from './whats-a-total-tease';

//custom type interface to handle our section wrapper props
interface WrapperProps {
  children: React.ReactNode;
}

//the shared section wrapper
const SectionWrapper: React.FC<WrapperProps> = ({ children }) => (
  <section className="w-full bg-neutral-100 p-12 shadow-md dark:bg-neutral-900">{children}</section>
);

//withSectionWrapper HOC
function withSectionWrapper<T>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T & React.JSX.IntrinsicAttributes) {
    return (
      <SectionWrapper>
        <Component {...props} />
      </SectionWrapper>
    );
  };
}

//export for the HOCs
export const AboutTotalTeaseExperienceSection = withSectionWrapper(AboutTotalTeaseExperience);
export const OnlyFansBannerSection = withSectionWrapper(OnlyFansBanner);
export const TestimonialsSection = withSectionWrapper(Testimonials);
export const FlavorsOfTeaseSection = withSectionWrapper(FlavorsOfTease);
export const WhatIsATotalTeaseSection = withSectionWrapper(WhatIsATotalTease);
export const BreakingTheTabooSection = withSectionWrapper(BreakingTheTaboo);

/* 
an additional HOC that allows each page to fetch all of their sections together. 
keys should match section titles in Wix
 */
const sectionMap = {
  About: AboutTotalTeaseExperienceSection,
  'OnlyFans Banner': OnlyFansBannerSection,
  Testimonials: TestimonialsSection,
  'Flavors of Tease Grid': FlavorsOfTeaseSection,
  'What is a Total Tease': WhatIsATotalTeaseSection,
  'Breaking the Taboo': BreakingTheTabooSection
};

export function sectionFetcher(sectionKeys: Array<keyof typeof sectionMap>) {
  return sectionKeys.map((key) => {
    const SectionComponent = sectionMap[key];
    return SectionComponent ? <SectionComponent key={key} /> : null;
  });
}
