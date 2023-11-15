import axios from "axios";
import { PhoneNumber, LoginProps, RegisterParams} from "../types";

export const token = localStorage.getItem("USERTOKEN");

export const baseUrl = "https://gow.macao-notification.com";

const axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
  }
};

export const getVerifyCode = async (data: {phoneNumber: PhoneNumber}) => {
  return await axios.post(`${baseUrl}/verification`,  data, axiosConfig);
};

export const login = async (data: LoginProps) => {
  const res = await axios.post(`${baseUrl}/sessions`,  data, axiosConfig);
  return res.data;
};

export const register = async (data: RegisterParams) => {
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

