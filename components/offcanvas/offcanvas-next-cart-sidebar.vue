<template>
  <div
    :class="`cartmini__area tp-all-font-roboto ${
      nextCartStore.cartOffcanvas ? 'cartmini-opened' : ''
    }`"
  >
    <div class="cartmini__wrapper d-flex justify-content-between flex-column">
      <div class="cartmini__top-wrapper">
        <div class="cartmini__top p-relative">
          <div class="cartmini__top-title">
            <h4>Shopping cart</h4>
          </div>
          <div class="cartmini__close">
            <button
              @click="nextCartStore.handleCartOffcanvas"
              type="button"
              class="cartmini__close-btn cartmini-close-btn"
            >
              <i class="fal fa-times"></i>
            </button>
          </div>
        </div>
        <!-- <div class="cartmini__shipping">
          <cart-progress />
        </div> -->
        <div v-if="nextCartStore.cart_products?.length !== 0" class="cartmini__widget">
          <div
            v-for="item in nextCartStore.cart_products.shop_list[0].product_general"
            :key="item.product_id"
            class="cartmini__widget-item"
          >
            <div class="cartmini__thumb">
              <nuxt-link :href="`/product-details/${item.product_id}`">
                <img :src="item.product_image" alt="cart-img" width="70" height="60" />
              </nuxt-link>
            </div>
            <div class="cartmini__content">
              <h5 class="cartmini__title">
                <nuxt-link :href="`/product-details/${item.product_id}`">
                  {{ item.product_name }}
                </nuxt-link>
              </h5>
              <div class="cartmini__price-wrapper">
                <!-- <span
                  v-if="item.discount > 0 && item.quantity"
                  class="cartmini__price"
                > -->
                <span
                  v-if="true"
                  class="cartmini__price"
                >
                  <!-- ${{
                    (
                      (Number(item.price) -
                        (Number(item.price) * Number(item.discount)) / 100) *
                      item.quantity
                    ).toFixed(2)
                  }} -->
                    {{ item.real_price }}
                </span>
                <span v-else class="cartmini__price">
                  ${{item.quantity && (item.fake_price * item.quantity).toFixed(2)}}
                </span>
                <span class="cartmini__quantity">{{ " " }}x{{ item.quantity }}</span>
              </div>
            </div>
            <a
              @click="nextCartStore.removeNextCartProduct(item)"
              class="cartmini__del cursor-pointer">
              <i class="fa-regular fa-xmark"></i>
            </a>
          </div>
        </div>
        <!-- if no item in cart  -->
        <div
          v-if="nextCartStore.cart_products?.length === 0"
          class="cartmini__empty text-center"
        >
          <img
            src="/img/product/cartmini/empty-cart.png"
            alt="empty-cart-img"
          />
          <p>Your Cart is empty</p>
          <nuxt-link href="/shop" class="tp-btn">Go to Shop</nuxt-link>
        </div>
      </div>
      <div v-if="nextCartStore.cart_products?.length !== 0" class="cartmini__checkout">
        <div class="cartmini__checkout-title mb-30">
          <h4>Subtotal:</h4>
          <!-- <span>${{ nextCartStore.totalPriceQuantity.total.toFixed(2) }}</span> -->
        </div>
        <div class="cartmini__checkout-btn">
          <nuxt-link
            href="/cart"
            @click="nextCartStore.handleCartOffcanvas"
            class="tp-btn mb-10 w-100"
          >
            view cart
          </nuxt-link>
          <nuxt-link
            href="/checkout"
            @click="nextCartStore.handleCartOffcanvas"
            class="tp-btn tp-btn-border w-100"
          >
            checkout
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
  <!-- overlay start  -->
  <div
    @click="nextCartStore.handleCartOffcanvas"
    :class="`body-overlay ${nextCartStore.cartOffcanvas ? 'opened' : ''}`"
  ></div>
  <!-- overlay end  -->
</template>

<script setup lang="ts">
import { useNextCartStore } from "@/pinia/useNextCartStore";

const nextCartStore = useNextCartStore();
</script>
