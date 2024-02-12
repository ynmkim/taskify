import CardTitle from '../../common/CardTitle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/base-input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { Dashboard } from '@/types/DashboardType';
import { postDashboard } from '@/api/fetchDashboard';

interface FormFields {
  title: string;
  color: string;
}

export default function CreateDashboardModal({onChange, onToggle}:{onChange?:(dashboard:Dashboard) => void, onToggle:() => void}) {
  const {
    register,
    reset,
    formState: { isDirty },
    handleSubmit,
    control,
  } = useForm<FormFields>({
    defaultValues: {
      title: '',
      color: '#7AC555',
    },
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = async ({ title, color }: FormFields) => {
    const data = { title, color };
    if(onChange){
      try{
        const dashboard = await postDashboard(data);
        onChange(dashboard)
        onToggle();
        router.push(`/dashboard/${dashboard.id}`);
      } catch(error){
        alert(error)
      } finally {
        reset({ title: '', color: '' });
      }
    }
  };

  return (
    <div className="w-[540px] py-7 px-5 md:pt-8 md:pb-7 md:px-7 rounded-lg bg-white">
      <CardTitle className="mb-6 md:mb-8">새로운 대시보드</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5 md:gap-3 mb-6 md:mb-7">
          <Label>대시보드 이름</Label>
          <Input type="text" {...register('title')} />
        </div>

        <Controller
          name="color"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <RadioGroup value={value} onValueChange={onChange} className="flex gap-2 mb-6 md:mb-7">
                <RadioGroupItem value="#7AC555" color="green" />
                <RadioGroupItem value="#760DDE" color="purple" />
                <RadioGroupItem value="#FFA500" color="orange" />
                <RadioGroupItem value="#76A5EA" color="blue" />
                <RadioGroupItem value="#E876EA" color="pink" />
              </RadioGroup>
            );
          }}
        />

        <div className="flex justify-between md:justify-end gap-[11px] md:gap-3">
          <DialogClose onClick={onToggle}>
            <div className='inline-flex items-center justify-center px-14 py-[12px] lg:px-[46px] lg:py-[14px] text-gray-787486 text-[14px] lg:text-[16px] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            >
                취소
            </div>
          </DialogClose>
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
  );
}
