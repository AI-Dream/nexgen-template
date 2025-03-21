export const addCart = async (headers = {}, body = {}) => {
    try {
        const config = useRuntimeConfig();
        
        const requestBody = {
            "quantity": body.orderQuantity,
            "product_id": body.id,
            "seller_shop_id": "86",
            "attribute_option_1": "",
            "attribute_option_2": "",
            "role_user": "ext_buyer"
        }

        const response = await $fetch(`${config.public.BASE_URL}/api/backend/api/erp/add_to_cart`, {
            headers: {
                'api-key': config.API_KEY,
                'api-secret': config.API_SECRET,
                'Authorization': headers.authorization
            },
            method: 'POST',
            body: requestBody,
        });
        
        return response;
    } catch (error) {
        return error;
    }
};

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event);
    const body = await readBody(event).catch(() => ({}));
    return await addCart(headers, body);
});