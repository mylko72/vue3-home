import axios from "axios";

//조회
export const getWorks = (url, params) => {
  return axios.get(url, { params });
}