import Grid from 'components/grid';
import { BrandAccentedHeadings } from 'components/typography';
import { getPage, getSection } from 'lib/wix';
import Image from 'next/image';
import Link from 'next/link';

export async function FlavorsOfTease() {
  const section = await getSection('Flavors of Tease Grid');
  const teasePages = await getPage('flavors-of-tease').then((page) => page?.subPages);
  return (
    <>
      <BrandAccentedHeadings
        className="mx-auto max-w-[600px]"
        headingCopy={section!.heading}
        headingLevel={2}
        variant="AccentLastThree"
      />
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {teasePages?.map((subPage) => (
          <Link
            key={subPage.id}
            className="aspect-video w-full"
            href={`/flavors-of-tease/${subPage.handle}`}
          >
            {subPage.previewImage ? (
              <Image
                src={subPage.previewImage!.url}
                alt={subPage.previewImage!.altText}
                height={subPage.previewImage!.height}
                width={subPage.previewImage!.width}
                style={{
                  width: '100%',
                  height: 'auto'
                }}
              />
            ) : null}
          </Link>
        ))}
      </Grid>
    </>
  );
}

export async function PhotoGrid() {
  const section = await getSection('Home Photo Grid');
  return (
    <>
      {section?.mediagallery ? (
        <Grid className="grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
          {section.mediagallery.map((image) => (
            <Image
              key={image.url}
              src={image!.url}
              alt={image!.altText}
              height={image!.height}
              width={image!.width}
              style={{
                width: '100%',
                height: 'auto'
              }}
            />
          ))}
        </Grid>
      ) : null}
    </>
  );
}
