import { contacts } from '@wix/crm';
import { items } from '@wix/data';
import { currentCart, recommendations } from '@wix/ecom';
import { emailSubscriptions } from '@wix/email-subscriptions';
import { groups } from '@wix/groups';
import { files, folders } from '@wix/media';
import { members } from '@wix/members';
import { orders, plans } from '@wix/pricing-plans';
import { redirects } from '@wix/redirects';
import { ApiKeyStrategy, createClient, media, OAuthStrategy } from '@wix/sdk';
import { collections, products } from '@wix/stores';
import { SortKey, WIX_SESSION_COOKIE } from 'lib/constants';
import { cookies } from 'next/headers';
import {
  Cart,
  Collection,
  Membership,
  Menu,
  Page,
  Product,
  ProductVariant,
  Section,
  Service,
  Testimonial
} from './types';

const cartesian = <T>(data: T[][]) =>
  data.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]] as T[][]);

const reshapeCart = (cart: currentCart.Cart): Cart => {
  return {
    id: cart._id!,
    checkoutUrl: '/cart-checkout',
    cost: {
      subtotalAmount: {
        amount: String(
          cart.lineItems!.reduce((acc, item) => {
            return acc + Number.parseFloat(item.price?.amount!) * item.quantity!;
          }, 0)
        ),
        currencyCode: cart.currency!
      },
      totalAmount: {
        amount: String(
          cart.lineItems!.reduce((acc, item) => {
            return acc + Number.parseFloat(item.price?.amount!) * item.quantity!;
          }, 0)
        ),
        currencyCode: cart.currency!
      },
      totalTaxAmount: {
        amount: '0',
        currencyCode: cart.currency!
      }
    },
    lines: cart.lineItems!.map((item) => {
      const featuredImage = media.getImageUrl(item.image!);
      return {
        id: item._id!,
        quantity: item.quantity!,
        cost: {
          totalAmount: {
            amount: String(Number.parseFloat(item.price?.amount!) * item.quantity!),
            currencyCode: cart.currency!
          }
        },
        merchandise: {
          id: item._id!,
          title:
            item.descriptionLines
              ?.map((x) => x.colorInfo?.original ?? x.plainText?.original)
              .join(' / ') ?? '',
          selectedOptions: [],
          product: {
            handle: item.url?.split('/').pop() ?? '',
            featuredImage: {
              id: media.getImageUrl(item.image!).id,
              altText: 'altText' in featuredImage ? featuredImage.altText : 'alt text',
              url: media.getImageUrl(item.image!).url,
              width: media.getImageUrl(item.image!).width,
              height: media.getImageUrl(item.image!).height
            },
            title: item.productName?.original!
          } as any as Product,
          url: `/product/${item.url?.split('/').pop() ?? ''}`
        }
      };
    }),
    totalQuantity: cart.lineItems!.reduce((acc, item) => {
      return acc + item.quantity!;
    }, 0)
  };
};

const reshapeCollection = (collection: collections.Collection) =>
  ({
    path: `/search/${collection.slug}`,
    handle: collection.slug,
    title: collection.name,
    description: collection.description,
    seo: {
      title: collection.name
    },
    updatedAt: new Date().toISOString()
  }) as Collection;

const reshapeCollections = (collections: collections.Collection[]) => {
  return collections.map(reshapeCollection);
};

