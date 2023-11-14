import React, { useState, useEffect } from "react";
import "./index.css";
import { getAccountInfo } from "../../api/api";

const defaultValues: any = {
  firstName: "",
  lastName: "",
};

const AccountPage = () => {
  const [values, setValues] = useState(defaultValues);
  const [token, setToken] = useState(localStorage.getItem("USERTOKEN"));

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const getInfo = async () => {
    try {
      const res = await getAccountInfo();
      console.log(res);
      setValues({ ...values, ...res });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    localStorage.removeItem("USERTOKEN");
    window.location.href = "/";
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="form-wrapper">
      <h1>會員頁面</h1>
      {token ? (
        <>
          <p>
            {values.firstName}
            {values.lastName}
          </p>
          <div onClick={logout}> 登出</div>
        </>
      ) : (
        <div>{"未登錄"}</div>
      )}
    </div>
  );
};

export default AccountPage;
