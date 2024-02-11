import CardTitle from '../../common/CardTitle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/base-input';
import { Label } from '@/components/ui/label';
import { postDashboard } from '@/api/fetchDashboard';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
interface FormFields {
  title: string;
  color: string;
}

export default function CreateDashboardModal() {
  const {
    register,
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      title: '',
      color: '',
    },
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = async ({ title, color }: FormFields) => {
    const data = { title, color };

    const dashboardId = await postDashboard(data);
    router.push(`dashboard/${dashboardId}`);

    reset({ title: '', color: '' });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="z-10 w-full h-screen fixed top-0 left-0 bg-black-000000 bg-opacity-70 transition-opacity">
      <div className="w-full h-full flex justify-center items-center px-6">
        <div className="max-w-[540px] w-full py-7 px-5 md:pt-8 md:pb-7 md:px-7 rounded-lg bg-white">
          <CardTitle className="mb-6 md:mb-8">새로운 대시보드</CardTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2.5 md:gap-3 mb-6 md:mb-7">
              <Label>대시보드 이름</Label>
              <Input type="text" {...register('title')} />
            </div>

            <RadioGroup {...register('color')} defaultValue="#7AC555" className="flex gap-2 mb-6 md:mb-7">
              <RadioGroupItem {...register('color')} value="#7AC555" color="green" />
              <RadioGroupItem {...register('color')} value="#760DDE" color="purple" />
              <RadioGroupItem {...register('color')} value="#FFA500" color="orange" />
              <RadioGroupItem {...register('color')} value="#76A5EA" color="blue" />
              <RadioGroupItem {...register('color')} value="#E876EA" color="pink" />
            </RadioGroup>
            <div className="flex justify-between md:justify-end gap-[11px] md:gap-3">
              <Button size="modal" text="modal" className="flex-1 h-[42px]" onClick={handleCancel}>
                취소
              </Button>
              <Button
                type="submit"
                variant="violet"
                size="modal"
                text="modal"
                className="flex-1 h-[42px]"
                disabled={!isDirty}
              >
                생성
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
