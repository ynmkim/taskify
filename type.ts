// Signup.tsx
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

export interface FormData {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickname?: string;
  agreement?: boolean;
}
