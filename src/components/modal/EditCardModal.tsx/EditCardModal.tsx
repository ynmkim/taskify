import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ModalTitle from '@/components/modal/ModalTitle';
import Textarea from '@/components/common/Textarea';
import { DateTimePicker } from '@/components/common/DateTimePicker';
import ImagePicker from '@/components/common/ImagePicker';
import AddTag from '@/components/common/AddTag';
import InputDropdown from '@/components/common/InputDropdown';

import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import usePostCard from '@/hooks/usePostCard';

export interface CreateCardModalForm {
  manager: string;
  title: string;
  description: string;
  dueDate: string | null;
  imageUrl: string | null;
  tags: string[];
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
}
export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  dashboardId: number;
  columnId: number;
  getCards: () => void;
}

export function CreateCardModal({ dashboardId, columnId }: ModalProps) {
  columnId = 9712;
  dashboardId = 2930;
  const form = useForm<CreateCardModalForm>({
    mode: 'onChange',
  });

  // const assigneeUserId = form.watch('manager') ? Number(form.watch('manager')) : undefined;

  const assigneeUserId = 798;
  const { execute: postCard } = usePostCard({
    assigneeUserId,
    dashboardId,
    columnId,
    title: form.watch('title'),
    description: form.watch('description'),
    dueDate: form.watch('dueDate')?.toString(),
    imageUrl: form.watch('imageUrl'),
    tags: form.watch('tags'),
  });

  const handleImageSelect = (imageUrl: string) => {
    form.setValue('imageUrl', imageUrl);
  };

  const onTagListChange = (newTagList: string[]) => {
    form.setValue('tags', newTagList);
  };

  const onSubmit = async () => {
    await postCard();
  };

  console.log(form.formState.isValid);

  return (
    <div>
      <Form {...form}>
        <div className="scrollbar-hide max-h-[90vh] overflow-y-auto flex flex-col gap-[20px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <ModalTitle>할 일 생성</ModalTitle>
            <div className="flex flex-col gap-8 w-full ">
              <FormField
                control={form.control}
                name="manager"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <InputDropdown label="담당자" dashboardId={dashboardId} onChange={onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field: { ref, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <Input ref={ref} label="제목" required placeholder="제목을 입력해 주세요" {...rest} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field: { ref, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea ref={ref} label="설명" {...rest} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <DateTimePicker value={value} onChange={onChange} label="마감일" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <AddTag onTagListChange={onTagListChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field: { ref, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <ImagePicker
                        ref={ref}
                        label="이미지"
                        onSelectImage={handleImageSelect}
                        columnId={columnId}
                        {...rest}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end w-full gap-[12px]">
              <DialogClose asChild>
                <Button value="cancel" text="modal" size="modal">
                  취소
                </Button>
              </DialogClose>
              <Button disabled={!form.formState.isValid} text="modal" size="modal" variant="violet">
                생성
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
