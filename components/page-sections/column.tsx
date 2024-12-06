import { WhatGoesDownHeading, WhyBookHeading } from 'components/typography';
import { ReactNode } from 'react';
import { ServicesReasons } from './partitioning';

interface Props {
  serviceTitle: string;
  copy: string;
}

function StackedWrapper({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-screen-xl flex-col gap-y-8">{children}</div>;
}

export async function ReasonsToBook(props: Props) {
  const { serviceTitle, copy } = props;
  return (
    <StackedWrapper>
      <div className="w-full min-w-80">
        <WhyBookHeading headingLevel={2} serviceName={serviceTitle} />
      </div>
      <div className="w-full">
        <ServicesReasons
          proseHTML={copy}
          className={`grid items-center gap-x-2 gap-y-12 prose-h3:text-3xl prose-h3:text-theme-secondary prose-p:text-neutral-900 prose-li:h-full prose-li:max-w-sm max-sm:prose-h3:text-2xl max-sm:prose-li:w-fit sm:grid-cols-2 dark:prose-p:text-neutral-100`}
        />
      </div>
    </StackedWrapper>
  );
}

export async function WhatGoesDown(props: Props) {
  const { serviceTitle, copy } = props;
  return (
    <StackedWrapper>
      <div className="w-full min-w-80">
        <WhatGoesDownHeading headingLevel={2} serviceName={serviceTitle} />
      </div>
      <div className="w-full">
        <ServicesReasons
          proseHTML={copy}
          className={`grid items-center gap-x-2 gap-y-12 prose-h3:text-3xl prose-h3:text-theme-secondary prose-p:text-neutral-900 prose-li:h-full prose-li:max-w-sm max-sm:prose-h3:text-2xl max-sm:prose-li:w-fit sm:grid-cols-2 dark:prose-p:text-neutral-100`}
        />
      </div>
    </StackedWrapper>
  );
}
