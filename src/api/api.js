import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api2';
const TOKEN = 'eyJhY2NvdW50IjoiQUNDT1VOVF9TWU5DOjE3MzExNDM4MTI4NTkuODk2MjAzIiwiaWQiOiJDVVNUT01FUjoxNzMwNjg1NTY0Mzg0LjMwMzAyMCIsImdyb3VwIjoidXNlcjpjdXN0b21lciIsIm9mZmljZV9pZCI6Ik9GRklDRTowMDEiLCJkYXRlIjoxNzMxNTYwMDg5Mzc0fQ==!IcYueH98Vx4wrffC57Xh39pLSYwu4SNW0WfTzQcs75M=';

async function fetchAPI(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}/${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${TOKEN}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchProductList(filter = {}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/product_list`,
      { filter },
      {
        headers: {
          Authorization: `Token ${TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
}

export async function fetchReceipt(orderId) {
  return fetchAPI('get_receipt_2', 'POST', { order_id: orderId }).then(
    (result) => result.result?.data?.[0] || null
  );
}

export async function posLogin(username, password) {
  return fetchAPI('pos_login', 'POST', { username, password });
}

export async function getProduct(productId) {
  return fetchAPI('get_product', 'POST', { product_id: productId });
}
