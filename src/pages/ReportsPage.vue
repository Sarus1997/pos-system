<!-- <template>
  <div>
    <h2>Reports</h2>
    <button @click="exportReport">Export Report</button>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Total Sales</th>
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

<script>
export default {
  data() {
    return {
      reports: [
        { id: 1, date: '2025-01-01', product: 'Apple', total: 500 },
        { id: 2, date: '2025-01-02', product: 'Banana', total: 300 },
      ],
    };
  },
  methods: {
    exportReport() {
      alert('Report Exported Successfully!');
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #48bb78;
  color: white;
  border: none;
  cursor: pointer;
}
</style> -->
