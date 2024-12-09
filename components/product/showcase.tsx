import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
// import Link from 'next/link';
import { getProduct } from 'lib/wix';
import { Image } from 'lib/wix/types';
import { Suspense } from 'react';
import { Gallery } from './gallery';

interface Props {
  productSlug: string;
}

export async function ProductShowcase(props: Props) {
  const { productSlug } = props;
  const product = await getProduct(`${productSlug}`);

  // const { url, width, height, altText: alt } = product?.featuredImage || {};

  return (
    <Suspense>
      <ProductProvider>
        <div className="flex flex-col items-center gap-4 rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full max-w-[425px] basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product!.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              {product && <ProductDescription product={product} />}
            </Suspense>
          </div>
        </div>
      </ProductProvider>
    </Suspense>
  );
}
