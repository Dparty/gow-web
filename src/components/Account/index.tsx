import React, { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import FormInput from "../FormInput";
import PhoneInput from "../PhoneInput";
import { login, getAccountInfo } from "../../api/api";

enum areaCodeType {
  MainlandChina = "86",
  HongKong = "852",
  Macao = "853",
}

interface PhoneNumber {
  areaCode: areaCodeType;
  number: string;
}

interface LoginProps {
  phoneNumber: PhoneNumber;
  password: string;
  verificationCode: string;
}

interface LoginFormProps {
  verificationCode: string;
  number: string;
  areaCode: areaCodeType;
  password: string;
}

const defaultValues: any = {
  firstName: "",
  lastName: "",
};

const AccountPage = () => {
  const [values, setValues] = useState(defaultValues);
  const [token, setToken] = useState(localStorage.getItem("USERTOKEN"));

  const getInfo = async () => {
    try {
      const res = await getAccountInfo();
      console.log(res);
      setValues({ ...values, ...res });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="form-wrapper">
      <h1>會員頁面</h1>
      <p>
        {values.firstName}
        {values.lastName}
      </p>
    </div>
  );
};

export default AccountPage;
