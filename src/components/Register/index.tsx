import React from "react";
import { useState } from "react";
import "./index.css";
import FormInput from "../FormInput";
import { restaurantApi } from "../../api/api";

interface IValue {
  username: string;
  email: string;
  birthday: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const map: Record<string, any> = {
  username: "",
  phone: "",
  birthday: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

const Register = () => {
  const [values, setValues] = useState(map);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "請輸入用戶名",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "用戶名",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "phone",
      type: "phone",
      placeholder: "請輸入手機號",
      errorMessage: "It should be a valid email address!",
      label: "手機號碼",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "請輸入生日",
      label: "出生日期",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "請輸入密碼",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "請二次輸入密碼",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  // const getTableList = async (restaurantId: any) => {
  //   try {
  //     const res = await restaurantApi.getRestaurant({ id: restaurantId });
  //     if (res) {
  //       console.log(res.tables);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // getTableList(values);
    console.log(values);
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>歡迎</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}
        <div className="formInput">
          <label>性別</label>
          <div>
            <input type="radio" name="gender" value="male" onChange={onChange} />
            <label htmlFor="male">男性</label>
            <input type="radio" name="gender" value="female" onChange={onChange} />
            <label htmlFor="male">女性</label>
          </div>
        </div>

        <button>立即加入</button>
      </form>
    </div>
  );
};

export default Register;