const reshapeProduct = (item: products.Product) => {
  return {
    id: item._id!,
    title: item.name!,
    description: item.description!,
    descriptionHtml: item.description!,
    availableForSale:
      item.stock?.inventoryStatus === 'IN_STOCK' ||
      item.stock?.inventoryStatus === 'PARTIALLY_OUT_OF_STOCK',
    handle: item.slug!,
    images:
      item.media
        ?.items!.filter((x) => x.image)
        .map((image) => ({
          url: image.image!.url!,
          altText: image.image?.altText! ?? 'alt text',
          width: image.image?.width!,
          height: image.image?.height!
        })) || [],
    priceRange: {
      minVariantPrice: {
        amount: String(item.price?.price!),
        currencyCode: item.price?.currency!
      },
      maxVariantPrice: {
        amount: String(item.price?.price!),
        currencyCode: item.price?.currency!
      }
    },
    options: (item.productOptions ?? []).map((option) => ({
      id: option.name!,
      name: option.name!,
      values: option.choices!.map((choice) =>
        option.optionType === products.OptionType.color ? choice.description : choice.value
      )
    })),
    featuredImage: {
      url: item.media?.mainMedia?.image?.url!,
      altText: item.media?.mainMedia?.image?.altText! ?? 'alt text',
      width: item.media?.mainMedia?.image?.width!,
      height: item.media?.mainMedia?.image?.height!
    },
    tags: [],
    variants: item.manageVariants
      ? item.variants?.map((variant) => ({
          id: variant._id!,
          title: item.name!,
          price: {
            amount: String(variant.variant?.priceData?.price),
            currencyCode: variant.variant?.priceData?.currency
          },
          availableForSale: variant.stock?.trackQuantity
            ? (variant.stock?.quantity ?? 0 > 0)
            : true,
          selectedOptions: Object.entries(variant.choices ?? {}).map(([name, value]) => ({
            name,
            value
          }))
        }))
      : cartesian(
          item.productOptions?.map(
            (x) =>
              x.choices?.map((choice) => ({
                name: x.name,
                value:
                  x.optionType === products.OptionType.color ? choice.description : choice.value
              })) ?? []
          ) ?? []
        ).map((selectedOptions) => ({
          id: '00000000-0000-0000-0000-000000000000',
          title: item.name!,
          price: {
            amount: String(item.price?.price!),
            currencyCode: item.price?.currency!
          },
          availableForSale: item.stock?.inventoryStatus === 'IN_STOCK',
          selectedOptions: selectedOptions
        })),
    seo: {
      description: item.description!,
      title: item.name!
    },
    updatedAt: item.lastUpdated?.toString()!
  } as Product;
};

export async function addToCart(
  lines: { productId: string; variant?: ProductVariant; quantity: number }[]
): Promise<Cart> {
  const { addToCurrentCart } = getWixClient().use(currentCart);
  const { cart } = await addToCurrentCart({
    lineItems: lines.map(({ productId, variant, quantity }) => ({
      catalogReference: {
        catalogItemId: productId,
        appId: '1380b703-ce81-ff05-f115-39571d94dfcd',
        ...(variant && {
          options:
            variant.id === '00000000-0000-0000-0000-000000000000'
              ? {
                  options: variant.selectedOptions.reduce(
                    (acc, option) => ({ ...acc, [option.name!]: option.value! }),
                    {} as Record<string, string>
                  )
                }
              : { variantId: variant?.id }
        })
      },
      quantity
    }))
  });

  return reshapeCart(cart!);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const { removeLineItemsFromCurrentCart } = getWixClient().use(currentCart);

  const { cart } = await removeLineItemsFromCurrentCart(lineIds);

  return reshapeCart(cart!);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const { updateCurrentCartLineItemQuantity } = getWixClient().use(currentCart);

  const { cart } = await updateCurrentCartLineItemQuantity(
    lines.map(({ id, quantity }) => ({
      id: id,
      quantity
    }))
  );

  return reshapeCart(cart!);
}

