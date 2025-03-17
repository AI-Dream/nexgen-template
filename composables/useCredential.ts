export const useCredential = () => useState('credentials', () => ({
    config: useRuntimeConfig(),
    api_url: 'https://uatinet-eprocurement.one.th',
    api_key: {
        'api-key': useRuntimeConfig().public.API_KEY || 'undefined',
        'api-secret': useRuntimeConfig().API_SECRET || 'undefined'
    }
}));