<template>
  <div v-if="productDetailStatus === false && productDetail">
    <!-- breadcrumb start -->
    <product-details-next-breadcrumb 
      :product="productDetail" 
      v-if="productDetail" 
    />
    <!-- breadcrumb end -->
    <!-- product details area start -->
    <product-details-next-area 
      :product="productDetail"
      v-if="productDetail"
    />
    <!-- product details area end -->

    <!-- related products start -->
    <!-- <product-related :product-id="product.id" :category="product.category.name" /> -->
    <!-- related products end -->
  </div>
  <div v-else>
    <page-loading></page-loading>
  </div>
</template>

<script setup lang="ts">
const credentials = useCredential()
const route = useRoute();

// definePageMeta({
//   layout: false,
// });

const productDetail = ref(null);
const productDetailStatus = ref(true);

const getProductDetail = async () => {
    await $fetch(`${credentials.value.api_url}/api/backend/api/erp/get_product_detail`, {
      method: 'POST',
      body: {
        "product_id": route.params.id
      },
      onRequest(){
        productDetailStatus.value = true;
      },
      onResponse({response}){
        productDetailStatus.value = false;
        if (response._data){
          productDetail.value = response._data.data
        }
      },
      onRequestError({error}){
        console.error(error);
        productDetailStatus.value = false;
      },
      onResponseError({error}){
        console.error(error)
        productDetailStatus.value = false;
      }
    })
}

onBeforeMount(() => {
  getProductDetail();
})
</script>