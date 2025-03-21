<template>
  <div v-if="productStore.product">
      <!-- breadcrumb start -->
      <product-details-breadcrumb :product="productStore.product" />
      <!-- breadcrumb end -->

      <!-- product details area start -->
      <product-details-area :product="productStore.product" />
      <!-- product details area end -->

      <!-- related products start -->
      <product-related :product-id="productStore.product.id" :category="productStore.product.category.name" />
      <!-- related products end -->
  </div>
  <div v-show="productStore.isLoading">
    <PageLoading></PageLoading>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Product Details Page" });

import { useProductStore } from '@/pinia/useProductStore';

const route = useRoute()
const productStore = useProductStore();

onMounted(() => {
  productStore.getProductDetail(route.params.id as any)
});
</script>
