<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">เข้าสู่ระบบ</h1>
        <p class="text-gray-500">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-700">
            ชื่อผู้ใช้
          </label>
          <input id="username" type="text" v-model="username" required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ease-in-out text-gray-900 text-base"
            placeholder="กรอกชื่อผู้ใช้ของคุณ" />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">
            รหัสผ่าน
          </label>
          <input id="password" type="password" v-model="password" required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ease-in-out text-gray-900 text-base"
            placeholder="กรอกรหัสผ่านของคุณ" />
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
          <template v-if="loading">
            <span
              class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            <span>กำลังดำเนินการ...</span>
          </template>
          <template v-else>
            <span>เข้าสู่ระบบ</span>
          </template>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const response = await fetch("http://localhost:4000/api2/pos_login", {
          method: "POST",
          headers: {
            Authorization:
              "Token eyJhY2NvdW50IjoiQUNDT1VOVF9TWU5DOjE3MzExNDM4MTI4NTkuODk2MjAzIiwiaWQiOiJDVVNUT01FUjoxNzMwNjg1NTY0Mzg0LjMwMzAyMCIsImdyb3VwIjoidXNlcjpjdXN0b21lciIsIm9mZmljZV9pZCI6Ik9GRklDRTowMDEiLCJkYXRlIjoxNzMxNTYwMDg5Mzc0fQ==!IcYueH98Vx4wrffC57Xh39pLSYwu4SNW0WfTzQcs75M=",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (data.details.status === "success") {
          alert(`เข้าสู่ระบบสำเร็จ! บทบาท: ${data.result.data[0].role}`);
        } else {
          alert("เข้าสู่ระบบไม่สำเร็จ: " + data.details.reason);
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Prompt', sans-serif;
}

.min-h-screen {
  min-height: 80vh;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.p-4 {
  padding: 1rem;
}

.w-full {
  width: 100%;
}

.max-w-md {
  max-width: 28rem;
}

.bg-white {
  background-color: white;
}

.rounded-2xl {
  border-radius: 1rem;
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.p-8 {
  padding: 2rem;
}

.space-y-6>*+* {
  margin-top: 1.5rem;
}

.space-y-5>*+* {
  margin-top: 1.25rem;
}

.space-y-2>*+* {
  margin-top: 0.5rem;
}

.text-center {
  text-align: center;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.font-bold {
  font-weight: 700;
}

.text-gray-800 {
  color: #1f2937;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-gray-500 {
  color: #6b7280;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

button {
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}

button:hover:not(:disabled) {
  background-color: #1d4ed8;
}

button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>