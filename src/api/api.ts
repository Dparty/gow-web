import { Configuration, ConfigurationParameters, RestaurantApi } from "@dparty/restaurant-ts-sdk";
import axios from "axios";

export const token = localStorage.getItem("USERTOKEN");

// export const basePath = "https://ordering-api-uat.sum-foods.com";
export const basePath = "https://restaurant-uat.sum-foods.com";
// if (window.location.hostname === "ordering-uat.sum-foods.com") {
//   basePath = "https://ordering-api-uat.sum-foods.com";
// }
export const baseUrl = "https://gow.macao-notification.com";

const axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      // "Access-Control-Allow-Origin": "*",
  }
};



export const restaurantApi = new RestaurantApi(
  new Configuration({
    basePath: basePath,
  } as ConfigurationParameters)
);

export const getVerifyCode = async (data: any) => {
  return await axios.post(`${baseUrl}/verification`,  data, axiosConfig);
};

export const login = async (data: any) => {
  const res = await axios.post(`${baseUrl}/sessions`,  data, axiosConfig);
  return res.data;
};

export const register = async (data: any) => {
    const res = await axios.post(`${baseUrl}/accounts`,  data, axiosConfig);
    return res.data;
};

export const getAccountInfo = async () => {
  
  if(!token)  return; // navigate
  const config: any = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${baseUrl}/me`, config);
  return res.data;
};