export async function getCart(): Promise<Cart | undefined> {
  const { getCurrentCart } = getWixClient().use(currentCart);
  try {
    const cart = await getCurrentCart();

    return reshapeCart(cart);
  } catch (e) {
    if ((e as any).details.applicationError.code === 'OWNED_CART_NOT_FOUND') {
      return undefined;
    }
  }
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const { getCollectionBySlug } = getWixClient().use(collections);

  try {
    const { collection } = await getCollectionBySlug(handle);

    if (!collection) {
      return undefined;
    }

    return reshapeCollection(collection);
  } catch (e) {
    if ((e as any).code === '404') {
      return undefined;
    }
  }
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const { getCollectionBySlug } = getWixClient().use(collections);
  let resolvedCollection;
  try {
    const { collection: wixCollection } = await getCollectionBySlug(collection);
    resolvedCollection = wixCollection;
  } catch (e) {
    if ((e as any)?.details?.applicationError?.code !== 404) {
      throw e;
    }
  }

  if (!resolvedCollection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  const { items } = await sortedProductsQuery(sortKey, reverse)
    .hasSome('collectionIds', [resolvedCollection._id])
    .find();

  return items.map(reshapeProduct);
}

function sortedProductsQuery(sortKey?: string, reverse?: boolean) {
  const { queryProducts } = getWixClient().use(products);
  const query = queryProducts();
  if (reverse) {
    return query.descending((sortKey! as SortKey) ?? 'name');
  } else {
    return query.ascending((sortKey! as SortKey) ?? 'name');
  }
}

export async function getCollections(): Promise<Collection[]> {
  const { queryCollections } = getWixClient().use(collections);
  const { items } = await queryCollections().find();

  const wixCollections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(items).filter((collection) => !collection.handle.startsWith('hidden'))
  ];

  return wixCollections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const { queryDataItems } = getWixClient().use(items);

  // Fetch menu data
  const { items: menus } = await queryDataItems({
    dataCollectionId: 'Menus',
    referencedItemOptions: [{ fieldName: 'pages' }]
  })
    .eq('slug', handle)
    .find()
    .catch((e) => {
      if (e.details.applicationError.code === 'WDE0025') {
        console.error(
          'Menus collection was not found. Did you forget to create the Menus data collection?'
        );
        return { items: [] };
      } else {
        throw e;
      }
    });

  // If no menu found, return an empty array
  if (!menus || menus.length === 0) return [];

  const menu = menus[0];

  // Fetch subPages for each page in the menu
  await Promise.all(
    menu?.data!.pages.map(async (page: { title: string; slug: string; subPages?: Page[] }) => {
      const pageData = await getPage(page.slug);
      page['subPages'] = pageData?.subPages || [];
    })
  );

  // Transform the menu data into the desired format
  return menu?.data!.pages.map((page: { title: string; slug: string; subPages?: any[] }) => ({
    title: page.title,
    path: '/' + page.slug,
    subPages: page.subPages || []
  }));
}

export async function getPage(handle: string): Promise<Page | undefined> {
  const { queryDataItems } = getWixClient().use(items);

  const { items: pages } = await queryDataItems({
    dataCollectionId: 'Pages',
    referencedItemOptions: [
      { fieldName: 'PageSections_pages' },
      { fieldName: 'subPages' },
      { fieldName: 'Pages_subPages' }
    ]
  })
    .eq('slug', handle)
    .find()
    .catch((e) => {
      if (e.details.applicationError.code === 'WDE0025') {
        console.error(
          'Pages collection was not found. Did you forget to create the Pages data collection?'
        );
        return { items: [] };
      } else {
        throw e;
      }
    });

  const page = pages[0];
  if (!page) {
    return undefined;
  }
  return {
    id: page._id!,
    title: page.data!.title,
    handle: '/' + page.data!.slug,
    body: page.data!.body,
    bodySummary: '',
    headerImage: page.data!.headerImage
      ? {
          id: media.getImageUrl(page.data!.headerImage).id,
          altText: media.getImageUrl(page.data!.headerImage).altText! || 'alt text',
          url: media.getImageUrl(page.data!.headerImage).url,
          width: media.getImageUrl(page.data!.headerImage).width,
          height: media.getImageUrl(page.data!.headerImage).height
        }
      : undefined,
    previewImage: page.data!.previewImage
      ? {
          id: media.getImageUrl(page.data!.previewImage).id,
          altText: media.getImageUrl(page.data!.previewImage).altText! || 'alt text',
          url: media.getImageUrl(page.data!.previewImage).url,
          width: media.getImageUrl(page.data!.previewImage).width,
          height: media.getImageUrl(page.data!.previewImage).height
        }
      : undefined,
    photoGallery: page.data!.photoGallery
      ? page.data!.photoGallery.map((photo: { src: string }) => ({
          id: media.getImageUrl(photo.src).id,
          altText: media.getImageUrl(photo.src).altText! || 'alt text',
          url: media.getImageUrl(photo.src).url,
          width: media.getImageUrl(photo.src).width,
          height: media.getImageUrl(photo.src).height
        }))
      : undefined,
    pageSections: page.data!.PageSections_pages,
    subPages:
      page.data!.subPages.length > 0
        ? page.data!.subPages.map(
            (subPage: { id: string; slug: string; title: string; previewImage?: string }) => ({
              handle: subPage.slug,
              title: subPage.title,
              previewImage: subPage.previewImage
                ? {
                    id: media.getImageUrl(subPage.previewImage).id,
                    altText: media.getImageUrl(subPage.previewImage).altText! || 'alt text',
                    url: media.getImageUrl(subPage.previewImage).url,
                    width: media.getImageUrl(subPage.previewImage).width,
                    height: media.getImageUrl(subPage.previewImage).height
                  }
                : undefined
            })
          )
        : undefined,
    isSubPage: page.data!.Pages_subPages.length ? true : false,
    parentPage: page.data!.Pages_subPages.map(
      (page: { id: string; slug: string; title: string; previewImage?: string }) => page.slug
    ),
    createdAt: page.data!._createdDate.$date,
    seo: {
      title: page.data!.seoTitle,
      description: page.data!.seoDescription
    },
    updatedAt: page.data!._updatedDate.$date
  };
}

