import { InputHTMLAttributes } from 'react';

// Home

export interface SettingBoxProps {
  src: string;
  width: number;
  height: number;
  title: string;
  description: string;
}

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

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LoginFormData {
  nickname: string;
  passwordConfirm: string;
  agreement: boolean;
}
