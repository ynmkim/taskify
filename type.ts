// Auth
/* eslint-disable no-unused-vars */
export enum InputType {
  Email = 'email',
  Password = 'password',
  Nickname = 'text',
}
/* eslint-enable no-unused-vars */

export interface CustomInputProps {
  inputType: InputType;
  id?: string;
  labelContext?: string;
  placeholder?: string;
  isError?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData extends LoginData {
  nickname: string;
  passwordConfirm: string;
  agreement: boolean;
}
