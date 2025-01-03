<!-- <template>
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
import ProductCard from '../components/ProductCardPage.vue';
import CartTable from '../components/CartTablePage.vue';

export default {
  components: { ProductCard, CartTable },
  data() {
    return {
      products: [
        { id: 1, name: 'Apple', price: 50 },
        { id: 2, name: 'Banana', price: 20 },
        { id: 3, name: 'Orange', price: 30 },
        { id: 4, name: 'Apple', price: 50 },
        { id: 5, name: 'Banana', price: 20 },
        { id: 6, name: 'Orange', price: 30 },
      ],
      cart: [],
    };
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
</style> -->
