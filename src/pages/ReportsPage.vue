<template>
  <div class="reports-page">
    <h2 class="title">รายงาน</h2>
    <button class="export-btn" @click="exportReport">ส่งออกรายงาน</button>
    <table class="reports-table">
      <thead>
        <tr>
          <th>วันที่</th>
          <th>สินค้า</th>
          <th>ยอดขายรวม</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id">
          <td>{{ report.date }}</td>
          <td>{{ report.product }}</td>
          <td>{{ report.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const reports = ref([
  { id: 1, date: '2025-01-01', product: 'แอปเปิ้ล', total: 500 },
  { id: 2, date: '2025-01-02', product: 'กล้วย', total: 300 },
]);

const exportReport = () => {
  alert('ส่งออกรายงานสำเร็จ!');
};
</script>


<style scoped>
.reports-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.export-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #48bb78;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.reports-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}
</style>
