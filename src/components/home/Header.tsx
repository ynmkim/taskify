import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="w-full px-5 py-4 flex items-center justify-between">
      {/* TODO: Image 반응형 Next-Art Direction 이용해서 구현해보기 */}
      <Image
        src="/logo_small.svg"
        className="cursor-pointer sm:hidden w-auto h-auto"
        width={24}
        height={27}
        alt="logo"
        priority
      />
      <Image
        src="/logo_large.svg"
        className="cursor-pointer hidden sm:block w-auto h-auto"
        width={121}
        height={39}
        alt="logo"
        priority
      />
      <div className="gap-5 md:gap-9 flex mr-1 md:mr-5 lg:mr-10">
        <Link href="/login">
          <div>로그인</div>
        </Link>

        <Link href="/signup">
          <div>회원가입</div>
        </Link>
      </div>
    </div>
  );
}
