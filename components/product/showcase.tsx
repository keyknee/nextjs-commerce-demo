import { ProductProvider } from 'components/product/product-context';
// import Link from 'next/link';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getProduct } from 'lib/wix';
import { Image, Product } from 'lib/wix/types';
import { Suspense } from 'react';
import { Gallery } from './gallery';
import { VariantSelector } from './variant-selector';

interface Props {
  CTAHeading: string;
  subHeading?: string;
  productSlug: string;
}

export async function ProductShowcase(props: Props) {
  const { CTAHeading, subHeading, productSlug } = props;
  const product = await getProduct(`${productSlug}`);

  // const { url, width, height, altText: alt } = product?.featuredImage || {};

  return (
    <Suspense>
      <ProductProvider>
        <section className="w-full">
          <div className="relative mx-auto flex max-w-screen-xl flex-col items-center gap-4 rounded-lg p-8 md:p-12 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col justify-between">
              <BrandAccentedHeadings
                headingCopy={CTAHeading}
                headingLevel={2}
                variant="AccentFirstTwo"
                animate={true}
                animateEntryDirection="left"
                className="mb-5"
              />
              {subHeading && <h3 className="text-2xl font-semibold">{subHeading}</h3>}

              <div className="h-full max-w-64 lg:mt-[20%]">
                <h4 className="text-lg font-semibold uppercase">
                  Special Launch Price
                  <span className="block">Act Now!</span>
                </h4>
                <Suspense fallback={null}>
                  {product && <ProductDetails product={product} />}
                </Suspense>
              </div>
            </div>
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
          </div>
        </section>
      </ProductProvider>
    </Suspense>
  );
}

function ProductDetails({ product }: { product: Product }) {
  return (
    <>
      <h2 className="mb-2 hidden font-medium">{product.title}</h2>
      <span className="relative mb-16 inline-block max-w-fit before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-theme-primary before:p-2">
        <span className="relative text-xl text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </span>
      </span>

      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart
        productId={product.id}
        variants={product.variants}
        availableForSale={product.availableForSale}
      />
    </>
  );
}
