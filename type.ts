import { InputHTMLAttributes } from 'react';

// Auth

/* eslint-disable no-unused-vars */
export enum AuthInputType {
  Email = 'email',
  Password = 'password',
  Nickname = 'text',
}
/* eslint-enable no-unused-vars */

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}
export interface AuthInputProps {
  inputType: AuthInputType;
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
