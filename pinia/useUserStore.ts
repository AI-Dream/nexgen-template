import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig();
  // const token = ref(localStorage.getItem('accessToken')); 

  const credentials = ref({
    config : config,
    api_url : 'https://uatinet-eprocurement.one.th',
    api_key : {
        'api-key': config.public.API_KEY || 'undefined',
        'api-secret': config.API_SECRET || 'undefined'
    }
  });

  const userData = ref();

  const setUserData = (data: any) => {
    userData.value = { ...data };
  };

  const getUserData = async () => {
    const accessToken = ref(localStorage.getItem('accessToken')); 
    if (accessToken.value) {      
      await $fetch(`${credentials.value.api_url}/api/backend/api/erp/get_user_detail`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          ...credentials.value.api_key
        },
        onResponse({response}){
          if (response._data.code === 200) {
            userData.value = response._data.data
          }
        }
      });
    }
  };

  return {
    credentials,
    userData,
    setUserData,
    getUserData,
  };
});

