import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/base-input';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { useAuth } from '@/contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
interface PasswordFormProps {
  className?: string;
}
interface FormFields {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function PasswordCard({ className, ...props }: PasswordFormProps) {
  const { updatePassword } = useAuth({ required: true });
  const {
    register,
    watch,
    reset,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (watch('newPassword') !== watch('newPasswordConfirm') && watch('newPasswordConfirm')) {
      setError('newPasswordConfirm', {
        type: 'password-mismatch',
        message: '비밀번호가 일치하지 않습니다',
      });
    } else {
      clearErrors('newPasswordConfirm');
    }
  }, [watch('newPassword'), watch('newPasswordConfirm')]);

  const onSubmit = async ({ currentPassword, newPassword, newPasswordConfirm }: FormFields) => {
    const data = {
      password: currentPassword,
      newPassword: newPassword,
    };

    updatePassword(data);
    // 수정: reset 리퀘스트 성공시에만
    reset({ currentPassword, newPassword, newPasswordConfirm });
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label>현재 비밀번호</Label>
        <Input
          type="password"
          placeholder="현재 비밀번호 입력"
          {...register('currentPassword', { required: '현재 비밀번호를 입력해주세요.' })}
        />
        {errors.currentPassword && <span className="text-sm text-red-D6173A">{errors.currentPassword.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label>새 비밀번호</Label>
        <Input
          type="password"
          placeholder="새 비밀번호 입력"
          {...register('newPassword', {
            required: '새 비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '8자 이상 입력해 주세요.',
            },
          })}
        />
        {errors.newPassword && <span className="text-sm text-red-D6173A">{errors.newPassword.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label>새 비밀번호 확인</Label>
        <Input
          type="password"
          placeholder="새 비밀번호 입력"
          {...register('newPasswordConfirm', {
            required: '새 비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '8자 이상 입력해 주세요.',
            },
            validate: {
              isPasswordMatch: (value) => {
                const { newPassword } = getValues();
                return newPassword === value || '비밀번호가 일치하지 않습니다';
              },
            },
          })}
        />
        {errors.newPasswordConfirm && (
          <span className="text-sm text-red-D6173A">{errors.newPasswordConfirm.message}</span>
        )}
      </div>
      <Button type="submit" variant="violet" size="input" text="input" className="self-end" disabled={!isValid}>
        변경
      </Button>
    </form>
  );
}
