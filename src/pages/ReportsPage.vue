<template>
  <div class="reports-page">
    <h2 class="title">รายงาน</h2>
    <button class="export-btn" @click="printReport">พิมพ์รายงาน</button>
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

const printReport = () => {
  window.print();
};
</script>

<style scoped>
.reports-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.export-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #48bb78;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.export-btn:hover {
  background-color: #38a169;
}

.reports-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th,
td {
  border: 1px solid #e2e8f0;
  padding: 1rem;
  text-align: center;
  color: #4a5568;
}

th {
  background-color: #edf2f7;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f7fafc;
}

@media print {
  .reports-page {
    display: block;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
  }

  .export-btn {
    display: none;
  }

  .reports-table {
    width: 100%;
    box-shadow: none;
  }
}
</style>
