<template>
  <PageLoading v-show="userStore.loading"/>
  <NuxtLayout v-if="!userStore.loading">
    <NuxtLoadingIndicator/>
    <NuxtPage />
    <modal-product/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProductFilterStore } from './pinia/useProductFilterStore';
import { useUserStore } from './pinia/useUserStore';
import { useUtilityStore } from './pinia/useUtilityStore';

const route = useRoute();
const prdFilterStore = useProductFilterStore();
const utilsStore = useUtilityStore();

watch(() => route.path, () => {
  prdFilterStore.$reset
  prdFilterStore.handleResetFilter();
  utilsStore.removeBackdrop();
})

const userStore = useUserStore()
</script>
