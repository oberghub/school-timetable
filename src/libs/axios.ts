import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 40000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const fetcher = async (url: string) => {
  return await api.get(url).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }
    return res.data;
  });
};

export default api;
