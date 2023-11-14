import React from "react";
import { useState } from "react";
import "./index.css";
import FormInput from "../FormInput";
import PhoneInput from "../PhoneInput";
import { login } from "../../api/api";

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

const defaultValues: LoginFormProps = {
  verificationCode: "",
  number: "",
  areaCode: areaCodeType.MainlandChina,
  password: "",
};

const Login = () => {
  const [values, setValues] = useState<LoginFormProps>(defaultValues);

  // const phoneFormValues: Record<string, any> = {
  //   verificationCode: 0,
  //   number: "",
  //   areaCode: "86",
  // };

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "請輸入密碼",
      errorMessage: "密碼六到二十位數字",
      label: "密碼",
      pattern: `^[0-9]{6,20}$`, //todo
      required: true,
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // validate phone
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg_tel.test(values.number)) {
      alert("手機號碼格式不對");
      return;
    }

    const data: LoginProps = {
      phoneNumber: {
        areaCode: values.areaCode,
        number: values.number,
      },
      verificationCode: values.verificationCode,
      password: values.password,
    };

    const res = await login(data);

    console.log(res);
    if (res) {
      localStorage.setItem("USERTOKEN", res.token);
      window.location.href = "/account";
    }
    // storage sessions
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangePhone = (e: any) => {
    setValues({
      ...values,
      areaCode: e.areaCode,
      number: e.number,
      verificationCode: e.verificationCode,
    });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>會員登錄</h1>
        <div className="form-content">
          <PhoneInput onChange={onChangePhone} values={values} />
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name as keyof LoginFormProps]}
              onChange={onChange}
            />
          ))}
        </div>
        <button>登錄</button>
      </form>
    </div>
  );
};

export default Login;
