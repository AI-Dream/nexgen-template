import { defineStore } from "pinia";
import { useCredential } from "../composables/useCredential";

export const useUserStore = defineStore("user", () => {

  const credentials = useCredential()
  const userData = ref();

  const setUserData = (data: any) => {
    userData.value = { ...data };
  };

  const deleteUserData = () => {
    userData.value = null;
  }

  const logoutUser = () => {
    deleteUserData();
    localStorage.removeItem('accessToken');
  }

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
    deleteUserData,
    logoutUser,
  };
});

