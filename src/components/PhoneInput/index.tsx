import React, { ChangeEvent, useState } from "react";
import "../common.css";
import "./index.css";
import Message from "../Message";
import { areaCodeType } from "../../types";
import { getVerifyCode } from "../../api/api";

interface PhoneInputProps {
  values: PhoneFormValues;
  onChange: (e: any) => void;
  requireCode?: boolean;
}

interface PhoneFormValues {
  areaCode: areaCodeType;
  number: string;
  verificationCode: string;
}

export const phoneNumValidate = (phoneNum: string, areaCode: string) => {
  const reg: Record<string, RegExp> = {
    "86": /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    "852": /^([4|5|6|7|8|9])d{7}$/,
    "853": /^[6]\d{7}/,
  };
  const reg_tel = reg[areaCode];

  return reg_tel.test(phoneNum);
};

const PhoneInput = ({ onChange, values, requireCode = true }: PhoneInputProps) => {
  const [num, setNum] = useState(0); // for getting verification code countdown
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSend = async () => {
    if (num !== 0) {
      if (showMessage === false) {
        setMessage("請勿多次獲取驗證碼");
        setShowMessage(true);
      }
      return;
    }
    let a = 60;

    if (phoneNumValidate(values.number, values.areaCode)) {
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
          areaCode: values.areaCode,
          number: values.number,
        },
      };
      // 獲取驗證碼
      try {
        getVerifyCode(data);
      } catch (e) {
        setMessage("獲取驗證碼失敗");
        setShowMessage(true);
      }
    } else {
      setMessage("手機號格式不對");
      setShowMessage(true);
    }
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const reg_num = /^[0-9]*$/;
    // if (reg_num.test(e.target.value)) {
    // setNumber(e.target.value);
    onChange?.({ ...values, number: e.target.value });
    // }
  };

  const onChangeRegion = (e: any) => {
    onChange?.({ ...values, areaCode: e.target.value });
  };

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
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
          value={values.areaCode}
        >
          <option value={"86"}>+86</option>
          <option value={"852"}>+852</option>
          <option value={"853"}>+853</option>
        </select>

        <input
          key={2}
          value={values.number}
          onChange={onChangeInput}
          name="number"
          className="phone-group-num"
          placeholder="請輸入手機號"
          required={true}
        />
      </div>

      {requireCode && (
        <div className="phone-validate-group">
          <input
            key={3}
            onChange={onChangeCode}
            name="verificationCode"
            className="phone-validate-group-num"
            placeholder="請輸入验证码"
            value={values.verificationCode}
            required={true}
          />
          <div className="phone-validate-btn" onClick={handleSend}>
            {num === 0 ? "獲取驗證碼" : num + "秒"}
          </div>
        </div>
      )}

      {showMessage && (
        <Message
          message={message}
          onClose={() => {
            setShowMessage(false);
          }}
        />
      )}
    </div>
  );
};

export default PhoneInput;
