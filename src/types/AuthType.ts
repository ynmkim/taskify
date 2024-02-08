import { InputHTMLAttributes } from 'react';
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Sign Up & Log In
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