export async function getPages(): Promise<Page[]> {
  const { queryDataItems } = getWixClient().use(items);

  const { items: pages } = await queryDataItems({
    dataCollectionId: 'Pages'
  })
    .find()
    .catch((e) => {
      if (e.details.applicationError.code === 'WDE0025') {
        console.error(
          'Pages collection was not found. Did you forget to create the Pages data collection?'
        );
        return { items: [] };
      } else {
        throw e;
      }
    });

  return pages.map((item) => ({
    id: item._id!,
    title: item.data!.title,
    handle: item.data!.slug,
    body: item.data!.body,
    bodySummary: '',
    headerImage: item.data!.headerImage
      ? {
          id: media.getImageUrl(item.data!.headerImage).id,
          altText: media.getImageUrl(item.data!.headerImage).altText! || 'alt text',
          url: media.getImageUrl(item.data!.headerImage).url,
          width: media.getImageUrl(item.data!.headerImage).width,
          height: media.getImageUrl(item.data!.headerImage).height
        }
      : undefined,
    previewImage: item.data!.previewImage
      ? {
          id: media.getImageUrl(item.data!.previewImage).id,
          altText: media.getImageUrl(item.data!.previewImage).altText! || 'alt text',
          url: media.getImageUrl(item.data!.previewImage).url,
          width: media.getImageUrl(item.data!.previewImage).width,
          height: media.getImageUrl(item.data!.previewImage).height
        }
      : undefined,
    isSubPage: item.data!.Pages_subPages.length ? true : false,
    createdAt: item.data!._createdDate.$date,
    seo: {
      title: item.data!.seoTitle,
      description: item.data!.seoDescription
    },
    updatedAt: item.data!._updatedDate.$date
  }));
}

