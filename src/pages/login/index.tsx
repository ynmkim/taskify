import Link from 'next/link';
import Image from 'next/image';
import { AuthInputType, LoginFormData } from '@/../type';
import AuthInput from '@/components/auth/input/AuthInput';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'next/router';

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({ mode: 'onBlur' });

  const router = useRouter();

  const logIn = useLogin();

  const handleLogin = async (data: LoginFormData) => {
    const loginResult = await logIn(data);

    if (typeof loginResult === 'object') {
      const acceesToken = loginResult.data.accessToken;
      const userData = loginResult.data.user;

      router.push('/mydashboard');
    } else if (typeof loginResult === 'string') {
      alert(loginResult);
    }
  };

  return (
    <div className="container flex flex-col items-center">
      <div>
        <Link href="/">
          <div className="relative w-[140px] h-[195.3px] sm:w-[200px] sm:h-[279px] mt-44 mx-auto">
            <Image src="/logo_main.svg" alt="main-logo" priority fill />
          </div>
        </Link>
        <p className="mt-2.5 w-fit mx-auto my-0 text-xl font-medium">오늘도 만나서 반가워요!</p>
      </div>

      <div className="flex flex-col items-center w-[351px] sm:w-[520px]">
        <form className="flex flex-col items-center w-full mt-9 gap-4" onSubmit={handleSubmit(handleLogin)} noValidate>
          <div className="w-full">
            <AuthInput
              inputType={AuthInputType.Email}
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
            <AuthInput
              inputType={AuthInputType.Password}
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

          <Button className="mt-5 w-full bg-gray-9FA6B2 text-lg text-white font-medium py-3 hover:bg-violet-5534DA">
            로그인
          </Button>
        </form>

        <div className="mt-7 mb-44">
          회원이 아니신가요?{' '}
          <Link href="/signup" className="text-violet-5534DA underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
