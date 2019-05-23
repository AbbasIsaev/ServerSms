import axios from "axios";

export default axios.create({
  // Страница api для продакшина
  baseURL: process.env.API_URL
})
