import React, { ChangeEvent, useEffect, useState } from "react";
import "./index.css";

const PhoneInput = () => {
  const [num, setNum] = useState(0);
  const [tel, setTel] = useState("");
  const [region, setRegion] = useState("+86");

  const handleSend = () => {
    let a = 10;
    console.log(tel, "手机号");
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg_tel.test(tel)) {
      setNum(a);
      const t1 = setInterval(() => {
        a = a - 1;
        setNum(a);
        if (a === 0) {
          clearInterval(t1);
        }
      }, 1000);
    } else {
      alert("手机号格式不正确");
    }
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Input改变", e.target.value);

    const reg_num = /^[0-9]*$/;
    if (reg_num.test(e.target.value)) {
      setTel(e.target.value);
      console.log(333);
    }
  };

  const onChange = (e: any) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    console.log("数据发生了变化,触发useEffect", num);
  });
  return (
    <div className="formInput-phone">
      <label htmlFor="region" className="">
        手機號
      </label>
      <div className="phone-group">
        <select className="phone-group-region" name="region" onChange={onChange} value={region}>
          <option value={"+86"}>+86</option>
          <option value={"+852"}>+852</option>
          <option value={"+853"}>+853</option>
        </select>

        <input
          key={2}
          value={tel}
          onChange={onChangeInput}
          name="phone"
          className="phone-group-num"
          placeholder="請輸入手機號"
          required={true}
        />
      </div>

      <div className="phone-validate-group">
        <input
          key={3}
          onChange={onChange}
          name="code"
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
