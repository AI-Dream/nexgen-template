import { defineStore } from "pinia";
import { ref } from "vue";
import { type IProduct } from '@/types/product-type';

export const useProductStore = defineStore("product", () => {

  let activeImg = ref<string>();
  let openFilterDropdown = ref<boolean>(false);
  let openFilterOffcanvas = ref<boolean>(false);

  const products = ref([]);
  const product = ref<IProduct | null>(null);
  const isLoading = ref(false);
  const error = ref(null);
  const pagination = ref({
    currentPage: 1,
    limit: 12,
    totalPages: 0
  });

  // handle image active
  const handleImageActive = (img: string) => {
    activeImg.value = img;
  };

  // handle filter dropdown
  const handleOpenFilterDropdown = () => {
    openFilterDropdown.value = !openFilterDropdown.value;
 [0] };

  // handle filter offcanvas
  const handleOpenFilterOffcanvas = () => {
    openFilterOffcanvas.value = !openFilterOffcanvas.value;
  };

  // ดึงข้อมูลสินค้าจาก API
  const getProducts = async (options = {}) => {
    try {
      const result = await $fetch('/api/product/product-filter', {
        query: options
      })
      //@ts-ignore
      products.value = result.data.products || []
    } catch (error) {
      console.error('Error fetching products:', error)
      products.value = []
    }
  };

  const getProductDetail = async (id :number) => {
    try {
      isLoading.value = true;
      const result = await $fetch('/api/product/product-detail', {
        method: 'POST',
        body: { product_id: id },
      });
      //@ts-ignore
      const productData = result.data.product || null
      
      product.value = productData
      handleImageActive(productData.img)
      isLoading.value = false;
      
    } catch (error) {
      console.error('Error fetching product detail:', error);
      product.value = null;
      isLoading.value = false;
    }
  }

  return {
    activeImg,
    handleImageActive,
    handleOpenFilterDropdown,
    openFilterDropdown,
    openFilterOffcanvas,
    handleOpenFilterOffcanvas,

    products,
    product,
    isLoading,
    error,
    pagination,
    getProducts,
    getProductDetail,
  };
});
