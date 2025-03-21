import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import { useCartStore } from "./useCartStore";
import { useAddressStore } from "./useAddressStore";

export const useUserStore = defineStore("user", () => {

  const route = useRoute()
  const cartStore = useCartStore()
  const addressStore = useAddressStore()

  const userData = ref();
  const loading = ref(true);

  const setUserData = (data: any) => {
    userData.value = { ...data };
  };

  const deleteUserData = () => {
    userData.value = null;
  }

  const loginUser = async (requestBody: object) => {
    await $fetch('/api/auth/login',{
      method: 'POST',
      body: requestBody,
      onRequest(){
          loading.value = true;
        },
        onResponse({response}){
          if (response._data.code === 200) {
            localStorage.setItem('accessToken', response._data.data.access_token);
            setUserData(response._data.data)
            if (route.query.redirectTo){
              if (typeof route.query.redirectTo === 'string') {
                navigateTo(route.query.redirectTo);
              }
            } else {
              navigateTo('/')
            }
            navigateTo('/')
            loading.value = false
          } else if (response._data.code === 400 && response._data.message === 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง') {
            toast.error('อีเมลหรือหรัสผ่านไม่ถูกต้อง');
          } else {
            toast.error('เกิดข้อผิดพลาดลองใหม่อีกครั้งภายหลัง');
          }
        }
    })
  }

  const logoutUser = () => {
    deleteUserData();
    localStorage.removeItem('accessToken');
  }

  const getUserData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      try {
        await $fetch('/api/user/user-detail', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          onResponse({ response }) {
            if (response._data.code === 200) {
              setUserData(response._data.data);
            }
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  
  const getUserCart = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const result = await $fetch('/api/user/user-cart', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
          });
          //@ts-ignore
          cartStore.cart_products = result.data.product || [];
        
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    }
  }

  const getUserAddress = async () => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      try {
        await $fetch('/api/user/user-address', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          onResponse({ response }) {
            if (response._data.code === 200) {
              addressStore.setUserAddress(response._data.data);
            }
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }

  onMounted(async ()=>{
    loading.value = true;
    await getUserData()
    await getUserCart()
    await getUserAddress()
    loading.value = false;
  })

  return {
    userData,
    setUserData,
    getUserData,
    deleteUserData,
    loginUser,
    logoutUser,
    loading,
  };
});

