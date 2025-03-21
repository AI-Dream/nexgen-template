import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import { Body } from "../.nuxt/components";

export const useAddressStore = defineStore("address", () => {

    //maint state
    const userAddress = ref()
    const updatingRecord = ref()
    //modal
    const modalShippingCreate = ref(false);
    const modalShippingUpdate = ref(false);

    const isLoading = ref(false);

    const setUserAddress = (data: any) => {
      userAddress.value = data;
    };

    const updateUserAddress = (data: any) => {
      //@ts-ignore
      const index = userAddress.value.findIndex(address => address.id === data.id);
      
      if (index !== -1) {
        const updatedAddress = { ...userAddress.value[index], ...data };
        
        updatedAddress.detail = `บ้านเลขที่ ${updatedAddress.house_no} ` +
          `ห้องเลขที่ ${updatedAddress.room_no} ` +
          `ชั้นที่ ${updatedAddress.floor} ` +
          `อาคาร ${updatedAddress.building_name} ` +
          `หมู่บ้าน ${updatedAddress.moo_ban} ` +
          `หมู่ที่ ${updatedAddress.moo_no} ` +
          `ตรอก/ซอย ${updatedAddress.soi} ` +
          `แยก ${updatedAddress.yaek} ` +
          `ถนน ${updatedAddress.street} `;
        
        userAddress.value[index] = updatedAddress;
      }
    };

    const removeUserAddress = (id :any) => {
      //@ts-ignore
      userAddress.value = userAddress.value.filter(address => address.id !== id);
    }

    const createShippingAddress = async (body :any, resetForm :Function) => {
      if (isLoading.value) return;
      const accessToken = localStorage.getItem('accessToken')
      isLoading.value = true
      try {
        const response = await $fetch('/api/user/user-address-shipping-create',{
          method: 'POST',
          headers: {
          Authorization: `Bearer ${accessToken}`
          },
          body: body
        })
        //@ts-ignore
        if (response.code === 200 && response.result === 'SUCCESS') {
        //@ts-ignore
          setUserAddress(response.data)
          resetForm()
          closeModal('shipping-create')
          toast.success('เพิ่มที่อยู่สำเร็จ')
        } else {
          closeModal('shipping-create')
          toast.error('เกิดข้อผิดพลาดในการเพิ่มที่อยู่')
        }
      } catch(error) {
        if (error) {
          closeModal('shipping-create')
          toast.error('เกิดข้อผิดพลาดในการเพิ่มที่อยู่')
        }
      } finally {
        isLoading.value = false
      }
    }

    const updateShippingAddress = async (body :any) => {
      if (isLoading.value) return;
      const accessToken = localStorage.getItem('accessToken')
      isLoading.value = true
      try {
        const response = await $fetch('/api/user/user-address-shipping-update',{
          method: 'POST',
          headers: {
          Authorization: `Bearer ${accessToken}`
          },
          body: body
        })
        //@ts-ignore
        if (response.code === 200 && response.result === 'SUCCESS') {
        //@ts-ignore
          updateUserAddress(body)
          closeModal('shipping-update')
          toast.success('แก้ไขที่อยู่สำเร็จ')
        } else {
          closeModal('shipping-update')
          toast.error('เกิดข้อผิดพลาดในการแก้ไขที่อยู่')
        }
      } catch(error) {
        if (error) {
          closeModal('shipping-update')
          toast.error('เกิดข้อผิดพลาดในการแก้ไขที่อยู่')
        }
      } finally {
        isLoading.value = false
      }
    }

    const deleteShippingAddress = async (id :any) => {
      if (isLoading.value) return;
      const accessToken = localStorage.getItem('accessToken')
      isLoading.value = true
      try {
        const response = await $fetch('/api/user/user-address-shipping-delete',{
          method: 'POST',
          headers: {
          Authorization: `Bearer ${accessToken}`
          },
          body: { id: id }
        })
        //@ts-ignore
        if (response.code === 200 && response.result === 'SUCCESS') {
          removeUserAddress(id)
          toast.error('ลบที่อยู่สำเร็จ')
        } else {
          toast.error('เกิดข้อผิดพลาดในการลบที่อยู่')
        }
      } catch(error) {
        if (error) {
          toast.error('เกิดข้อผิดพลาดในการลบที่อยู่')
        }
      } finally {
        isLoading.value = false
      }
    }

    const openModal = async (type : string, data :any) => {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
      
      if (type === 'shipping-create') {
        modalShippingCreate.value = true
      } else if (type === 'shipping-update') {
        updatingRecord.value = data;
        modalShippingUpdate.value = true;
      } 
    }

    const closeModal = async (type : string) => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      if (type === 'shipping-create') {
        modalShippingCreate.value = false
      } else if (type === 'shipping-update') {
        modalShippingUpdate.value = false
        updatingRecord.value = null;
      } 
    }

    return {
      userAddress,
      setUserAddress,
      createShippingAddress,
      updateShippingAddress,
      deleteShippingAddress,
      openModal,
      closeModal,
      updatingRecord,
      modalShippingCreate,
      modalShippingUpdate,
      isLoading,
    };
  });
  