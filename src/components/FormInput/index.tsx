import { useState } from "react";
import "./index.css";

interface FormInputProps {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  label: string;
  pattern: any;
  required: boolean;
  value: any;
  onChange: (e: any) => void;
}

const FormInput: React.FC<any> = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
