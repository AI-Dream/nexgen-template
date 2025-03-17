<template>
  <div>
    <nuxt-layout name="default">
      <div v-if="newProductStatus === false" >
        <hero-banner-one />
        <product-electronics-top-items 
          :newProduct="newProduct" 
          :newProductStatus="newProductStatus"
        />
        <banner-area-2 />
        <blog-electronic/>
      </div>
      <div v-else>
        <page-loading></page-loading>
      </div>
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const credentials = useCredential();
const newProduct = ref(null);
const newProductStatus = ref(true);

const getNewProduct = async () => {
    await $fetch(`${credentials.value.api_url}/api/backend_2/search/product/filter`, {
      method: 'POST',
      body: {
        "role_user": "ext_buyer",
        "company_id": "-1",
        "limit": 4,
        "page": 1,
        "category": "",
        "seller_shop_id": 86,
        "orderBy": "",
        "status_product": ""
      },
      onRequest(){
        newProductStatus.value = true;
      },
      onResponse({response}){
        newProductStatus.value = false;
        if (response._data){
          newProduct.value = response._data
        }
      },
      onRequestError({error}){
        console.error(error);
        newProductStatus.value = false;
      },
      onResponseError({error}){
        console.error(error)
        newProductStatus.value = false;
      }
    })
}

onBeforeMount(() => {
  getNewProduct();
})
</script>
