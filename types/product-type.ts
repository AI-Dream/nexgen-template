export type IReview = {
  user?:string;
  name:string;
  email:string;
  rating:number;
  review:string;
  date:string;
}

export interface IProduct {
  id: string;
  sku: string;
  img: string;
  title: string;
  slug: string;
  unit: string;
  imageURLs: {
    color?: {
      name: string;
      clrCode: string;
    };
    img: string;
  }[];
  parent: string;
  children: string;
  price: number;
  discount: number;
  quantity: number;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  status: string;
  reviews?: IReview[];
  productType: string;
  description: string;
  orderQuantity?: number;
  additionalInformation: {
    key: string;
    value: string;
  }[];
  featured?: boolean;
  sellCount: number;
  offerDate?:{
    startDate:string;
    endDate:string;
  }
  tags?: string[];
  videoId?:string;
  sizes?:string[];
}

//Next-Gen
export interface NProduct {
  id: number;
  name: string;
  short_description: string;
  message_status: string;
  images_URL: string[];
  real_price: number;
  fake_price: number;
  discount_percent: string;
  vat_include: number;
  vat_default: string;
  fda_number: string | null;
  have_attribute: string;
  seller_shop_id: number;
  otop: string;
  etax: string;
  category_name: string;
  sold: number;
  stars: number;
  review: number;
  is_discount_icon: boolean;
  is_free_shipping_icon: boolean;
  isFavorite: boolean;
  url: string;
  net_price: number;
  icon_tag: string[];
  icon_banner: string;
}

export interface NProductBody {
  product_detail: NProductDetail;
  list_category: NProductCategory[];
  attribute_manage: any[];
  list_product_image: NProductImage[];
}

export interface NProductDetail {
  product_id: number;
  seller_shop_id: number;
  product_status: string;
  product_name: string;
  product_sku: string;
  product_inventory_code: string;
  product_description: string;
  product_short_description: string | null;
  product_stock_status: string;
  product_have_attribute: string;
  product_actual_stock: number;
  product_effective_stock: number;
  vat_type: string;
  vat: number;
  product_sold: number;
  seller_shop_name_th: string;
  seller_shop_name_en: string | null;
  fake_price: string;
  real_price: string;
  fake_price_vat_exclude: string;
  real_price_vat_exclude: string;
  vat_include: string;
  vat_default: string;
  is_favorite: boolean;
}

export interface NProductCategory {
  category_id: number;
  category_name: string;
  category_hierachy: string;
}

export interface NProductImage {
  image_id: number;
  media_path: string;
  thumbnail_media_path: string;
}

export interface NCartProduct {
  quantity: string;
  product_id: number;
  seller_shop_id: number;
  attribute_option_1: string;
  attribute_option_2: string;
  role_user: string;
}