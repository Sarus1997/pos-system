<template>
  <div class="product-card">
    <div class="product-image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
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
  border-radius: 15px;
  background: linear-gradient(145deg, #ffffff, #f0f4f8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  max-width: 300px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-info {
  text-align: center;
  width: 100%;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.product-card:hover .product-name {
  color: #27ae60;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #27ae60;
  margin-bottom: 0.5rem;
}

.product-quantity {
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 500;
  margin-bottom: 1rem;
}

.add-to-cart {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: 80%;
  justify-content: center;
}

.add-to-cart:hover {
  background: #219150;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(33, 145, 80, 0.3);
}

.add-to-cart:active {
  transform: translateY(0);
}

@media (max-width: 1080px) {
  .product-card {
    max-width: 90%;
    padding: 1.2rem;
  }

  .product-image-wrapper {
    height: 180px;
  }

  .product-name {
    font-size: 1.1rem;
  }

  .product-price {
    font-size: 1rem;
  }

  .add-to-cart {
    font-size: 0.95rem;
    padding: 0.75rem 1.4rem;
    width: 85%;
  }
}

@media (max-width: 768px) {
  .product-card {
    max-width: 100%;
    padding: 1rem;
  }

  .product-name {
    font-size: 1.1rem;
  }

  .product-price {
    font-size: 1rem;
  }

  .add-to-cart {
    font-size: 0.9rem;
    padding: 0.7rem 1.3rem;
    width: 90%;
  }
}
</style>
