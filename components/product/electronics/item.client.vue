<template>
  <div :class="`${offer_style ? 'tp-product-offer-item' : 'mb-25'} tp-product-item transition-3`">
    <div class="tp-product-thumb p-relative fix m-img">
      <nuxt-link :href="`/product-details/${item.id}`" style="width: 300px; height: 300px; overflow: hidden;">
        <img :src="item.images_URL[0]" alt="product-electronic" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;"/>
      </nuxt-link>

      <!-- product badge -->
      <!-- <div class="tp-product-badge">
        <span v-if="item.status === 'out-of-stock'" class="product-hot">out-of-stock</span>
      </div> -->

      <!-- product action -->
      <div class="tp-product-action">
        <div class="tp-product-action-item d-flex flex-column">
          <button
            v-if="!isItemInCart(item)"
            @click="cartStore.addCartProduct(item)"
            type="button"
            :class="`tp-product-action-btn tp-product-add-cart-btn ${
              isItemInCart(item) ? 'active' : ''
            }`"
          >
            <svg-add-cart />
            <span class="tp-product-tooltip">Add to Cart</span>
          </button>
          <nuxt-link
            v-if="isItemInCart(item)"
            href="/cart"
            :class="`tp-product-action-btn tp-product-add-cart-btn ${isItemInCart(item)? 'active': ''}`"
          >
            <svg-add-cart />
            <span class="tp-product-tooltip">View Cart</span>
          </nuxt-link>

          <button
            type="button"
            class="tp-product-action-btn tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.id}`,item)"
          >
            <svg-quick-view />
            <span class="tp-product-tooltip">Quick View</span>
          </button>
          <button
            @click="wishlistStore.add_wishlist_product(item)"
            type="button"
            :class="`tp-product-action-btn tp-product-add-to-wishlist-btn ${isItemInWishlist(item)? 'active': ''}`"
          >
            <svg-wishlist />
            <span class="tp-product-tooltip">
              {{ isItemInWishlist(item) ? 'Remove From Wishlist' : 'Add To Wishlist'}}
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- product content -->
    <div class="tp-product-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${item.id}`"></nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${item.id}`" class="text-truncate" style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ item.name }}</nuxt-link>
      </h3>
      <div class="tp-product-rating d-flex align-items-center">
        <div class="tp-product-rating-icon">
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star-half-stroke"></i></span>
        </div>
        <div class="tp-product-rating-text">
          {{ item.review || '15' }}
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <div v-if="item.id % 2 === 0">
          <span class="tp-product-price old-price">{{ item.real_price }}฿</span>
          <span class="tp-product-price new-price">
            {{ (item.real_price * 0.01).toFixed(2) }}฿
          </span>
        </div>
        <span v-else class="tp-product-price new-price">{{ item.net_price }}฿</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";
import { type NProduct } from "@/types/product-type";

const props = defineProps<{ item: NProduct; offer_style?: boolean }>();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();

function isItemInWishlist(product: NProduct) {
  return wishlistStore.wishlists.some((prd) => Number(prd.id) === product.id);
}
function isItemInCart(product: NProduct) {
  return cartStore.cart_products.some((prd) => Number(prd.id) === product.id);
}
</script>
