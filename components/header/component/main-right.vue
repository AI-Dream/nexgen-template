<template>
  <div
    class="tp-header-main-right d-flex align-items-center justify-content-end"
  >
    <div class="tp-header-login d-none d-lg-block">
      <nuxt-link v-if="userStore.userData" href="/profile" class="d-flex align-items-center">
        <div class="tp-header-login-icon">
          <span>
            <SvgUser />
          </span>
        </div>
        <div class="tp-header-login-content d-none d-xl-block">
          <span>Hello, Sign In</span>
          <h5 class="tp-header-login-title">{{ userStore.userData.username }}</h5>
        </div>
      </nuxt-link>
      <nuxt-link v-else href="/login" class="d-flex align-items-center">
        <div class="tp-header-login-icon">
          <span>
            <SvgUser />
          </span>
        </div>
        <div>
            <span class="tp-header-login-title">Login</span>
        </div>
      </nuxt-link>
    </div>
    <div class="tp-header-action d-flex align-items-center ml-50">
      <div v-if="selectedPackage === 'L'"  class="tp-header-action-item d-none d-lg-block">
        <nuxt-link href="/compare" class="tp-header-action-btn">
          <svg-compare />
        </nuxt-link>
      </div>
      <div class="tp-header-action-item d-none d-lg-block">
        <nuxt-link href="/wishlist" class="tp-header-action-btn">
          <svg-wishlist />
          <span class="tp-header-action-badge">{{wishlistStore.wishlists.length}}</span>
        </nuxt-link>
      </div>
      <div class="tp-header-action-item">
        <button @click="cartStore.handleCartOffcanvas" type="button" class="tp-header-action-btn cartmini-open-btn">
          <svg-cart-bag />
          <span class="tp-header-action-badge">{{ cartStore.cart_products.length }}</span>
        </button>
      </div>
      <div class="tp-header-action-item d-lg-none">
        <button
          @click="utilsStore.handleOpenMobileMenu"
          type="button"
          class="tp-header-action-btn tp-offcanvas-open-btn"
        >
          <SvgMenuIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia/useUserStore';
import { useCartStore } from '@/pinia/useCartStore';
import { useWishlistStore } from '@/pinia/useWishlistStore';
import { useUtilityStore} from '@/pinia/useUtilityStore';

const userStore = useUserStore(); 
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilsStore = useUtilityStore();
const selectedPackage = usePackage();
</script>
