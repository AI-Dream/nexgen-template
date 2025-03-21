import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import type { IProduct } from "@/types/product-type";
import { useUserStore } from "./useUserStore";

export const useCartStore = defineStore("cart_product", () => {
  const route = useRoute();
  const userStore = useUserStore();

  let cart_products = ref<IProduct[]>([]);
  let orderQuantity = ref<number>(1);
  let cartOffcanvas = ref<boolean>(false);
  
  // add_cart_product
  const addCartProduct = async (payload: IProduct) => {
    if (!userStore.userData) return navigateTo('/');

    const accessToken = localStorage.getItem('accessToken');
    const isExist = cart_products.value.some((i) => i.id === payload.id);
      if(payload.status === 'out-of-stock'){
        toast.error(`Out of stock ${payload.title}`);
      }
      else if (!isExist) {
        const newItem = {
          ...payload,
          orderQuantity: orderQuantity.value,
        };
        const response = await addCartToDatabase(newItem, accessToken);
        //@ts-ignore
        if (response.code === 200 && response.result === 'SUCCESS'){
          cart_products.value.push(newItem);
          toast.success(`${orderQuantity.value}x ${payload.title} added to cart`);
        }
      } else {
        cart_products.value.map(async(item) => {
          if (item.id === payload.id) {
            if (typeof item.orderQuantity !== "undefined") {
              if (payload.quantity >= item.orderQuantity + orderQuantity.value) {
                const updateItem = {
                  ...payload,
                  orderQuantity: orderQuantity.value + item.orderQuantity,
                }
                const response = await updateCartInDatabase(updateItem, accessToken);
                //@ts-ignore
                if (response.code === 200 && response.result === 'SUCCESS'){
                  item.orderQuantity = orderQuantity.value !== 1 ? orderQuantity.value + item.orderQuantity : item.orderQuantity + 1;
                  toast.success(
                    `${orderQuantity.value}x ${item.title} added to cart`
                  );
                }
              } else {
                toast.error(`No more quantity available for this product!`);
                orderQuantity.value = 1;
              }
            }
          }
          return { ...item };
        });
      }
  };

  // quantity increment
  const increment = () => {
   return orderQuantity.value = orderQuantity.value + 1;
  }

  // quantity decrement
  const decrement = () => {
   return orderQuantity.value =
      orderQuantity.value > 1
        ? orderQuantity.value - 1
        : (orderQuantity.value = 1);
  }

  // quantityDecrement
  const quantityDecrement = (payload: IProduct) => {
    const accessToken = localStorage.getItem('accessToken')
    cart_products.value.map(async(item) => {
      if (item.id === payload.id) {
        if (typeof item.orderQuantity !== "undefined") {
          if (item.orderQuantity > 1) {
            const updateItem = {
              ...payload,
              orderQuantity: item.orderQuantity - 1
            }
            const response = await updateCartInDatabase(updateItem, accessToken);
            //@ts-ignore
            if (response.code === 200 && response.result === 'SUCCESS'){
              item.orderQuantity = item.orderQuantity - 1;
              toast.info(`Decrement Quantity For ${item.title}`);
            }
          }
        }
      }
      return { ...item };
    });
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  // remover_cart_products
  const removeCartProduct = async (payload: IProduct) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await removeCartFromDatabase(payload, accessToken)
    //@ts-ignore
    if (response.code === 200 && response.result === 'SUCCESS'){
      cart_products.value = cart_products.value.filter(
        (p) => p.id !== payload.id
      );
      toast.error(`${payload.title} remove to cart`);
      localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
    }
  };

  const addCartToDatabase = async (payload: IProduct, accessToken: string | null) => {
    try {
      const response = await $fetch('/api/product/cart-add',{
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        body: payload,
      })
      return response

    } catch(error) {
      throw error;
    }
  }

  const updateCartInDatabase = async (payload: IProduct, accessToken: string | null) => {
    try {
      const response = await $fetch('/api/product/cart-update',{
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        body: payload,
      })
      return response

    } catch(error) {
      throw error;
    }
  }

  const removeCartFromDatabase = async (payload: IProduct, accessToken: string | null) => {
    try {
      const response = await $fetch('/api/product/cart-remove',{
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        body: payload,
      })
      return response

    } catch(error) {
      throw error;
    }
  }

  // clear cart
  const clear_cart = () => {
    const confirmMsg = window.confirm(
      "Are you sure deleted your all cart items ?"
    );
    if (confirmMsg) {
      cart_products.value = [];
    }
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  // initialOrderQuantity
  const initialOrderQuantity = () => {
   return orderQuantity.value = 1;
  };

  // totalPriceQuantity
  const totalPriceQuantity = computed(() => {
    return cart_products.value.reduce(
      (cartTotal, cartItem) => {
        const { price, discount, orderQuantity } = cartItem;
        if (typeof orderQuantity !== "undefined") {
          const itemDiscount = 1 - ( discount / 100 )
          const itemTotal = ( price * itemDiscount ) * orderQuantity
          cartTotal.quantity += orderQuantity;
          cartTotal.total += itemTotal;
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    )
  });

  //handle cartOffcanvas
  const handleCartOffcanvas = () => {
    cartOffcanvas.value = !cartOffcanvas.value
  }

  // when router change than order quantity will be 1
  watch(() => route.path, () => {
    orderQuantity.value = 1
  })
  return {
    addCartProduct,
    cart_products,
    quantityDecrement,
    removeCartProduct,
    clear_cart,
    initialOrderQuantity,
    totalPriceQuantity,
    handleCartOffcanvas,
    cartOffcanvas,
    orderQuantity,
    increment,
    decrement,
  };
});
