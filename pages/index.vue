<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- hero banner start -->
      <hero-banner-one />
      <!-- hero banner end -->

      <!-- category start -->
      <categories-electronic />
      <!-- category end -->

      <!-- feature area start -->
      <feature-one />
      <!-- feature area end -->

      <!-- product area start -->
      <product-electronics-top-items v-if="newProduct != null" :newProduct="newProduct"/>
      <!-- product area end -->

      <!-- banner area start -->
      <banner-area />
      <!-- banner area en -->

      <!-- offer product start -->
      <product-electronics-offer-items />
      <!-- offer product end -->

      <!-- product gadget area start -->
      <product-electronics-gadget-items />
      <!-- product gadget area end -->

      <!-- product banner start -->
      <banner-area-2 />
      <!-- product banner end -->

      <!-- product new arrivals area start -->
      <product-electronics-new-arrivals />
      <!-- product new arrivals area end -->

      <!-- product sm items start -->
      <product-electronics-sm-items />
      <!-- product sm items end -->

      <!-- blog item start -->
      <blog-electronic/>
      <!-- blog item end -->

      <!-- instagram area start -->
      <instagram-area-1/>
      <!-- instagram area end -->

      <!-- subscribe area start -->
      <subscribe-1/>
      <!-- subscribe area end -->
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia/useUserStore';
const userStore = useUserStore();
const newProduct = ref(null);
definePageMeta({
  layout: false,
});

const getNewProduct = async () => {
  await $fetch(`${userStore.credentials.api_url}/api/backend_2/search/product/filter`, {
    method: 'POST',
    body: {
      "role_user": "ext_buyer",
      "company_id": "-1",
      "limit": 10,
      "page": 1,
      "category": "",
      "seller_shop_id": 86,
      "orderBy": "",
      "status_product": ""
    },
    onResponse({response}){
      if (response._data){
        newProduct.value = response._data
      }
    }
  })
}

onMounted(() => {
  getNewProduct();
})
</script>
