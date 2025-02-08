<template>
  <div class="pos-container">
    <!-- Products Section -->
    <section class="products-section">
      <div class="card products-card">
        <div class="card-header">
          <div class="header-content">
            <h2 class="header-title">{{ $t('pos_title') }}</h2>
            <div class="search-container">
              <input type="text" v-model="searchQuery" :placeholder="$t('pos_search_product')" class="search-input">
              <span class="search-icon">🔍</span>
            </div>
          </div>
        </div>

        <div class="card-body">
          <TransitionGroup name="products" tag="div" class="products-grid">
            <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product"
              @add-to-cart="addToCart" class="product-item" />
          </TransitionGroup>

          <div class="pagination-container">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn"
              :class="{ 'disabled': currentPage === 1 }">
              <span class="arrow">←</span> {{ $t('prev_page') }}
            </button>

            <div class="page-numbers">
              <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" class="page-number"
                :class="{ 'active': currentPage === page }">
                {{ page }}
              </button>
            </div>

            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn"
              :class="{ 'disabled': currentPage === totalPages }">
              {{ $t('next_page') }} <span class="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Cart Section -->
    <section class="cart-section">
      <div class="card cart-card">
        <div class="card-header">
          <div class="header-content">
            <h2 class="header-title">{{ $t('pos_cart_title') }}</h2>
            <div v-if="cartTotal" class="cart-total">
              <span class="total-label">{{ $t('pos_cart_total') }}:</span>
              <span class="total-amount">{{ formatPrice(cartTotal) }} บาท</span>
            </div>
          </div>
        </div>

        <div class="card-body">
          <TransitionGroup name="cart-items">
            <CartTable :cart="cart" @update-cart="updateCart" @remove-item="removeItem" @complete-sale="completeSale" />
          </TransitionGroup>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { fetchProductList } from '../api/api';
import ProductCard from '../components/ProductCardPage.vue';
import CartTable from '../components/CartTablePage.vue';

import { useI18n } from 'vue-i18n'
const { t } = useI18n(); // ✅ ใช้ useI18n เพื่อเข้าถึง `t` = translate

// State
const products = ref([]);
const cart = ref([]);
const currentPage = ref(1);
const searchQuery = ref('');
const itemsPerPage = 6;

// Computed
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return products.value;

  return products.value.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const displayedPages = computed(() => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      i >= currentPage.value - delta &&
      i <= currentPage.value + delta
    ) {
      range.push(i);
    }
  }

  range.forEach(i => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
});

const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('th-TH').format(price);
};

const addToCart = (product) => {
  const item = cart.value.find(item => item.id === product.id);
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
  cart.value = cart.value.filter(item => item.id !== productId);
};

const completeSale = () => {
  if (cart.value.length === 0) {
    alert(t('pos_cart_alert'));
    return;
  }

  const total = formatPrice(cartTotal.value);
  alert(t('pos_cart_success_total') + `${total}` + t('pos_cart_bath'));
  cart.value = [];
};

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Watchers
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(async () => {
  try {
    const data = await fetchProductList();
    if (data.details.status === 'success') {
      products.value = data.result.data.map(item => ({
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
.pos-container {
  display: flex;
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}

@media (min-width: 1080px) {
  .pos-container {
    grid-template-columns: 4fr 2fr;
  }
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 10px 20px;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-title {
  font-size: 20px;
  font-weight: 300;
  margin: 0;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.3);
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
}

.card-body {
  padding: 1.5rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 300;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:not(.disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  padding: 0.5rem 1rem;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-number.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.cart-total {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.total-label {
  font-size: 1rem;
  opacity: 0.9;
}

.total-amount {
  font-size: 1.25rem;
  font-weight: 600;
}

.products-enter-active,
.products-leave-active {
  transition: all 0.3s ease;
}

.products-enter-from,
.products-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.cart-items-enter-active,
.cart-items-leave-active {
  transition: all 0.3s ease;
}

.cart-items-enter-from,
.cart-items-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 768px) {
  .pos-container {
    padding: 1rem;
    gap: 1rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    max-width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>