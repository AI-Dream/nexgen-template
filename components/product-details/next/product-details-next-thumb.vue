<template>
  <div class="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
    <nav>
      <div
        class="nav nav-tabs flex-sm-column"
        id="productDetailsNavThumb"
        role="tablist"
      >
        <button
          v-for="(item, i) in product.list_product_image"
          :key="i"
        >
          <img :src="item.media_path" alt="nav-img" style="width: 78px; height: 100px;"/>
        </button>
      </div>
    </nav>
    <div class="tab-content m-img" id="productDetailsNavContent">
      <div>
        <div
          class="tp-product-details-nav-main-thumb"
          style="background-color: #f5f6f8"
        >
          <img 
            :src="product.list_product_image[0].media_path" 
            alt="prd-image" 
            style="width: 580px; height: 670px;"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- modal video component -->
  <!-- <modal-video v-if="product.videoId" /> -->
  <!-- modal video component -->
</template>

<script setup lang="ts">
import { type NProductBody } from "@/types/product-type";
import { useProductStore } from "@/pinia/useProductStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";
// props
defineProps<{ product: NProductBody }>();

const productStore = useProductStore();
const utilsStore = useUtilityStore();
</script>
