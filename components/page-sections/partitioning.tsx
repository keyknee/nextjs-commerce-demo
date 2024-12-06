/* this component is for partioning selected rich text returned from the Wix CMS
into containers (such as divs) so that flex and grid layout flows can be used
more easily */

// import clsx from 'clsx';
import { JSDOM } from 'jsdom';
import React from 'react';

interface Props {
  proseHTML: string;
  className?: string;
}

export function ServicesReasons(props: Props) {
  const { proseHTML, className } = props;

  // Parse the HTML using JSDOM
  const domToParse = new JSDOM(proseHTML);
  const allNodes = Array.from(domToParse.window.document.body.querySelectorAll('h3, p'));

  // Partition the nodes into groups based on H3
  const partitions: Array<Array<Element>> = [];
  let currentGroup: Element[] = [];

  allNodes.forEach((el) => {
    if (el.tagName === 'H3') {
      if (currentGroup.length > 0) {
        partitions.push(currentGroup);
      }
      currentGroup = [el];
    } else {
      currentGroup.push(el);
    }
  });

  // Add the last group
  if (currentGroup.length > 0) {
    partitions.push(currentGroup);
  }

  // Render the partitions as list items
  return (
    <ul className={className}>
      {partitions.map((group, index) => (
        <li key={index} className="prose">
          {group.map((node, idx) =>
            React.createElement(node.tagName.toLowerCase(), {
              key: idx,
              dangerouslySetInnerHTML: { __html: node.innerHTML }
            })
          )}
        </li>
      ))}
    </ul>
  );
}
