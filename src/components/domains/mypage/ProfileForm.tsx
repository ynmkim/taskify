import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/base-input';
import { Button } from '@/components/ui/button';
import AvatarInput from '@/components/domains/mypage/AvatarInput';
import { cn } from '@/libs/utils';
import { useAuth } from '@/contexts/AuthProvider';
import { instance as axios } from '@/libs/axios';
import { useForm } from 'react-hook-form';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk4LCJ0ZWFtSWQiOiIyLTEwIiwiaWF0IjoxNzA3MzA3Nzg0LCJpc3MiOiJzcC10YXNraWZ5In0.0uRsiFPv86b1PRbjcCv4NEPYqDDx3uFx4gswLIkOMq8';
interface FormFields {
  email: string;
  nickname: string;
  imageFile: FileList | null;
}
interface ProfileFormProps {
  className?: string;
}

function ProfileForm({ className, ...props }: ProfileFormProps) {
  const { user, updateMe } = useAuth({ required: true });
  const {
    register,
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      nickname: '',
      imageFile: null,
    },
  });

  const onSubmit = async ({ nickname, imageFile }: FormFields) => {
    let profileImageUrl: string | null = user?.profileImageUrl ?? null;
    const file = imageFile?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/users/me/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      profileImageUrl = res?.data.profileImageUrl;
    }

    updateMe({ nickname, profileImageUrl });
  };

  useEffect(() => {
    if (user) {
      const { nickname, email } = user;
      reset({ nickname, email, imageFile: null });
    }
  }, [reset, user]);

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex justify-center items-center w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-md bg-[#F5F5F5]">
          <AvatarInput {...register('imageFile')} initialAvatar={user?.profileImageUrl} />
        </div>
        <div className="flex flex-col grow gap-5">
          <div className="flex flex-col gap-2.5">
            <Label>이메일</Label>
            <Input type="email" {...register('email')} readOnly disabled />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>닉네임</Label>
            <Input type="text" {...register('nickname')} />
          </div>
        </div>
      </div>
      <Button type="submit" variant="violet" size="input" text="input" className="self-end" disabled={!isDirty}>
        저장
      </Button>
    </form>
  );
}

export default ProfileForm;
