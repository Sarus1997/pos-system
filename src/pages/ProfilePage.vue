<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1 class="title">ข้อมูลผู้ใช้</h1>
      </div>

      <div class="form-group">
        <label for="username" class="label">ชื่อผู้ใช้</label>
        <input id="username" type="text" v-model="username" :readonly="!isEditing" class="input"
          placeholder="กรอกชื่อผู้ใช้ของคุณ" />
      </div>

      <div class="form-group">
        <label for="password" class="label">รหัสผ่าน</label>
        <input id="password" type="text" v-model="password" :readonly="!isEditing" class="input"
          placeholder="กรอกรหัสผ่านของคุณ" />
      </div>

      <div class="form-group">
        <label for="role" class="label">ตำแหน่ง</label>
        <input id="role" type="text" v-model="role" :readonly="!isEditing" class="input"
          placeholder="กรอกตำแหน่งของคุณ" />
      </div>

      <div class="buttons">
        <button v-if="!isEditing" @click="enableEdit" class="btn btn-primary">
          แก้ไขข้อมูล
        </button>
        <button v-if="isEditing" @click="saveChanges" class="btn btn-primary">
          บันทึกข้อมูล
        </button>
        <button @click="handleLogout" class="btn btn-secondary">ออกจากระบบ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const role = ref("");
const isEditing = ref(false);
const userId = ref("");

const enableEdit = () => {
  isEditing.value = true;
};

const saveChanges = async () => {
  try {
    const response = await fetch("http://localhost:4000/api2/update_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId.value,
        username: username.value,
        role: role.value,
        password: password.value,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
      isEditing.value = false;
    } else {
      console.error("Error updating user:", result);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
  }
};

const handleLogout = () => {
  localStorage.removeItem("user");
  router.push("/login");
};

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    userId.value = user.user_id || ""; // กำหนด user_id
    username.value = user.username;
    role.value = user.role;
  }
});
</script>

<style scoped>
.container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 24px;
  text-align: center;
}

.header {
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 8px;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
  color: #1e293b;
  outline: none;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.btn {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #1e293b;
  border: none;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
}

.btn:active {
  transform: scale(0.98);
}
</style>