export async function getSection(handle: string): Promise<Section | undefined> {
  const { queryDataItems } = getWixClient().use(items);
  const { items: sections } = await queryDataItems({
    dataCollectionId: 'PageSections'
  })
    .eq('title', handle)
    .limit(1)
    .find();
  const section = sections[0];
  if (!section) {
    return undefined;
  } else {
    const data: Section = {
      id: section._id!,
      title: section.data!.title,
      heading: section.data!.heading,
      subHeading: section.data!.subHeading,
      body: section.data!.body,
      mediagallery: section.data!.mediagallery
        ? section.data!.mediagallery.map((item: { type: string; src: string }) => {
            if (item.type === 'video') {
              return {
                id: media.getVideoUrl(item.src).id,
                url: media.getVideoUrl(item.src).url,
                thumbnail: media.getImageUrl(media.getVideoUrl(item.src).thumbnail).url
              };
            } else {
              return {
                id: media.getImageUrl(item.src).id,
                url: media.getImageUrl(item.src).url,
                altText: media.getImageUrl(item.src).altText! ?? 'alt text',
                width: media.getImageUrl(item.src).width,
                height: media.getImageUrl(item.src).height
              };
            }
          })
        : undefined,
      createdAt: section.data!._createdDate.$date,
      updatedAt: section.data!._updatedDate.$date
    };
    if (section.data!.sectionBackgroundImage) {
      data['sectionBackgroundImage'] = {
        id: media.getImageUrl(section.data!.sectionBackgroundImage).id,
        url: media.getImageUrl(section.data!.sectionBackgroundImage).url,
        altText: media.getImageUrl(section.data!.sectionBackgroundImage).altText! ?? 'alt text',
        width: media.getImageUrl(section.data!.sectionBackgroundImage).width,
        height: media.getImageUrl(section.data!.sectionBackgroundImage).height
      };
    }
    return data;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { queryDataItems } = getWixClient().use(items);
  const { items: testimonials } = await queryDataItems({ dataCollectionId: 'Testimonials' }).find();

  return testimonials.map((testimonial) => ({
    id: testimonial._id!,
    name: testimonial.data?.name,
    age: testimonial.data?.age,
    quote: testimonial.data!.quote
  }));
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const { queryProducts } = getWixClient().use(products);
  const { items } = await queryProducts().eq('slug', handle).limit(1).find();
  const product = items[0];

  if (!product) {
    return undefined;
  }

  return reshapeProduct(product);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const { getRecommendation } = getWixClient().use(recommendations);

  const { recommendation } = await getRecommendation(
    [
      {
        _id: '5dd69f67-9ab9-478e-ba7c-10c6c6e7285f',
        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e'
      },
      {
        _id: 'ba491fd2-b172-4552-9ea6-7202e01d1d3c',
        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e'
      },
      {
        _id: '68ebce04-b96a-4c52-9329-08fc9d8c1253',
        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e'
      }
    ],
    {
      items: [
        {
          catalogItemId: productId,
          appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e'
        }
      ],
      minimumRecommendedItems: 3
    }
  );

  if (!recommendation) {
    return [];
  }

  const { queryProducts } = getWixClient().use(products);
  const { items } = await queryProducts()
    .in(
      '_id',
      recommendation.items!.map((item) => item.catalogItemId)
    )
    .find();
  return items.slice(0, 6).map(reshapeProduct);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const { items } = await sortedProductsQuery(sortKey, reverse)
    .startsWith('name', query || '')
    .find();

  return items.map(reshapeProduct);
}

export const getWixClient = () => {
  let sessionTokens;
  try {
    const cookieStore = cookies();
    sessionTokens = JSON.parse(cookieStore.get(WIX_SESSION_COOKIE)?.value || '{}');
  } catch (e) {}
  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID!,
      tokens: sessionTokens
    })
  });
  return wixClient;
};

export const getWixElevatedClient = () => {
  const wixClient = createClient({
    auth: ApiKeyStrategy({
      apiKey: process.env.WIX_API_KEY as string,
      siteId: process.env.WIX_SITE_ID,
      accountId: ''
    }),
    modules: {
      contacts: contacts,
      emailSubscriptions: emailSubscriptions,
      members: members,
      folders: folders,
      files: files
    }
  });
  return wixClient;
};

export async function createCheckoutUrl(postFlowUrl: string) {
  const {
    currentCart: { createCheckoutFromCurrentCart },
    redirects: { createRedirectSession }
  } = getWixClient().use({ currentCart, redirects });

  const currentCheckout = await createCheckoutFromCurrentCart({
    channelType: currentCart.ChannelType.OTHER_PLATFORM
  });

  const { redirectSession } = await createRedirectSession({
    ecomCheckout: { checkoutId: currentCheckout.checkoutId },
    callbacks: {
      postFlowUrl
    }
  });

  return redirectSession?.fullUrl!;
}

export async function createContact(
  info: contacts.ContactInfo,
  options?: contacts.CreateContactOptions
): Promise<contacts.CreateContactResponse> {
  const { createContact } = getWixElevatedClient().use(contacts);
  return await createContact(info, options);
}

export async function getContact(email: string): Promise<contacts.Contact | undefined> {
  const { queryContacts } = getWixElevatedClient().use(contacts);
  const { items } = await queryContacts().eq('primaryInfo.email', email).limit(1).find();
  const contact = items[0];

  if (!contact) {
    return undefined;
  }
  return contact;
}

