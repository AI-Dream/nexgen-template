export const userLogin = async (body = {}) => {
    try {
        const config = useRuntimeConfig();
        
        const requestBody = {
            username: body.username,
            password: body.password,
        };
        
        const response = await $fetch(`${config.public.BASE_URL}/api/backend/api/erp/login`, {
            headers: {
                'api-key': config.API_KEY,
                'api-secret': config.API_SECRET
            },
            method: 'POST',
            body: requestBody,
        });

        return response
    } catch (error) {
        return error
    }
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event).catch(() => ({}));
    return await userLogin(body);
})