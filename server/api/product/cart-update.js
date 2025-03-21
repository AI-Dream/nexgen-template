export const removeCart = async (headers = {}, body = {}) => {
    try {
        const config = useRuntimeConfig();
        
        const response = await $fetch(`${config.public.BASE_URL}/api/backend/api/erp/update_to_cart`, {
            headers: {
                'api-key': config.API_KEY,
                'api-secret': config.API_SECRET,
                'Authorization': headers.authorization
            },
            method: 'POST',
            body : {
                "seller_shop_id": 86,
                "role_user": "ext_buyer",
                "product_to_delete": [{
                    product_id: body.id,
                    product_attribute_detail: {
                        product_attribute_id: "-1"
                    }
                }],
                "quantity": body.orderQuantity,
                "company_id": "-1",
                "company_position": "-1",
                "com_perm_id": "-1"
            }
        });
        
        return response;
    } catch (error) {
        return error;
    }
};

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event);
    const body = await readBody(event).catch(() => ({}));
    return await removeCart(headers, body);
});