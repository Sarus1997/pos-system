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
          <button @click="prevPage" :disabled="currentPage === 1"><i class="fas fa-chevron-left"></i> ⫷ </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"><i class="fas fa-chevron-right"></i> ⫸
          </button>
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
import { fetchProductList } from '../api/api';
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
    const data = await fetchProductList();
    if (data.details.status === 'success') {
      products.value = data.result.data.map((item) => ({
        id: item.product_id,
        name: item.product_name,
        image: item.image_url,
        price: item.price,
        category: item.category,
        quantity: item.quantity,
      }));
    } else {
      console.error('Error fetching data:', data.details.reason);
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
  background-color: #567fbd;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  color: white;
  text-align: center;
  font-weight: bold;
  font-family: 'Lato', sans-serif;
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

/* Responsive styles */
@media (max-width: 1920px) {
  .pos-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
  }

  .products-wrapper {
    flex: 1;
    margin-right: 10px;
  }

  .cart-wrapper {
    flex: 1;
  }

  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }

  .card-header {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card-body {
    padding: 10px;
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
    margin-top: 10px;
  }

  .pagination button {
    margin: 0 10px;
    padding: 10px 15px;
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
}
</style>
