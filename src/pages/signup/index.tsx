import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InputType, FormData } from '@/../type';
import CustomInput from '@/components/auth/input/CustomInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import useSignUp from '@/hooks/useSignUp';

export default function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const userPwInput = watch('password');
  const agreement = watch('agreement');

  const handleAgreement = () => {
    setIsChecked((prev) => !prev);
  };

  const signUp = useSignUp();

  const handleSignUp = (data: FormData) => {
    signUp(data);
  };

  const onSubmit = (data: FormData) => {
    if (isActive) {
      handleSignUp(data);
    } else {
      alert('이용약관에 동의해 주세요.');
    }
  };

  useEffect(() => {
    setValue('agreement', isChecked);
  }, [isChecked, setValue]);

  useEffect(() => {
    setIsActive(isValid && agreement ? true : false);
    // console.log(isValid, agreement, isActive);
  }, [isValid, agreement, isActive]);

  return (
    <div className="container flex flex-col items-center">
      <div>
        <Link href="/">
          <div className="relative w-[140px] h-[195.3px] sm:w-[200px] sm:h-[279px] mt-44 mx-auto">
            <Image src="/logo_main.svg" alt="main-logo" priority fill />
          </div>
        </Link>

        <p className="mt-2.5 w-fit mx-auto my-0 text-xl font-medium">첫 방문을 환영합니다!</p>
      </div>

      <div className="flex flex-col items-center w-[351px] sm:w-[520px]">
        <form className="flex flex-col items-center w-full mt-9 gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="w-full">
            <CustomInput
              inputType={InputType.Email}
              id="email"
              labelContext="이메일"
              placeholder="이메일을 입력해 주세요."
              isError={errors.email ? true : false}
              {...register('email', {
                required: '이메일을 입력해 주세요.',
                pattern: {
                  value: /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/,
                  message: '이메일 형식으로 작성해 주세요.',
                },
              })}
            />
            {errors.email && <div className="w-full mt-2 text-red-D6173A">{errors.email.message?.toString()}</div>}
          </div>

          <div className="w-full">
            <CustomInput
              inputType={InputType.Nickname}
              id="nickname"
              labelContext="닉네임"
              placeholder="닉네임을 입력해 주세요."
              isError={errors.nickname ? true : false}
              {...register('nickname', {
                required: '닉네임을 입력해 주세요.',
                maxLength: {
                  value: 10,
                  message: '10자 이하로 입력해 주세요.',
                },
              })}
            />
            {errors.nickname && (
              <div className="w-full mt-2 text-red-D6173A">{errors.nickname.message?.toString()}</div>
            )}
          </div>

          <div className="w-full">
            <CustomInput
              inputType={InputType.Password}
              id="password"
              labelContext="비밀번호"
              placeholder="비밀번호를 입력해 주세요."
              isError={errors.password ? true : false}
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
                minLength: {
                  value: 8,
                  message: '8자 이상 입력해 주세요.',
                },
              })}
            />
            {errors.password && (
              <div className="w-full mt-2 text-red-D6173A flex">{errors.password.message?.toString()}</div>
            )}
          </div>

          <div className="w-full">
            <CustomInput
              inputType={InputType.Password}
              id="passwordConfirm"
              labelContext="비밀번호 확인"
              placeholder="비밀번호를 입력해 주세요."
              isError={errors.passwordConfirm ? true : false}
              {...register('passwordConfirm', {
                required: '비밀번호를 입력해 주세요.',
                validate: (value) => value === userPwInput || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordConfirm && (
              <div className="w-full mt-2 text-red-D6173A flex">{errors.passwordConfirm.message?.toString()}</div>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="agreement" className="mt-6 w-fit flex items-center justify-start cursor-pointer">
              <Checkbox
                id="agreement"
                className="mr-2 w-5 h-5 border border-gray-D9D9D9 rounded data-[state=checked]:bg-violet-5534DA"
                onClick={handleAgreement}
                checked={isChecked}
              />
              <div>이용약관에 동의합니다.</div>
            </label>
            {errors.agreement && (
              <div className="w-full mt-2 text-red-D6173A flex">{errors.agreement.message?.toString()}</div>
            )}
          </div>

          <Button
            className={`mt-5 w-full text-lg text-white font-medium py-3 ${isActive ? 'bg-violet-5534DA' : 'bg-gray-9FA6B2'} hover:bg-violet-5534DA`}
          >
            가입하기
          </Button>
        </form>

        <div className="mt-7 mb-44">
          이미 가입하셨나요?{' '}
          <Link href="/login" className="text-violet-5534DA underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
