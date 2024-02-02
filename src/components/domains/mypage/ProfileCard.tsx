import DashboardCardTitle from '../mydashboard/DashboaordCardTitle';
import { cn } from '@/libs/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProfileCardProps {
  className?: string;
}

export default function ProfileCard({ className, ...props }: ProfileCardProps) {
  return (
    <div
      className={cn('max-w-[620px] pt-6 pb-5 px-4 md:pt-8 md:pb-7 md:px-7 rounded-lg bg-white', className)}
      {...props}
    >
      <DashboardCardTitle className="mb-6 md:mb-8">프로필</DashboardCardTitle>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex justify-center items-center w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-md bg-[#F5F5F5]">
            {/* <AvatarInput />  교체 */}
            <div className="relative w-5 h-5 md:w-[30px] md:h-[30px]">
              <Image src="/plus_upload.svg" alt="업로드" className="w-full h-full" layout="fill" objectFit="cover" />
            </div>
            <Input type="file" className="absolute top-0 left-0 w-[1px] h-[1px] opacity-0" />
          </div>
          <div className="flex flex-col grow gap-5">
            <div className="flex flex-col gap-2.5">
              <Label>이메일</Label>
              <Input type="email" placeholder="johndoe@gmail.com" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>닉네임</Label>
              <Input type="text" placeholder="배유철" />
            </div>
          </div>
        </div>
        <Button type="submit" variant="violet" size="input" text="input" className="self-end">
          저장
        </Button>
      </form>
    </div>
  );
}
