<template>
  <section class="tp-product-area pb-55">
    <div class="container">
      <div class="row align-items-end">
        <div class="col-xl-5 col-lg-6 col-md-5">
          <div class="tp-section-title-wrapper mb-40">
            <h3 class="tp-section-title">Trending Products
              <SvgSectionLine />
            </h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="tp-product-tab-content">
            <div class="row">
              <div v-for="(item,i) in productStore.products" :key="i" class="col-xl-3 col-lg-3 col-sm-6">
                <ProductElectronicsItem :item="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '@/pinia/useProductStore';
import { useUserStore } from '@/pinia/useUserStore';
const productStore = useProductStore();
const userStore = useUserStore()

onMounted(async () => {
  await productStore.getProducts({
      limit: 4
    });
});
</script>
