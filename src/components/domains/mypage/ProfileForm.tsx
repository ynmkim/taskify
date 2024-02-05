import { useState } from 'react';
import { cn } from '@/libs/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/base-input';
import { Button } from '@/components/ui/button';
import AvatarInput from '@/components/domains/mypage/AvatarInput';
import users from '@/pages/api/mock/users.json';

interface FormValues {
  email: string;
  nickname: string;
  profileImage: File | null;
}

interface ProfileFormProps {
  className?: string;
}

function ProfileForm({ className, ...props }: ProfileFormProps) {
  const [values, setValues] = useState<FormValues>({
    email: users.email,
    nickname: users.nickname,
    profileImage: null,
  });

  const handleChange = (name: string, value: string | File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex justify-center items-center w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-md bg-[#F5F5F5]">
          <AvatarInput name="profileImage" value={values.profileImage} onChange={handleChange} />
        </div>
        <div className="flex flex-col grow gap-5">
          <div className="flex flex-col gap-2.5">
            <Label>이메일</Label>
            <Input type="email" name="email" value={values.email} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>닉네임</Label>
            <Input type="text" name="nickname" value={values.nickname} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <Button type="submit" variant="violet" size="input" text="input" className="self-end">
        저장
      </Button>
    </form>
  );
}

export default ProfileForm;
