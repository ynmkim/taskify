import { useState, useEffect } from 'react';
import { cn } from '@/libs/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/base-input';
import { Button } from '@/components/ui/button';
import AvatarInput from '@/components/domains/mypage/AvatarInput';
import axios from '@/libs/axios';
interface ProfileFormProps {
  className?: string;
  user: {
    email: string;
    nickname: string;
    profileImageUrl: File | null;
  };
}

function ProfileForm({ className, user, ...props }: ProfileFormProps) {
  const [values, setValues] = useState({
    email: user.email,
    nickname: user.nickname,
    profileImageUrl: null,
  });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const hasChanges = values.nickname !== user.nickname || values.profileImageUrl !== user.profileImageUrl;

    setIsDisabled(!hasChanges);
  }, [values, user]);

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

  async function updateMeImage() {
    const formData = new FormData();
    
    if (values.profileImageUrl) {
      formData.append('profileImageUrl', values.profileImageUrl);
    }

    try {
      await axios.post('/user/me/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('이미지 업로드 성공!');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  }

  // async function updateMe(formData) {
  //   const res = await axios.patch('/user/me', formData);
  //   const nextUser = res.data;
  //   setValues(nextUser);
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);

    updateMeImage();

    // updateMe(formData);
    // TODO: 성공시 toast 팝업 띄우기 "프로필 정보 변경이 완료되었습니다!"
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex justify-center items-center w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-md bg-[#F5F5F5]">
          <AvatarInput name="profileImageUrl" value={values.profileImageUrl} onChange={handleChange} />
        </div>
        <div className="flex flex-col grow gap-5">
          <div className="flex flex-col gap-2.5">
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              defaultValue={values.email}
              onChange={handleInputChange}
              readOnly
              disabled
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>닉네임</Label>
            <Input type="text" name="nickname" defaultValue={values.nickname} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      {/* TODO: 수정 사항 있을 때 disabled state false로 바꾸기 근데 value 값이 바뀌었다는 건 어떻게 확인하지? */}
      <Button type="submit" variant="violet" size="input" text="input" className="self-end" disabled={isDisabled}>
        저장
      </Button>
    </form>
  );
}

export default ProfileForm;
