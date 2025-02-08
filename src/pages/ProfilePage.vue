<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1 class="title">{{ $t('title_profile') }}</h1>
        <p class="subtitle">{{ $t('subtitle_profile') }}</p>
      </div>

      <div class="profile-section">
        <div class="avatar-container">
          <img :src="avatar || '/api/placeholder/120/120'" class="avatar" :class="{ 'avatar-disabled': !isEditing }" />
          <div v-if="isEditing" class="avatar-overlay">
            <label for="avatar" class="avatar-upload">
              <input id="avatar" type="file" @change="handleAvatarChange" class="input avatar-input" accept="image/*" />
              <span>{{ $t('upload_avatar') }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="form-sections">
        <div class="section">
          <h2 class="section-title">{{ $t('profile_section_title') }}</h2>
          <div class="form-group">
            <label for="username" class="label">{{ $t('username') }}</label>
            <div class="input-group">
              <span class="input-icon">@</span>
              <input id="username" type="text" v-model="username" :readonly="!isEditing" class="input with-icon"
                placeholder="{{ $t('ple_name') }}" />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="label">{{ $t('password') }}</label>
            <div class="input-group">
              <span class="input-icon">🔒</span>
              <input id="password" type="password" v-model="password" :readonly="!isEditing" class="input with-icon"
                placeholder="{{ $t('ple_password') }}" />
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="label">{{ $t('email') }}</label>
            <div class="input-group">
              <span class="input-icon">✉️</span>
              <input id="email" type="email" v-model="email" :readonly="!isEditing" class="input with-icon"
                placeholder="example@email.com" />
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">{{ $t('personal_section_title') }}</h2>
          <div class="form-row">
            <div class="form-group half">
              <label for="first_name" class="label">{{ $t('profile_personal_name') }}</label>
              <input id="first_name" type="text" v-model="first_name" :readonly="!isEditing" class="input"
                placeholder="{{ $t('profile_personal_name') }}" />
            </div>
            <div class="form-group half">
              <label for="last_name" class="label">{{ $t('profile_personal_lastname') }}</label>
              <input id="last_name" type="text" v-model="last_name" :readonly="!isEditing" class="input"
                placeholder="{{ $t('profile_personal_lastname') }}" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label for="date_of_birth" class="label">{{ $t('profile_personal_birthday') }}</label>
              <input id="date_of_birth" type="text" v-model="date_of_birth" :readonly="!isEditing" class="input" />
            </div>
            <div class="form-group half">
              <label for="phone_number" class="label">{{ $t('profile_personal_tel') }}</label>
              <input id="phone_number" type="tel" v-model="phone_number" :readonly="!isEditing" class="input"
                placeholder="0XX-XXX-XXXX" />
            </div>
          </div>

          <div class="form-group">
            <label for="address" class="label">{{ $t('profile_personal_address') }}</label>
            <textarea id="address" v-model="address" :readonly="!isEditing" class="input"
              placeholder="{{ $t('ple_address') }}"></textarea>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">{{ $t('work_section_title') }}</h2>
          <div class="form-group">
            <label for="position" class="label">{{ $t('profile_work_position') }}</label>
            <input id="position" type="text" v-model="position" :readonly="!isEditing" class="input"
              placeholder="{{ $t('profile_work_position_current') }}" />
          </div>

          <div class="form-group">
            <label for="role" class="label">{{ $t('profile_role') }}</label>
            <select id="role" v-model="role" :disabled="!isEditing" class="input">
              <option value="">{{ $t('profile_selected_role') }}</option>
              <option value="admin">{{ $t('profile_role_admin') }}</option>
              <option value="manager">{{ $t('profile_role_manager') }}</option>
              <option value="user">{{ $t('profile_role_user') }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="bio" class="label">{{ $t('profile_personal_bio') }}</label>
            <textarea id="bio" v-model="bio" :readonly="!isEditing" class="input textarea-bio"
              placeholder="{{ $t('ple_bio') }}"></textarea>
          </div>
        </div>
      </div>

      <div class="buttons">
        <button v-if="!isEditing" @click="enableEdit" class="btn btn-primary">
          <span class="btn-icon">✏️</span>
          {{ $t('profile_personal_edit') }}
        </button>
        <template v-else>
          <button @click="saveChanges" class="btn btn-primary">
            <span class="btn-icon">💾</span>
            {{ $t('profile_personal_save') }}
          </button>
          <button @click="isEditing = false" class="btn btn-secondary">
            {{ $t('profile_personal_cancel') }}
          </button>
        </template>
        <button @click="handleLogout" class="btn btn-danger">
          <span class="btn-icon">🚪</span>
          {{ $t('profile_logout') }}
        </button>
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
const first_name = ref("");
const last_name = ref("");
const bio = ref("");
const date_of_birth = ref("");
const avatar = ref("");
const email = ref("");
const phone_number = ref("");
const address = ref("");
const position = ref("");
const isEditing = ref(false);
const userId = ref("");

const enableEdit = () => {
  isEditing.value = true;
};

const saveChanges = async () => {
  if (!userId.value || !username.value || !first_name.value || !last_name.value || !email.value) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  try {
    const payload = {
      user_id: userId.value,
      username: username.value,
      password: password.value || undefined,
      role: role.value === "staff" ? "staff" : role.value,
      first_name: first_name.value,
      last_name: last_name.value,
      bio: bio.value,
      date_of_birth: date_of_birth.value,
      avatar: avatar.value,
      email: email.value,
      phone_number: phone_number.value,
      address: address.value,
      position: role.value === "staff" ? "" : position.value,
    };

    //* ลบข้อมูลที่ไม่มีค่า */
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const response = await fetch("http://localhost:4000/api2/update_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token eyJhY2NvdW50IjoiQUNDT1VOVF9TWU5DOjE3MzExNDM4MTI4NTkuODk2MjAzIiwiaWQiOiJDVVNUT01FUjoxNzMwNjg1NTY0Mzg0LjMwMzAyMCIsImdyb3VwIjoidXNlcjpjdXN0b21lciIsIm9mZmljZV9pZCI6Ik9GRklDRTowMDEiLCJkYXRlIjoxNzMxNTYwMDg5Mzc0fQ==!IcYueH98Vx4wrffC57Xh39pLSYwu4SNW0WfTzQcs75M="
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok) {
      alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
      isEditing.value = false;
    } else {
      console.error("Error updating user:", result.error || result);
      alert(result.error || "ไม่สามารถบันทึกข้อมูลได้");
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
    userId.value = user.user_id || "";
    username.value = user.username;
    role.value = user.role;
    first_name.value = user.first_name;
    last_name.value = user.last_name;
    bio.value = user.bio;
    date_of_birth.value = user.date_of_birth;
    avatar.value = user.avatar;
    email.value = user.email;
    phone_number.value = user.phone_number;
    address.value = user.address;
    position.value = user.position;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  background-color: #f0f4f8;
  font-family: "Arial", sans-serif;
  color: #1e293b;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.025em;
  text-rendering: optimizeLegibility;
}

.card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
}

.header {
  margin-bottom: 32px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 24px;
  text-align: left;
}

.label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  color: #1e293b;
  outline: none;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
}

.btn {
  flex: 1;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #1e293b;
  border: none;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.subtitle {
  color: #64748b;
  margin-top: -8px;
  margin-bottom: 24px;
}

.profile-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.avatar-upload {
  color: white;
  text-align: center;
  cursor: pointer;
}

.upload-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.avatar-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.half {
  flex: 1;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
}

.input.with-icon {
  padding-left: 40px;
}

.textarea-bio {
  min-height: 100px;
  resize: vertical;
}

.btn-icon {
  margin-right: 8px;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .card {
    padding: 24px;
  }

  .section {
    padding: 16px;
  }
}
</style>
