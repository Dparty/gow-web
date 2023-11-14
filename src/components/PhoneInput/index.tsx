import React, { ChangeEvent, useEffect, useState } from "react";
import "./index.css";
import { getVerifyCode } from "../../api/api";

const PhoneInput = ({ onChange, values }: any) => {
  // const [values, setValues] = useState(map);
  const [verificationCode, setVerificationCode] = useState(0);
  const [number, setNumber] = useState("");
  const [areaCode, setAreaCode] = useState("+86");
  const [num, setNum] = useState(0);

  const handleSend = async () => {
    let a = 10;
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg_tel.test(number)) {
      setNum(a);
      const t1 = setInterval(() => {
        a = a - 1;
        setNum(a);
        if (a === 0) {
          clearInterval(t1);
        }
      }, 1000);

      const data = {
        phoneNumber: {
          areaCode: "86",
          number: number,
        },
      };
      // 獲取驗證碼
      getVerifyCode(data);
      // setValues({ ...values, number: number });
    } else {
      alert("手机号格式不正确");
    }
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const reg_num = /^[0-9]*$/;
    // if (reg_num.test(e.target.value)) {
    setNumber(e.target.value);
    console.log(e.target.value);
    onChange?.({ ...values, number: e.target.value });
    // }
  };

  const onChangeRegion = (e: any) => {
    setAreaCode(e.target.value);
    onChange?.({ ...values, areaCode: e.target.value });
  };

  const onChangeCode = (e: any) => {
    // setValues({ ...values, verificationCode: e.target.value });
    setVerificationCode(e.target.value);
    onChange?.({ ...values, verificationCode: e.target.value });
  };

  return (
    <div className="formInput-phone">
      <label htmlFor="areaCode" className="">
        手機號
      </label>
      <div className="phone-group">
        <select
          className="phone-group-areaCode"
          name="areaCode"
          onChange={onChangeRegion}
          value={areaCode}
        >
          <option value={"86"}>+86</option>
          <option value={"852"}>+852</option>
          <option value={"853"}>+853</option>
        </select>

        <input
          key={2}
          value={number}
          onChange={onChangeInput}
          name="number"
          className="phone-group-num"
          placeholder="請輸入手機號"
          required={true}
        />
      </div>

      <div className="phone-validate-group">
        <input
          key={3}
          onChange={onChangeCode}
          name="verificationCode"
          className="phone-validate-group-num"
          placeholder="請輸入验证码"
          required={true}
        />
        <div className="phone-validate-btn" onClick={handleSend}>
          {num === 0 ? "獲取驗證碼" : num + "秒"}
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
