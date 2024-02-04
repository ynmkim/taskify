import { cn } from '@/libs/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/base-input';
import { Button } from '@/components/ui/button';
import DashboardCardTitle from '../mydashboard/DashboaordCardTitle';

interface ChangePasswordCardProps {
  className?: string;
}
export default function ChangePasswordCard({ className, ...props }: ChangePasswordCardProps) {
  return (
    <div
      className={cn('max-w-[620px] pt-6 pb-5 px-4 md:pt-8 md:pb-7 md:px-7 rounded-lg bg-white', className)}
      {...props}
    >
      <DashboardCardTitle className="mb-6 md:mb-8">비밀번호 변경</DashboardCardTitle>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2.5">
          <Label>현재 비밀번호</Label>
          <Input type="password" placeholder="현재 비밀번호 입력" />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label>새 비밀번호</Label>
          <Input type="password" placeholder="새 비밀번호 입력" />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label>새 비밀번호 확인</Label>
          <Input type="password" placeholder="새 비밀번호 입력" />
        </div>

        <Button type="submit" variant="violet" size="input" text="input" className="self-end">
          변경
        </Button>
      </form>
    </div>
  );
}
