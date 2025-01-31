<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>เข้าสู่ระบบ</h1>
        <p>กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div class="form-group">
          <label for="username">ชื่อผู้ใช้</label>
          <input id="username" type="text" v-model="username" required placeholder="กรอกชื่อผู้ใช้ของคุณ" />
        </div>

        <div class="form-group">
          <label for="password">รหัสผ่าน</label>
          <input id="password" type="password" v-model="password" required placeholder="กรอกรหัสผ่านของคุณ" />
        </div>

        <button type="submit" :disabled="loading" class="login-button">
          <template v-if="loading">
            <span class="spinner"></span>
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const router = useRouter()

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  if (!username.value.trim() || !password.value.trim()) {
    errorMessage.value = 'กรุณากรอกข้อมูลให้ครบถ้วน'
    loading.value = false
    return
  }

  try {
    const response = await fetch('http://localhost:4000/api2/pos_login', {
      method: 'POST',
      headers: {
        Authorization: 'Token eyJhY2NvdW50IjoiQUNDT1VOVF9TWU5DOjE3MzExNDM4MTI4NTkuODk2MjAzIiwiaWQiOiJDVVNUT01FUjoxNzMwNjg1NTY0Mzg0LjMwMzAyMCIsImdyb3VwIjoidXNlcjpjdXN0b21lciIsIm9mZmljZV9pZCI6Ik9GRklDRTowMDEiLCJkYXRlIjoxNzMxNTYwMDg5Mzc0fQ==!IcYueH98Vx4wrffC57Xh39pLSYwu4SNW0WfTzQcs75M=',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    // ตรวจสอบสถานะ HTTP
    if (!response.ok) {
      if (response.status === 401) {
        errorMessage.value = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      } else {
        errorMessage.value = `ข้อผิดพลาดจากเซิร์ฟเวอร์: ${response.statusText}`
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // ตรวจสอบโครงสร้างข้อมูลที่ได้รับ
    if (data.details.status === 'success') {
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.result.data[0].username,
          role: data.result.data[0].role,
        })
      )
      router.push('/pos')
      alert(`เข้าสู่ระบบสำเร็จ! ตำแหน่ง: ${data.result.data[0].role}`)
    } else {
      errorMessage.value = `เข้าสู่ระบบไม่สำเร็จ: ${data.details.reason}`
    }
  } catch (error) {
    console.error('Error during login:', error)
    if (!errorMessage.value) {
      errorMessage.value = 'เกิดข้อผิดพลาด: ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์'
    }
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.login-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.5s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #64748b;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input::placeholder {
  color: #94a3b8;
}

.login-button {
  width: 100%;
  padding: 0.875rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.login-button:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.login-button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.error-message {
  padding: 0.75rem;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
  animation: shake 0.5s ease-in-out;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

@media (max-width: 640px) {
  .login-card {
    padding: 1.5rem;
  }

  .login-header h1 {
    font-size: 1.5rem;
  }
}
</style>