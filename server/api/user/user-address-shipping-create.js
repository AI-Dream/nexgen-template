export const createUserShipping = async (headers = {}, body = {}) => {
    try {
        const config = useRuntimeConfig();
        
        const response = await $fetch(`${config.public.BASE_URL}/api/backend/api/erp/create_user_address`, {
            headers: {
                'api-key': config.API_KEY,
                'api-secret': config.API_SECRET,
                'Authorization': headers.authorization
            },
            body: body,
            method: 'POST',
        });

        return response;
    } catch (error) {
        return error;
    }
};

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event);
    const body = await readBody(event).catch(() => ({}));
    
    return await createUserShipping(headers, body);
});