<template>
  <div class="pos-page">
    <div class="products-wrapper">
      <div class="products">
        <ProductCard v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart" />
      </div>
    </div>
    <div class="cart-wrapper">
      <CartTable :cart="cart" @update-cart="updateCart" @remove-item="removeItem" @complete-sale="completeSale" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductCard from '../components/ProductCardPage.vue';
import CartTable from '../components/CartTablePage.vue';

export default {
  components: { ProductCard, CartTable },
  data() {
    return {
      products: [],
      cart: [],
    };
  },
  async created() {
    try {
      const response = await axios.post('http://localhost:4000/api2/get_all_product', {
        filter: {},
      }, {
        headers: {
          Authorization: 'Token eyJhY2NvdW50IjoiQUNDT1VOVF9TWU5DOjE3MzExNDM4MTI4NTkuODk2MjAzIiwiaWQiOiJDVVNUT01FUjoxNzMwNjg1NTY0Mzg0LjMwMzAyMCIsImdyb3VwIjoidXNlcjpjdXN0b21lciIsIm9mZmljZV9pZCI6Ik9GRklDRTowMDEiLCJkYXRlIjoxNzMxNTYwMDg5Mzc0fQ==!IcYueH98Vx4wrffC57Xh39pLSYwu4SNW0WfTzQcs75M=',
        },
      });
      console.log('API response:', response.data); // ตรวจสอบข้อมูลที่ได้จาก API
      if (response.data.details.status === 'success') {
        this.products = response.data.result.data.map((item) => ({
          id: item.product_id,
          name: item.product_name,
          price: item.price,
          image: item.image_url,
        }));
      } else {
        console.error('Error fetching data:', response.data.details.reason);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  },
  methods: {
    addToCart(product) {
      const item = this.cart.find((item) => item.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    updateCart(updatedCart) {
      this.cart = updatedCart;
    },
    removeItem(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    completeSale() {
      const total = this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
      alert(`Sale completed! Total: ${total} THB`);
      this.cart = [];
    },
  },
};
</script>

<style scoped>
.pos-page {
  display: flex;
}

.products-wrapper {
  flex: 1;
}

.cart-wrapper {
  flex: 1;
  padding-left: 1rem;
}

.products {
  display: flex;
  flex-wrap: wrap;
}
</style>
