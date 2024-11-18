import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data; 
};

export const fetchPrograms = async () => {
  const response = await axios.get(`${BASE_URL}/programs`);
  return response.data;
};

export const saveProgram = async (program) => {
  const response = await axios.post(`${BASE_URL}/programs`, program);
  return response.data;
};

// export const savecombo = async (combo) => {
//   const response = await axios.post(`${BASE_URL}/api/combos`, combo);
//   return response.data;
// };
