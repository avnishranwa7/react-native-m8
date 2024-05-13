import axios from "axios";

const BACKEND_URL = "https://react-native-m8-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  return response.data.name;
}

export async function getExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  return Object.keys(response.data).map((id) => ({
    id,
    ...response.data[id],
    date: new Date(response.data[id].date),
  }));
}

export function updateExpense(id, expenseData) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
