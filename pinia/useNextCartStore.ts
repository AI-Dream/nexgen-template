import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import { type NProductBody } from "@/types/product-type";

export const useNextCartStore = defineStore("next_cart_product", () => {

    const credentials = useCredential();
    let cart_loading = ref<boolean>(true);
    let cart_products = ref<any>();
    let orderQuantity = ref<number>(1);
    let cartOffcanvas = ref<boolean>(false);

    const addNextCartProduct = async (payload: NProductBody) => {
        const accessToken = ref(localStorage.getItem('accessToken'));
        await $fetch(`${credentials.value.api_url}/api/backend/api/erp/add_to_cart`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
                ...credentials.value.api_key
            },
            body: {
                "quantity": orderQuantity.value,
                "product_id": payload.product_detail.product_id,
                "seller_shop_id": payload.product_detail.seller_shop_id,
                "attribute_option_1": "",
                "attribute_option_2": "",
                "role_user": "ext_buyer"
            },
            onResponse({ response }) {
                initializeCartProducts()
                if (response._data.code === 200) {
                    toast.success('เพิ่มสินค้าลงตระกร้าสำเร็จ')
                }
            }
        })
    }

    const removeNextCartProduct = async (item: any) => {
        const accessToken = ref(localStorage.getItem('accessToken'));
        await $fetch(`${credentials.value.api_url}/api/backend/api/erp/delete_to_cart`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
                ...credentials.value.api_key
            },
            body: {
                "seller_shop_id": 86,
                "role_user": "ext_buyer",
                "product_to_delete": [{
                    product_id: item.product_id,
                    product_attribute_detail: {
                        product_attribute_id: "-1"
                    }
                }],
                "pay_type": "general",
                "company_id": "-1",
                "company_position": "-1",
                "com_perm_id": "-1"
            }
            ,
            onResponse({ response }) {
                initializeCartProducts()
                if (response._data.code === 200) {
                    toast.success('ลบสินค้าในตระกร้าสำเร็จ')
                }
            }
        })
    }

    const initializeCartProducts = async () => {
        const accessToken = ref(localStorage.getItem('accessToken'));
        await $fetch(`${credentials.value.api_url}/api/backend/api/erp/detail_cart`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
                ...credentials.value.api_key
            },
            body: {
                "role_user": "ext_buyer"
            },
            onRequest(){
                cart_loading.value = true;
            },
            onResponse({ response }) {
                cart_loading.value = false;
                cart_products.value = response._data.data
                console.log(cart_products.value);
                
            }
        })
    };

    const handleCartOffcanvas = () => {
        cartOffcanvas.value = !cartOffcanvas.value
    }
    
    onMounted(() => {
        initializeCartProducts();
    });
    
    return {
        addNextCartProduct,
        removeNextCartProduct,
        handleCartOffcanvas,
        cartOffcanvas,
        orderQuantity,
        cart_products,
        cart_loading,
    }
})
