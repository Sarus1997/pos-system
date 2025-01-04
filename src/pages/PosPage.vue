<template>
  <div class="pos-page">
    <div class="products-wrapper card">
      <div class="card-header">Products</div>
      <div class="card-body">
        <div class="products">
          <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product"
            @add-to-cart="addToCart" />
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1"><i class="fas fa-chevron-left"></i> Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next <i
              class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
    <div class="cart-wrapper card">
      <div class="card-header">Cart</div>
      <div class="card-body">
        <CartTable :cart="cart" @update-cart="updateCart" @remove-item="removeItem" @complete-sale="completeSale" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ProductCard from '../components/ProductCardPage.vue';
import CartTable from '../components/CartTablePage.vue';

const products = ref([]);
const cart = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

const addToCart = (product) => {
  const item = cart.value.find((item) => item.id === product.id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
};

const updateCart = (updatedCart) => {
  cart.value = updatedCart;
};

const removeItem = (productId) => {
  cart.value = cart.value.filter((item) => item.id !== productId);
};

const completeSale = () => {
  const total = cart.value.reduce((sum, item) => sum + item.quantity * item.price, 0);
  alert(`Sale completed! Total: ${total} THB`);
  cart.value = [];
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(async () => {
  try {
    const response = await axios.post('http://localhost:4000/api2/get_all_product', {
      filter: {},
    }, {
      headers: {
        Authorization: 'Token eyJhY2NvdW50IjoiQUNDT1VOVF9TWU5DOjE3MzExNDM4MTI4NTkuODk2MjAzIiwiaWQiOiJDVVNUT01FUjoxNzMwNjg1NTY0Mzg0LjMwMzAyMCIsImdyb3VwIjoidXNlcjpjdXN0b21lciIsIm9mZmljZV9pZCI6Ik9GRklDRTowMDEiLCJkYXRlIjoxNzMxNTYwMDg5Mzc0fQ==!IcYueH98Vx4wrffC57Xh39pLSYwu4SNW0WfTzQcs75M=',
      },
    });
    console.log('API response:', response.data);
    if (response.data.details.status === 'success') {
      products.value = response.data.result.data.map((item) => ({
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
});
</script>

<style scoped>
.pos-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
}

.products-wrapper {
  flex: 1;
  margin-right: 1rem;
}

.cart-wrapper {
  flex: 1;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.card-header {
  background-color: #f7fafc;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 1rem;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.pagination button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #48bb78;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
