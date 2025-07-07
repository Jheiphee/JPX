// src/api/homepage.js
import axios from "axios";

export const fetchHomepage = async () => {
  const response = await axios.get("http://localhost:8000/homepage");
  return response.data;
};
