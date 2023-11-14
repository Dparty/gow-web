import React from "react";
import { useState } from "react";
import "./index.css";
import FormInput from "../FormInput";
import { register, restaurantApi } from "../../api/api";
import PhoneInput from "../PhoneInput";
import moment from "moment";

enum areaCodeType {
  MainlandChina = "86",
  HongKong = "852",
  Macao = "853",
}

const map: Record<string, any> = {
  firstName: "",
  lastName: "",
  birthday: "",
  password: "",
  confirmPassword: "",
  gender: "",
  verificationCode: "",
  number: "",
  areaCode: areaCodeType.MainlandChina,
};

const focusMap: Array<boolean> = [];

const Register = () => {
  const [values, setValues] = useState(map);
  const [focus, setFocus] = useState(false);
  const [isCheckTerms, setIsCheckTerms] = useState(false);

  const handleCheck = (event: any) => {
    setIsCheckTerms(event.target.checked);
    console.log(event.target.checked);
  };

  const inputs = [
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "請輸入密碼",
      errorMessage: "密碼六到二十位數字",
      label: "密碼",
      pattern: `^[0-9]{6,20}$`, //todo
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "請二次輸入密碼",
      errorMessage: "密碼不匹配!",
      // label: "Confirm Password",
      pattern: values.password,
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

    const data = {
      phoneNumber: {
        areaCode: values.areaCode,
        number: values.number,
      },
      verificationCode: values.verificationCode,
      password: values.password,
      gender: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      birthday: moment.utc(`${values.birthday} ${"00:00"}`).unix(),
    };

    const res = await register(data);

    console.log(res);
    if (res) {
      alert("註冊成功，跳轉登錄");
      window.location.href = "/login";
    }
    // storage sessions
  };

  const onChangePhone = (e: any) => {
    setValues({
      ...values,
      areaCode: e.areaCode,
      number: e.number,
      verificationCode: e.verificationCode,
    });
  };

  const onChange = (e: any) => {
    console.log(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>歡迎加入財神芸</h1>
        <div className="form-content">
          <div className="formInput">
            {/* <label htmlFor="name" className="">
            姓名
          </label> */}
            <div className="name-group">
              <input
                key={1}
                onChange={onChange}
                name="firstName"
                className="name-group-sub"
                placeholder="姓"
              />
              <input
                key={2}
                onChange={onChange}
                name="lastName"
                className="name-group-sub"
                placeholder="名"
              />
            </div>
            <span>{"需要輸入姓"}</span>
          </div>

          <div className="form-inline">
            <div className="gender-input">
              <label>性別</label>
              <div className="gender-group">
                <input type="radio" name="gender" value="male" onChange={onChange} />
                <label htmlFor="male">男性</label>
                <input type="radio" name="gender" value="female" onChange={onChange} />
                <label htmlFor="male">女性</label>
              </div>
            </div>

            <div className="birth-input">
              <label>出生日期</label>
              <input
                type="text"
                name="birthday"
                className="form-control"
                onChange={onChange}
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                placeholder="请选择出生日期"
              />
            </div>
          </div>

          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}

          <PhoneInput onChange={onChangePhone} values={values} />

          <div className="agree-checkbox">
            <input
              type="checkbox"
              name="terms"
              checked={isCheckTerms}
              onChange={handleCheck}
              required={true}
            />
            <p className="agree-checkbox-text">
              本人已閱讀並同意<a href="">《隱私政策》</a>
              <a href="">《用戶協議》</a>
            </p>
          </div>
        </div>
        <button>立即加入</button>
      </form>
    </div>
  );
};

export default Register;
