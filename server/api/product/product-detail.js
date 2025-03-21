import { defineEventHandler, getQuery, readBody } from 'h3';

const transformProduct = (apiData) => {
  if (!apiData || !apiData.data || !apiData.data.product_detail) return null;
  
  const { product_detail, list_category, attribute_manage, list_product_image } = apiData.data;
  
  const slug = product_detail.product_name
    ? product_detail.product_name
        .toLowerCase()
        .replace(/[^\wก-๙\s]/g, '')
        .replace(/\s+/g, '-')
    : `product-${product_detail.product_id}`;
  
  const lastCategory = list_category && list_category.length > 0 
    ? list_category[list_category.length - 1] 
    : null;
  
  const fakePrice = parseFloat(product_detail.fake_price) || 0;
  const realPrice = parseFloat(product_detail.real_price) || 0;
  const discount = fakePrice > 0 
    ? (1 - (realPrice / fakePrice)) * 100
    : 0;
  
  const imageURLs = list_product_image 
    ? list_product_image.map((img, index) => {
        const hasColorAttributes = attribute_manage && attribute_manage.length > 0;
        const colorName = hasColorAttributes ? attribute_manage[0].attribute_priority_1 : `สี ${index + 1}`;
        const colorCode = colorName === 'แดง' ? '#FF0000' : 
                         colorName === 'เหลือง' ? '#FFFF00' : '#C1BAE4';
        
        return {
          color: {
            name: colorName,
            clrCode: colorCode,
          },
          img: img.media_path,
        };
      })
    : [];
  
  const mapCategoryToType = (category) => {
    if (!category) return 'general';
    
    const categoryMap = {
      'อาหารและเครื่องดื่ม': 'food',
      'เวชภัณฑ์': 'medicine',
      'ยาสามัญประจำบ้าน': 'medicine',
      'อุปกรณ์อิเล็กทรอนิกส์': 'electronics',
    };
    
    return categoryMap[category] || 'general';
  };
  
  const additionalInformation = [
    {
      key: 'รหัสสินค้า',
      value: product_detail.product_sku || product_detail.product_id.toString(),
    },
    {
      key: 'ภาษีมูลค่าเพิ่ม',
      value: `${product_detail.vat || 0}%`,
    },
    {
      key: 'ราคาสุทธิ',
      value: `${realPrice} บาท`,
    },
  ];
  
  const brandName = product_detail.seller_shop_name_th || product_detail.seller_shop_name_en || 'ทั่วไป';
  
  return {
    id: product_detail.product_id.toString(),
    sku: product_detail.product_sku || `SKU${product_detail.product_id}`,
    img: imageURLs.length > 0 ? imageURLs[0].img : 'https://via.placeholder.com/300x300',
    title: product_detail.product_name || '',
    slug: slug,
    unit: '1pcs',
    imageURLs: imageURLs,
    parent: lastCategory ? lastCategory.category_name : 'สินค้าทั่วไป',
    children: lastCategory ? lastCategory.category_name : 'สินค้าทั่วไป',
    price: fakePrice,
    discount: discount,
    quantity: product_detail.product_effective_stock || 10,
    brand: {
      name: brandName,
    },
    category: {
      name: lastCategory ? lastCategory.category_name : 'สินค้าทั่วไป',
    },
    status: product_detail.product_stock_status === 'in stock' ? 'in-stock' : 'out-of-stock',
    reviews: [],
    productType: lastCategory ? mapCategoryToType(lastCategory.category_name) : 'general',
    description: product_detail.product_description || product_detail.product_short_description || '',
    additionalInformation: additionalInformation,
    featured: false,
    sellCount: product_detail.product_sold || 0,
    tags: lastCategory ? [lastCategory.category_name] : ['ทั่วไป'],
  };
};

const fetchProduct = async (body) => {
  try {
    const config = useRuntimeConfig();
    
    const requestBody = {
      "product_id": body.product_id
    };
        
    const response = await $fetch(`${config.public.BASE_URL}/api/backend/api/erp/get_product_detail`, {
      headers: {
        'api-key': config.API_KEY,
        'api-secret': config.API_SECRET
      },
      method: 'POST',
      body: requestBody,
    });

    if (response && response.code === 200) {
      return { 
        code: 200,
        message: 'get-product-detail-success',
        data: { product: transformProduct(response) }
      }
    }

    return response
  } catch (error) {
    return error
  }
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  return await fetchProduct(body);
});