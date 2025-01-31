<template>
  <header class="header">
    <h2 class="rgb-text">POS SYSTEM</h2>
  </header>
</template>

<style scoped>
.header {
  background-size: 300% 300%;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.rgb-text {
  background: linear-gradient(90deg,
      rgba(255, 0, 0, 0.5),
      rgba(0, 255, 0, 0.5),
      rgba(0, 0, 255, 0.5),
      rgba(255, 0, 0, 0.5));
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: color-shift 3s linear infinite;
  display: inline-block;
}

@keyframes color-shift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
