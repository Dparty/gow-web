import { useState } from "react";
import "../common.css";
import "./index.css";
import FormInput from "../FormInput";
import { register } from "../../api/api";
import PhoneInput from "../PhoneInput";
import moment from "moment";
import Message from "../Message";
import { areaCodeType, RegisterFormProps, RegisterParams } from "../../types";
import DatePicker from "react-mobile-datepicker";
import { convertDate } from "../../utils/convertDate";
import { translatePage } from "../../utils/transform";
import { phoneNumValidate } from "../PhoneInput";

const defaultValues: RegisterFormProps = {
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

const Register = () => {
  const [values, setValues] = useState(defaultValues);
  const [isCheckTerms, setIsCheckTerms] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [selectBirthOpen, setSelectBirthOpen] = useState(false);
  const [date, setDate] = useState(new Date(1990, 0, 1));

  const handleCheck = (event: any) => {
    setIsCheckTerms(event.target.checked);
  };

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "請輸入密碼",
      errorMessage: "密碼八位以上",
      label: "密碼",
      pattern: `.{8,}`, //todo
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
    setShowMessage(false);

    // validate phone
    if (!phoneNumValidate(values.number, values.areaCode)) {
      setMessage("手機號碼格式不對");
      setShowMessage(true);
      return;
    }

    const data: RegisterParams = {
      phoneNumber: {
        areaCode: values.areaCode,
        number: values.number,
      },
      verificationCode: values.verificationCode,
      password: values.password,
      gender: values.gender,
      firstName: values.firstName,
      lastName: values.lastName,
      // birthday: moment.utc(`${values.birthday} ${"00:00"}`).unix(),
      birthday: moment.utc(`${convertDate(date, "YYYY-MM-DD")} ${"00:00"}`).unix(),
    };
    setShowMessage(false);

    try {
      const res = await register(data);

      if (res) {
        setMessage("註冊成功，跳轉登錄");
        setShowMessage(true);
        window.location.href = "/login";
      }
    } catch (e) {
      console.log(e);
      setMessage("註冊失败");
      setShowMessage(true);
    }
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
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectBirth = (date: any) => {
    setDate(date);
    setSelectBirthOpen(false);
  };
  const handleCancel = () => {
    setSelectBirthOpen(false);
  };

  return (
    <div className="register">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>歡迎加入財神酒店</h1>

          <div
            className="transform-btn"
            onClick={() => {
              translatePage();
            }}
          >
            <span>简/繁</span>
          </div>
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
                <p
                  onClick={() => {
                    setSelectBirthOpen(true);
                  }}
                  className="select-time"
                >
                  {convertDate(date, "YYYY-MM-DD")}
                </p>
                <DatePicker
                  value={date}
                  max={new Date()}
                  isOpen={selectBirthOpen}
                  onSelect={handleSelectBirth}
                  onCancel={handleCancel}
                  theme={"ios"}
                />
                {/* <input
                  type="text"
                  name="birthday"
                  className="form-control"
                  onChange={() => {
                    setSelectBirthOpen(true);
                  }}
                  onFocus={(e) => (e.currentTarget.type = "date")}
                  onBlur={(e) => (e.currentTarget.type = "text")}
                  placeholder="请选择出生日期"
                /> */}
              </div>
            </div>

            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name as keyof RegisterFormProps]}
                onChange={onChange}
              />
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
          <p>
            已有帳號？<a href="/login">去登錄</a>
          </p>
        </form>
      </div>
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

export default Register;
