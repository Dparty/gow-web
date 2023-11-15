export enum areaCodeType {
  MainlandChina = "86",
  HongKong = "852",
  Macao = "853",
}

export interface PhoneFormValues {
  areaCode: areaCodeType;
  number: string;
  verificationCode: string;
}

export interface PhoneNumber {
  areaCode: areaCodeType;
  number: string;
}

export interface LoginProps {
  phoneNumber: PhoneNumber;
  password: string;
  verificationCode: string;
}

export interface LoginFormProps {
  verificationCode: string;
  number: string;
  areaCode: areaCodeType;
  password: string;
}

export interface RegisterFormProps {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  verificationCode: string;
  number: string;
  areaCode: areaCodeType;
  password: string;
  confirmPassword: string;
}

export interface RegisterParams {
  firstName: string;
  lastName: string;
  birthday: number;
  gender: string;
  verificationCode: string;
  phoneNumber: PhoneNumber;
  password: string;
}