export async function getMemberContact(contactId: string): Promise<contacts.Contact | undefined> {
  const { queryContacts } = getWixElevatedClient().use(contacts);
  const { items } = await queryContacts().eq('_id', contactId).limit(1).find();
  const contact = items[0];

  if (!contact) {
    return undefined;
  }
  return contact;
}

export async function subscribeUserEmail(email: string) {
  const { createContact, queryContacts, onContactCreated } = getWixElevatedClient().use(contacts);
  const { upsertEmailSubscription } = getWixElevatedClient().use(emailSubscriptions);

  //check to see if contact already exists
  const { items } = await queryContacts().eq('primaryInfo.email', email).limit(1).find();
  const existingContact = items[0];
  let newContact;

  if (!existingContact) {
    newContact = await createContact({ emails: { items: [{ email }] } });
  }

  const response = await upsertEmailSubscription({
    subscription: {
      email: email,
      subscriptionStatus: emailSubscriptions.SubscriptionEnumStatus.SUBSCRIBED
    }
  });
  return response;
}

export const getWixMemberClient = () => {
  let sessionTokens;
  try {
    const cookieStore = cookies();
    sessionTokens = JSON.parse(cookieStore.get(WIX_SESSION_COOKIE)?.value || '{}');
  } catch (e) {}
  const wixClient = createClient({
    modules: { members, plans, orders, groups },
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID!,
      tokens: sessionTokens
    })
  });
  return wixClient;
};
export async function isMemberLoggedIn() {
  return getWixMemberClient().auth.loggedIn();
}

export async function getCurrentMember() {
  const isLoggedIn = await isMemberLoggedIn();
  if (isLoggedIn) {
    const { member } = await getWixMemberClient().members.getCurrentMember();
    return member;
  } else {
    return undefined;
  }
}

export async function getCurrentMemberExtended() {
  const isLoggedIn = await isMemberLoggedIn();
  if (isLoggedIn) {
    const { member } = await getWixMemberClient().members.getCurrentMember({
      fieldsets: [members.Set.EXTENDED]
    });
    return member;
  } else {
    return undefined;
  }
}

export async function updateMemberSlug(
  slug: string
): Promise<members.UpdateMySlugResponse | undefined> {
  return await getWixMemberClient().members.updateCurrentMemberSlug(slug);
}

export async function updateMemberProfile(
  _id: string,
  updateObject: members.UpdateMember
): Promise<members.Member | undefined> {
  return await getWixMemberClient().members.updateMember(_id, updateObject);
}

export async function getGroup(id: string) {
  return await getWixMemberClient().groups.getGroup(id);
}

export async function getMemberPlans() {
  const currentMemberID = await getCurrentMember().then((data) => (data ? data._id : null));
  if (!currentMemberID) return undefined;
  const currentMemberGroups = await getWixMemberClient()
    .fetchWithAuth(
      `https://www.wixapis.com/social-groups-proxy/members/v2/members/${currentMemberID}/memberships`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    )
    .then((response) => response.json())
    .then(async (memberGroups) => {
      await Promise.all(
        memberGroups.memberships.map(async (group: Membership, i: number) => {
          const groupDetails = await getGroup(group.groupId);
          memberGroups.memberships[i]['groupDetails'] = groupDetails;
        })
      );
      return memberGroups;
    });
  return currentMemberGroups || undefined;
}

