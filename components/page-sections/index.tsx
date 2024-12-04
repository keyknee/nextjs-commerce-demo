import React from 'react';
import { AboutTotalTeaseExperience, OurPhilosophy } from './centered';
import { FlavorsOfTease, PhotoGrid } from './grid';
import Testimonials from './testimonials';
import { BreakingTheTaboo, MeetOurFounder, OnlyFansBanner, WhatIsATotalTease } from './two-pane';

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
export const MeetOurFounderSection = withSectionWrapper(MeetOurFounder);
export const OurPhilosophySection = withSectionWrapper(OurPhilosophy);
export const PhotoGridSection = withSectionWrapper(PhotoGrid);

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
  'Breaking the Taboo': BreakingTheTabooSection,
  'Meet Our Founder': MeetOurFounderSection,
  'Our Philosophy': OurPhilosophySection,
  'Home Photo Grid': PhotoGridSection
};

export function sectionFetcher(sectionKeys: Array<keyof typeof sectionMap>) {
  return sectionKeys.map((key) => {
    const SectionComponent = sectionMap[key];
    return SectionComponent ? <SectionComponent key={key} /> : null;
  });
}
