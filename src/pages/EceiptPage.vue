<template>
  <div id="app">
    <br>
    <div class="input-group">
      <label for="order_id_input" class="input-group-label">ใส่เลขที่ใบสั่งซื้อ:</label>
      <input type="text" v-model="orderId" placeholder="Order ID" class="input-group-input" />
      <button @click="fetchReceiptData" class="input-get-data">
        <i class="fas fa-search"></i>
        <h3>Get Data</h3>
      </button>
      <button @click="printReceipt" class="input-print">
        <i class="fas fa-print"></i>
        <h3>Print</h3>
      </button>
    </div>

    <div class="receipt" v-if="receipt.order_id">
      <div class="header">
        <img id="img" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt="Company Logo" />
        <h1>ใบเสร็จรับเงิน</h1>
      </div>

      <div class="info">
        <div>
          <p><strong>เลขที่ใบเสร็จ:</strong> <span>{{ receipt.order_id }}</span></p>
          <p><strong>วันที่:</strong> <span>{{ formattedOrderDate }}</span></p>
        </div>
        <div>
          <p><strong>เลขที่การชำระเงิน:</strong> <span>{{ receipt.payment_id }}</span></p>
          <p><strong>วิธีการชำระเงิน:</strong> <span>{{ receipt.payment_method }}</span></p>
        </div>
      </div>

      <table class="products">
        <thead>
          <tr>
            <th>รายการสินค้า</th>
            <th>จำนวน</th>
            <th>ราคาต่อชิ้น</th>
            <th>ราคาที่ลด</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in receipt.products" :key="index">
            <td>{{ product.product_name }}</td>
            <td style="text-align: right;">{{ product.quantity ? product.quantity.toLocaleString('th-TH') + ' ชิ้น' :
              '-' }}</td>
            <td style="text-align: right;">{{ product.price ? product.price.toLocaleString('th-TH') + ' บาท' : '-' }}
            </td>
            <td style="text-align: right;">{{ product.discount ? product.discount.toLocaleString('th-TH') + ' บาท' : '-'
              }}</td>
            <td style="text-align: right;">{{ product.total ? product.total.toLocaleString('th-TH') + ' บาท' : '-' }}
            </td>
          </tr>
          <tr v-if="receipt.products.length === 0">
            <td colspan="5" style="text-align: center;">ไม่มีข้อมูลสินค้า</td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <p>ยอดรวมทั้งสิ้น: <span>{{ formattedTotalAmount }}</span></p>
      </div>
    </div>

    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fetchReceipt } from '../api/api.js';

const orderId = ref('');
const receipt = ref({
  order_id: '',
  order_date: '',
  payment_id: '',
  payment_method: '',
  products: [],
  total_amount: 0,
});
const errorMessage = ref('');

const formattedOrderDate = computed(() => {
  return receipt.value.order_date
    ? new Date(receipt.value.order_date).toLocaleDateString('th-TH')
    : '-';
});

const formattedTotalAmount = computed(() => {
  return receipt.value.total_amount
    ? receipt.value.total_amount.toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' บาท'
    : '-';
});

const fetchReceiptData = async () => {
  if (!orderId.value) {
    errorMessage.value = 'กรุณาใส่เลขที่ใบสั่งซื้อ';
    return;
  }
  errorMessage.value = '';
  try {
    const receiptData = await fetchReceipt(orderId.value);
    if (!receiptData) {
      errorMessage.value = 'ไม่พบข้อมูลใบเสร็จ';
      return;
    }
    receipt.value = {
      ...receiptData,
      products: receiptData.products || [],
    };
  } catch (error) {
    errorMessage.value = 'เกิดข้อผิดพลาดในการดึงข้อมูล';
  }
};

const printReceipt = () => {
  if (!receipt.value.order_id) {
    errorMessage.value = 'กรุณาดึงข้อมูลใบเสร็จก่อนพิมพ์';
    return;
  }
  errorMessage.value = '';
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
    <head>
      <title>Print Receipt</title>
      <style>
        body { font-family: 'Noto Sans Thai', sans-serif; }
        .receipt { max-width: 800px; margin: 0 auto; padding: 40px; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .header img { width: 150px; margin-right: 20px; }
        .header h1 { font-size: 20px; margin: 0; flex-grow: 1; text-align: center; margin-right: 80px; }
        .info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
        .info p { margin: 8px 0; font-size: 12px; }
        .products { width: 100%; border-collapse: collapse; margin: 30px 0; }
        .products th, .products td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        .products th { background-color: #f8f8f8; font-weight: 600; font-size: 14px; text-align: center; }
        .total { text-align: right; font-size: 14px; font-weight: bold; padding: 20px 0; border-top: 2px solid #333; }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt="Company Logo" />
          <h1>ใบเสร็จรับเงิน</h1>
        </div>
        <div class="info">
          <div>
            <p><strong>เลขที่ใบเสร็จ:</strong> ${receipt.value.order_id}</p>
            <p><strong>วันที่:</strong> ${formattedOrderDate.value}</p>
          </div>
          <div>
            <p><strong>เลขที่การชำระเงิน:</strong> ${receipt.value.payment_id}</p>
            <p><strong>วิธีการชำระเงิน:</strong> ${receipt.value.payment_method}</p>
          </div>
        </div>
        <table class="products">
          <thead>
            <tr><th>สินค้า</th><th>จำนวน</th><th>ราคา</th><th>ส่วนลด</th><th>รวม</th></tr>
          </thead>
          <tbody>
            ${receipt.value.products.map(product => `
              <tr>
                <td>${product.product_name}</td>
                <td style="text-align: right;">${product.quantity ? product.quantity.toLocaleString('th-TH') + ' ชิ้น' : '-'}</td>
                <td style="text-align: right;">${product.price ? product.price.toLocaleString('th-TH') + ' บาท' : '-'}</td>
                <td style="text-align: right;">${product.discount ? product.discount.toLocaleString('th-TH') + ' บาท' : '-'}</td>
                <td style="text-align: right;">${product.total ? product.total.toLocaleString('th-TH') + ' บาท' : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">
          <p>ยอดรวม: ${formattedTotalAmount.value}</p>
        </div>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap');

body {
  font-family: "Noto Sans Thai", serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  line-height: 1.5;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  color: #333;
}

.receipt {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 2px solid #333;
  padding-bottom: 20px;
}

.header img {
  width: 150px;
  margin-right: 20px;
}

#img {
  width: 50px;
}

.header h1 {
  font-size: 20px;
  margin: 0;
  flex-grow: 1;
  text-align: center;
  margin-right: 80px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.input-group-label {
  margin-right: 10px;
  font-weight: bold;
}

.input-group-input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.input-get-data {
  padding: 10px 16px;
  font-size: 12px;
  width: 120px;
  border: none;
  border-radius: 4px;
  background-color: #00ff1a;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.input-get-data:hover {
  background-color: #00ff1a90;
}

.input-print {
  padding: 10px 16px;
  font-size: 12px;
  width: 120px;
  border: none;
  border-radius: 4px;
  background-color: #ff004c;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.input-print:hover {
  background-color: #ff004c90;
}

.info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.info p {
  margin: 8px 0;
  font-size: 12px;
}

.products {
  width: 100%;
  border-collapse: collapse;
  margin: 30px 0;
}

.products th,
.products td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.products th {
  background-color: #f8f8f8;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
}

#products_list {
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.products tr:last-child td {
  border-bottom: none;
}

.total {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  padding: 20px 0;
  border-top: 2px solid #333;
}

.error-message {
  color: red;
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>