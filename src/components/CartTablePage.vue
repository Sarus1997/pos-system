<template>
  <div class="cart-container">
    <h2 class="cart-title">รายการสินค้า</h2>

    <div class="table-container">
      <table class="cart-table">
        <thead>
          <tr>
            <th>สินค้า</th>
            <th>จำนวน</th>
            <th>ราคา</th>
            <th>รวม</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <div class="quantity-controls">
                <div class="quantity-buttons">
                  <button @click="updateQuantity(item, 1)" class="quantity-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button @click="updateQuantity(item, -1)" class="quantity-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <span class="quantity-value">{{ item.quantity }}</span>
              </div>
            </td>
            <td class="price">{{ formatPrice(item.price) }} ฿</td>
            <td class="price">{{ formatPrice(item.quantity * item.price) }} ฿</td>
            <td>
              <button @click="removeItem(item.id)" class="remove-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path
                    d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="cart-summary">
      <div class="total-amount">
        <span>ยอดรวมทั้งหมด:</span>
        <span class="total-price">{{ formatPrice(totalAmount) }} ฿</span>
      </div>

      <button @click="completeSale" class="complete-btn">
        ยืนยันการสั่งซื้อ
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { defineProps } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    required: true,
  }
})

import { defineEmits } from 'vue'

const emit = defineEmits(['update-cart', 'remove-item', 'complete-sale'])

const updateQuantity = (item, delta) => {
  const newQuantity = Math.max(1, item.quantity + delta)
  const updatedCart = props.cart.map(cartItem =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: newQuantity }
      : cartItem
  )
  emit('update-cart', updatedCart)
}

const removeItem = (id) => {
  emit('remove-item', id)
}

const completeSale = () => {
  emit('complete-sale')
}

const totalAmount = computed(() => {
  return props.cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
})

const formatPrice = (price) => {
  return price.toLocaleString('th-TH')
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  gap: 24px;
  flex-direction: column;
}

.cart-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.cart-title {
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 24px;
}

.cart-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 24px;
}

.cart-table th {
  background: #f7fafc;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 2px solid #e2e8f0;
}

.cart-table td {
  padding: 16px 12px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
}

.product-cell {
  display: flex;
  align-items: center;
}

.cart-item-name {
  font-weight: 500;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 32px;
  text-align: center;
  font-weight: 500;
}

.remove-btn {
  border: none;
  background: none;
  color: #e53e3e;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #fff5f5;
}

.cart-summary {
  border-top: 2px solid #e2e8f0;
  padding-top: 24px;
}

.summary-details {
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #4a5568;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.25rem;
  color: #2d3748;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.total-price {
  color: #3182ce;
}

.complete-btn {
  width: 100%;
  padding: 12px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.complete-btn:hover:not(:disabled) {
  background: #2c5282;
}

.complete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 24px 0;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image-wrapper {
  position: relative;
  padding-top: 100%;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e53e3e;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.product-price {
  font-size: 1.25rem;
  color: #3182ce;
  font-weight: 600;
  margin-bottom: 16px;
}

.add-to-cart-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2c5282;
}

.add-to-cart-btn:disabled {
  background: #e2e8f0;
  cursor: not-allowed;
}

.cart-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }

  .cart-table th,
  .cart-table td {
    padding: 8px;
  }

  .cart-item-image {
    width: 40px;
    height: 40px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>