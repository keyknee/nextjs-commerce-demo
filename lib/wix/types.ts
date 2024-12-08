export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = {
  id?: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: CartItem[];
  totalQuantity: number;
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  path: string;
};

export type Image = {
  id?: string;
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  headerImage?: Image;
  previewImage?: Image;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  pageSections?: Section[];
  subPages?: Page[];
  isSubPage: boolean;
  parentPage?: string;
};

export type Section = {
  id: string;
  title: 'About' | 'OnlyFans Banner' | 'Testimonials';
  heading: string;
  subHeading?: string;
  body: string;
  sectionBackgroundImage?: Image;
  mediagallery?: Image[];
  createdAt: string;
  updatedAt: string;
};
export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  featuredImage: Image;
  seo: SEO;
  tags: string[];
  updatedAt: string;
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name?: string;
  age?: number;
  quote: string;
};

type MemberAvatar = Omit<Image, 'altText'> & {
  _id: string;
};

export type Member = {
  status: string;
  contactId: string;
  profile: {
    nickname: string;
    slug: string;
    photo: MemberAvatar;
  };
  privacyStatus: string;
  activityStatus: string;
  _id: string;
  _createdDate: string;
  _updatedDate: string;
};

export type Membership = {
  groupId: string;
  status: string;
  role: {
    value?: string;
  };
};

export type Service = {
  _id: string;
  title: string;
  tagline?: string;
  icon?: Image;
  descrption?: string;
  servicePage?: string;
  whatGoesDown: string;
  whatGoesDownImage?: Image;
  whatGoesDownVideo?: Video;
  reasonsToBook: string;
  reasonsToBookImage?: Image;
};

export type Video = {
  id: string;
  url: string;
  thumbnail: string;
  filename?: string;
};
