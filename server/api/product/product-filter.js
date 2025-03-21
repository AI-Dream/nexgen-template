export const transformProduct = (apiProduct) => {
    if (!apiProduct) return null;

    const slug = apiProduct.name
        ? apiProduct.name
            .toLowerCase()
            .replace(/[^\wก-๙\s]/g, '')
            .replace(/\s+/g, '-')
        : `product-${apiProduct.id}`;

    return {
        id: apiProduct.id.toString(),
        sku: `SKU${apiProduct.id}`,
        img: apiProduct.images_URL && apiProduct.images_URL.length > 0
            ? apiProduct.images_URL[0]
            : 'https://via.placeholder.com/300x300',
        title: apiProduct.name || '',
        slug: slug,
        unit: '1pcs',
        imageURLs: apiProduct.images_URL
            ? apiProduct.images_URL.map((img, index) => ({
                color: {
                    name: `สี ${index + 1}`,
                    clrCode: '#C1BAE4',
                },
                img: img,
            }))
            : [],
        parent: apiProduct.category_name || 'สินค้าทั่วไป',
        children: apiProduct.category_name || 'สินค้าทั่วไป',
        price: apiProduct.fake_price || 0,
        discount:
            apiProduct.fake_price && apiProduct.real_price
                ? (1 - (apiProduct.real_price / apiProduct.fake_price)) * 100
                : 0,
        quantity: 10,
        brand: {
            name: 'ทั่วไป',
        },
        category: {
            name: apiProduct.category_name || 'สินค้าทั่วไป',
        },
        status: 'in-stock',
        reviews: [],
        productType: apiProduct.category_name ? mapCategoryToType(apiProduct.category_name) : 'general',
        description: apiProduct.short_description || '',
        additionalInformation: [
            {
                key: 'ราคาสุทธิ',
                value: `${apiProduct.net_price || 0} บาท`,
            },
            {
                key: 'ภาษีมูลค่าเพิ่ม',
                value: `${apiProduct.vat_include || 0} บาท`,
            },
            {
                key: 'รหัสสินค้า',
                value: `${apiProduct.id}`,
            },
        ],
        featured: false,
        sellCount: apiProduct.sold || 0,
        tags: apiProduct.category_name ? [apiProduct.category_name] : ['ทั่วไป'],
    };
};

const mapCategoryToType = (category) => {
    const categoryMap = {
        'อาหารและเครื่องดื่ม': 'food',
        'อุปกรณ์อิเล็กทรอนิกส์': 'electronics',
    };

    return categoryMap[category] || 'general';
};

export const fetchProducts = async (options = {}) => {
    try {
        const config = useRuntimeConfig();
        
        const defaultBody = {
            "role_user": "ext_buyer",
            "company_id": "-1",
            "seller_shop_id": 86,
            "category": "",
            "limit": 8,
            "page": 1,
            "orderBy": "",
            "status_product": "",
        };
        
        const requestBody = { ...defaultBody, ...options };
        
        const response = await $fetch(`${config.public.BASE_URL}/api/backend_2/search/product/filter`, {
            headers: {
                'api-key': config.API_KEY,
                'api-secret': config.API_SECRET
            },
            method: 'POST',
            body: requestBody,
        });

        if (response.ok && Array.isArray(response.query_result)) {
            return {
                code: 200,
                message: 'filter-product-success',
                data: {
                    products: response.query_result.map(product => transformProduct(product)),
                    pagination: response.pagination || {}
                }
            };
        }

        return { response: response, data: { products: [], pagination: {} }}
    } catch (error) {
        return error;
    }
};

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const body = await readBody(event).catch(() => ({}));
    const options = { ...query, ...body };
    
    return await fetchProducts(options);
})