// server/api/user/cart.js
import { stat } from 'fs';
import { defineEventHandler, getRequestHeaders, readBody } from 'h3';

/**
 * แปลงข้อมูลตะกร้าจาก API ให้เป็นรูปแบบที่ต้องการ
 * @param {Object} apiResponse - ข้อมูลตะกร้าจาก API
 * @returns {Array} - ข้อมูลสินค้าในรูปแบบที่ template ต้องการ
 */
const transformCartItems = (apiResponse) => {
  // ตรวจสอบข้อมูลที่ได้รับจาก API
  if (!apiResponse || !apiResponse.data || !apiResponse.data.shop_list || !apiResponse.data.shop_list[0]) {
    return [];
  }

  // เข้าถึงข้อมูลร้านค้า (มีร้านเดียว)
  const shop = apiResponse.data.shop_list[0];
  const products = shop.product_general || [];

  // สร้าง array สำหรับเก็บสินค้าที่แปลงแล้ว
  const transformedItems = products.map(item => {
    // สร้าง slug จากชื่อสินค้า
    const slug = item.product_name
      ? item.product_name
          .toLowerCase()
          .replace(/[^\wก-๙\s]/g, '')
          .replace(/\s+/g, '-')
      : `product-${item.product_id}`;

    // คำนวณส่วนลด
    const fakePrice = parseFloat(item.fake_price) || 0;
    const realPrice = parseFloat(item.real_price) || 0;
    const discount = fakePrice > 0 && fakePrice !== realPrice
      ? 100 - (realPrice / fakePrice * 100)
      : 0;

    // แปลงข้อมูลเป็นรูปแบบที่ต้องการ
    return {
      id: item.product_id.toString(),
      sku: item.sku || item.main_sku || `SKU${item.product_id}`,
      img: item.product_image || 'https://via.placeholder.com/300x300',
      title: item.product_name || '',
      slug: slug,
      unit: item.unit_type || '1pcs',
      imageURLs: [
        {
          color: {
            name: 'สี 1',
            clrCode: '#C1BAE4'
          },
          img: item.product_image || 'https://via.placeholder.com/300x300'
        }
      ],
      parent: item.category_data?.category_name || 'ทั่วไป',
      children: item.category_data?.category_name || 'ทั่วไป',
      price: fakePrice,
      discount: discount,
      quantity: item.quantity || 1,
      brand: {
        name: item.manufacturer_data?.manufacturer_name || shop.seller_shop_name || 'ทั่วไป'
      },
      category: {
        name: item.category_data?.category_name || 'ทั่วไป'
      },
      status: (item.actual_stock > 0 || item.effective_stock > 0) ? 'in-stock' : 'out-of-stock',
      reviews: [],
      productType: item.product_type || 'general',
      description: item.product_name || '',
      additionalInformation: [
        {
          key: 'ราคาสุทธิ',
          value: `${realPrice} บาท`
        },
        {
          key: 'ภาษีมูลค่าเพิ่ม',
          value: `${item.vat_include || 0} บาท`
        },
        {
          key: 'รหัสสินค้า',
          value: item.product_id.toString()
        }
      ],
      featured: false,
      sellCount: 0,
      tags: [item.category_data?.category_name || 'ทั่วไป'],
      orderQuantity: item.quantity || 1
    };
  });

  return transformedItems;
};

const transformCartSummary = (apiResponse) => {
  if (!apiResponse || !apiResponse.data) {
    return null;
  }

  const data = apiResponse.data;

  return {
    totalItems: data.total_quantity || 0,
    subTotal: parseFloat(data.total_price_no_vat) || 0,
    discount: parseFloat(data.total_discount) || 0,
    shipping: parseFloat(data.shipping_price) || 0,
    tax: parseFloat(data.total_vat) || 0,
    total: parseFloat(data.net_price) || 0
  };
};

const getUserCart = async (headers = {}) => {
  try {
    const config = useRuntimeConfig();
    
    const response = await $fetch(`${config.public.BASE_URL}/api/backend/api/erp/detail_cart`, {
      headers: {
        'api-key': config.API_KEY,
        'api-secret': config.API_SECRET,
        'Authorization': headers.authorization
      },
      method: 'POST',
      body: {
        "role_user": "ext_buyer"
      }
    });

    if (response && response.code === 200) {
        return { 
          code: 200,
          message: 'get-product-success',
          data: { product: transformCartItems(response) } 
        }
    }

    return response
  } catch (error) {
    return error
  }
};

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event);
  return await getUserCart(headers);
});