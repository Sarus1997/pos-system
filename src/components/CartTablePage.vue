<template>
  <div class="cart-container">
    <div class="cart-table">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.name }}</td>
            <td><input type="number" v-model.number="item.quantity" class="quantity-input" /></td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity * item.price }}</td>
            <td><button @click="$emit('remove-item', item.id)" class="remove-btn">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="$emit('complete-sale')" class="complete-sale-btn">Complete Sale</button>
  </div>
</template>

<script>
export default {
  props: ['cart'],
};
</script>

<style scoped>
.cart-container {
  max-width: 100%;
  margin-top: 4rem;
  margin-right: 2rem;
  padding: 2rem;
  background-color: #f7fafc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.cart-table {
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #4a5568;
}

tr:last-child td {
  border-bottom: none;
}

.quantity-input {
  width: 3rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-align: center;
}

.remove-btn,
.complete-sale-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
}

.remove-btn {
  background-color: #fed7d7;
  color: #e53e3e;
}

.remove-btn:hover {
  background-color: #feb2b2;
}

.complete-sale-btn {
  background-color: #48bb78;
  color: white;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

.complete-sale-btn:hover {
  background-color: #38a169;
}

@media (max-width: 640px) {
  .cart-container {
    padding: 1rem;
  }

  .cart-table {
    overflow-x: scroll;
  }

  table {
    width: 100vw;
  }

  th,
  td {
    white-space: nowrap;
  }
}
</style>
