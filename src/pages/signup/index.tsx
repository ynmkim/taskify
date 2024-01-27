import EmailInput from '@/components/common/input/EmailInput';
import Image from 'next/image';

export default function SignUp() {
  return (
    <div className="container flex flex-col items-center">
      <div>
        <Image className="mt-44" src="/logo_main.svg" width={200} height={279} alt="main-logo" />
        <p className="mt-2.5 w-fit mx-auto my-0">첫 방문을 환영합니다!</p>
      </div>

      <div className="mt-9">
        <EmailInput />
      </div>
    </div>
  );
}