export async function getTeaseServices(): Promise<Service[] | undefined> {
  const { queryDataItems } = getWixClient().use(items);
  const { items: services } = await queryDataItems({ dataCollectionId: 'Services' }).find();
  return services.map((service, i: number) => ({
    _id: service.data!._id,
    tagline: service.data!.tagline || undefined,
    icon: service.data!.icon
      ? {
          id: media.getImageUrl(service.data!.icon).id,
          url: media.getImageUrl(service.data!.icon).url,
          altText: media.getImageUrl(service.data!.icon).altText || 'altText',
          height: media.getImageUrl(service.data!.icon).height,
          width: media.getImageUrl(service.data!.icon).width
        }
      : undefined,
    servicePage: service.data?.servicePage,
    whatGoesDown: service.data?.whatGoesDown,
    whatGoesDownImages: service.data?.whatGoesDownImages
      ? service.data?.whatGoesDownImages.map((image: { src: string }) => ({
          id: media.getImageUrl(image.src).url,
          url: media.getImageUrl(image.src).url,
          altText: media.getImageUrl(image.src).altText || 'altText',
          height: media.getImageUrl(image.src).height,
          width: media.getImageUrl(image.src).width
        }))
      : [],
    whatGoesDownImage:
      service.data?.whatGoesDownImage && service.data?.whatGoesDownImage?.startsWith('wix:video')
        ? {
            id: media.getImageUrl(service.data!.whatGoesDownImage).url,
            url: media.getImageUrl(service.data!.whatGoesDownImage).url,
            altText: media.getImageUrl(service.data!.whatGoesDownImage).altText || 'altText',
            height: media.getImageUrl(service.data!.whatGoesDownImage).height,
            width: media.getImageUrl(service.data!.whatGoesDownImage).width
          }
        : undefined,
    whatGoesDownVideo: service.data?.whatGoesDownVideo
      ? {
          id: media.getVideoUrl(service.data!.whatGoesDownVideo).id,
          url: media.getVideoUrl(service.data!.whatGoesDownVideo).url,
          thumbnail: media.getImageUrl(media.getVideoUrl(service.data!.whatGoesDownVideo).thumbnail)
            .url
        }
      : undefined,
    reasonsToBook: service.data?.reasonsToBook,
    reasonsToBookImages:
      service.data?.reasonsToBookImages && service.data?.reasonsToBookImages.length
        ? service.data?.reasonsToBookImages.map((image: { src: string }) => ({
            id: media.getImageUrl(image.src).url,
            url: media.getImageUrl(image.src).url,
            altText: media.getImageUrl(image.src).altText || 'altText',
            height: media.getImageUrl(image.src).height,
            width: media.getImageUrl(image.src).width
          }))
        : [],
    reasonsToBookImage: service.data?.reasonsToBookImage
      ? {
          id: media.getImageUrl(service.data!.reasonsToBookImage).url,
          url: media.getImageUrl(service.data!.reasonsToBookImage).url,
          altText: media.getImageUrl(service.data!.reasonsToBookImage).altText || 'altText',
          height: media.getImageUrl(service.data!.reasonsToBookImage).height,
          width: media.getImageUrl(service.data!.reasonsToBookImage).width
        }
      : undefined,
    descrption: service.data?.description,
    title: service.data?.title
  }));
}

export async function getFolders() {
  return (await getWixElevatedClient().folders.listFolders()).folders;
}

export async function getFolderID(folderName: string) {
  const folders = await getFolders();

  return folders.find((folder) => folder.displayName === folderName)?._id;
}

export async function getFolderFiles(folderName: string) {
  const folderID = await getFolderID(folderName);
  return (await getWixElevatedClient().files.listFiles({ parentFolderId: folderID })).files;
}

export async function getFooterLegalDocs() {
  return getFolderFiles('legalDocuments').then((data) =>
    data.map((file) => ({
      displayName: file.displayName,
      url: file.url
    }))
  );
}

export async function joinCommunity() {
  return await getWixMemberClient().members.joinCommunity();
}

export async function getJoinCommunityBanner() {
  const { queryDataItems } = getWixClient().use(items);
  const { items: banner } = await queryDataItems({
    dataCollectionId: 'JoinCommunityBanner'
  }).find();
}

export async function getTeaseGals() {
  const { queryDataItems } = getWixClient().use(items);
  const { items: gals } = await queryDataItems({
    dataCollectionId: 'Gals'
  }).find();

  return gals.map((gal) => ({
    name: gal.data!.title,
    url: gal.data!.link,
    image: {
      id: media.getImageUrl(gal.data!.image).id,
      alt: media.getImageUrl(gal.data!.image).altText || `${gal.data!.title} image`,
      url: media.getImageUrl(gal.data!.image).url,
      width: media.getImageUrl(gal.data!.image).width,
      height: media.getImageUrl(gal.data!.image).height
    }
  }));
}
