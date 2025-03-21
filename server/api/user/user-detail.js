export const getUser = async (headers = {}) => {
    try {
        const config = useRuntimeConfig();
        
        const response = await $fetch(`${config.public.BASE_URL}/api/backend/api/erp/get_user_detail`, {
            headers: {
                'api-key': config.API_KEY,
                'api-secret': config.API_SECRET,
                'Authorization': headers.authorization
            },
            method: 'GET',
        });

        return response;
    } catch (error) {
        return error;
    }
};

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event);
    return await getUser(headers);
});