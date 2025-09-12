// src/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

async function handleResponse(res) {
  const contentType = res.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const body = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const err = (body && body.message) || body || res.statusText;
    throw new Error(err);
  }
  return body;
}

// Auth
export async function registerUser(payload) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function loginUser(payload) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

// Transactions
export async function fetchTransactions() {
  const res = await fetch(`${API_URL}/api/transactions`, {
    headers: getHeaders()
  });
  return handleResponse(res);
}

export async function fetchTransactionById(id) {
  const res = await fetch(`${API_URL}/api/transactions/${id}`, {
    headers: getHeaders()
  });
  return handleResponse(res);
}

export async function createTransaction(payload) {
  const res = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function updateTransaction(id, payload) {
  const res = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function deleteTransaction(id) {
  const res = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  return handleResponse(res);
}

export async function fetchBalance() {
  const res = await fetch(`${API_URL}/api/transactions/balance/total`, {
    headers: getHeaders()
  });
  return handleResponse(res);
}
