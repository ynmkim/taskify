import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/base-input';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

interface PasswordFormProps {
  className?: string;
}

export default function PasswordCard({ className, ...props }: PasswordFormProps) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
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
  );
}
