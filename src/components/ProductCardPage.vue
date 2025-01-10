<template>
  <div class="product-card">
    <div class="product-image-wrapper">
      <img :src="product.image" alt="product.name" class="product-image" />
    </div>
    <div class="product-info">
      <p class="product-name">{{ product.name }}</p>
      <p class="product-price">{{ product.price }} THB</p>
      <p class="product-quantity">{{ product.quantity }} in stock</p>
    </div>
    <button class="add-to-cart" @click="$emit('add-to-cart', product)">
      <i class="fas fa-shopping-cart"></i>
      Add to Cart
    </button>
  </div>
</template>

<script setup>
defineProps(['product']);
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  margin-top: 10px;
  margin-left: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f7f9fc;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.product-image-wrapper:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  text-align: center;
}

.product-price {
  font-size: 1.25rem;
  color: #48bb78;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.product-quantity {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  text-align: center;
}

.add-to-cart {
  background-color: #48bb78;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-to-cart:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.add-to-cart:active {
  transform: translateY(0);
}

@media (max-width: 1920px) {
  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #f7f9fc;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    max-width: 230px;
  }

  .product-image-wrapper {
    height: 170px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-price {
    font-size: 10px;
  }

  .add-to-cart {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    font-size: 12px;
  }
}
</style>
