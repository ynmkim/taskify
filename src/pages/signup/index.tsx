import Image from 'next/image';
import CustomInput from '@/components/auth/input/CustomInput';
import { InputType } from '@/../type';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="container flex flex-col items-center">
      <div>
        <Link href="/">
          <Image className="mt-44" src="/logo_main.svg" width={200} height={279} alt="main-logo" priority />
        </Link>
        <p className="mt-2.5 w-fit mx-auto my-0 text-xl font-medium">첫 방문을 환영합니다!</p>
      </div>

      <div className="flex flex-col items-center w-[351px] sm:w-[520px]">
        <form className="flex flex-col items-center w-full mt-9 gap-4">
          <CustomInput
            inputType={InputType.Email}
            id="email"
            labelContext="이메일"
            placeholder="이메일을 입력해 주세요."
          />

          <CustomInput
            inputType={InputType.Nickname}
            id="nickname"
            labelContext="닉네임"
            placeholder="닉네임을 입력해 주세요."
          />

          <CustomInput
            inputType={InputType.Password}
            id="password"
            labelContext="비밀번호"
            placeholder="8자 이상 입력해 주세요."
          />

          <CustomInput
            inputType={InputType.Password}
            labelContext="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해 주세요."
          />
        </form>

        <div className="mt-6 w-full flex items-center justify-start">
          <Checkbox
            id="agrrement"
            className="mr-2 w-5 h-5 border border-gray-D9D9D9 rounded data-[state=checked]:bg-violet-5534DA"
          />
          <label htmlFor="agrrement">이용약관에 동의합니다.</label>
        </div>

        <Button className="mt-5 w-full bg-gray-9FA6B2 text-lg text-white font-medium py-3 hover:bg-violet-5534DA">
          가입하기
        </Button>

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
