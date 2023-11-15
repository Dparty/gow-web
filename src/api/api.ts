import axios from "axios";
import { PhoneNumber, LoginProps, RegisterParams} from "../types";

export const token = localStorage.getItem("USERTOKEN");

export const baseUrl = "https://gow.macao-notification.com";

const config = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`,
  },
};

export const getVerifyCode = async (data: {phoneNumber: PhoneNumber}) => {
  const res = await axios.post(`${baseUrl}/verification`,  data);
  return res.data;
};

export const login = async (data: LoginProps) => {
  const res = await axios.post(`${baseUrl}/sessions`,  data);
  return res.data;
};

export const register = async (data: RegisterParams) => {
    const res = await axios.post(`${baseUrl}/accounts`,  data);
    return res.data;
};

export const getAccountInfo = async () => {
  if(!token)  return; // navigate
  const res = await axios.get(`${baseUrl}/me`, config);
  return res.data;
};

export const editAccount = async () => {
  if(!token)  return; // navigate
  const res = await axios.put(`${baseUrl}/me`, config);
  return res.data;
};

export const getAccountList = async () => {
  if(!token)  return; 
  const res = await axios.get(`${baseUrl}/accounts`, config);
  return res.data;
};