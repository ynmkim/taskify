import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DateTimePicker } from '@/components/common/DateTimePicker';

import ModalTitle from '@/components/modal/ModalTitle';
import Textarea from '@/components/common/Textarea';
import ImagePicker from '@/components/common/ImagePicker';
import AddTag from '@/components/common/AddTag';
import InputDropdown from '@/components/common/InputDropdown';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import usePostCard from '@/hooks/usePostCard';
import { Card } from '@/types/DashboardType';
import { useReducer } from 'react';
import { useRouter } from 'next/router';

interface Memberprops {
  label: string;
  value: number;
}

export interface CreateCardModalForm {
  manager: Memberprops;
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
  dashboardId: number;
  columnId?: number;
  toggleModal: () => void;
  onChange: (card: Card) => void;
}

export function CreateCardModal({ onChange, toggleModal, dashboardId, columnId }: ModalProps) {
  const form = useForm<CreateCardModalForm>({
    mode: 'onChange',
  });
  const assigneeUserId = form.watch('manager') ? form.watch('manager').value : undefined;

  const { execute: postCard, data } = usePostCard({
    assigneeUserId,
    dashboardId,
    columnId,
    title: form.watch('title'),
    description: form.watch('description'),
    dueDate: form.watch('dueDate')?.toString(),
    imageUrl: form.watch('imageUrl'),
    tags: form.watch('tags'),
  });

  const router = useRouter();
  const handleReload = () => {
    router.reload();
  };

  const handleCancel = () => {
    form.reset();
    toggleModal();
  };
  const handleImageSelect = (imageUrl: string) => {
    form.setValue('imageUrl', imageUrl);
  };

  const onTagListChange = (newTagList: string[]) => {
    form.setValue('tags', newTagList);
  };

  const onSubmit = async () => {
    await postCard();
    handleCancel();
    // onChange(data);
    handleReload();
  };

  return (
    <div>
      <Form {...form}>
        <div className="rounded-md px-5 pt-7 pb-5 md:pt-8 md:pb-7 md:px-7  bg-white scrollbar-hide max-h-[90vh] overflow-y-auto flex flex-col ">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <ModalTitle>할 일 생성</ModalTitle>
            <div className="flex flex-col gap-8 w-full ">
              <FormField
                control={form.control}
                name="manager"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <InputDropdown
                        placeholder="이름을 입력해 주세요"
                        label="담당자"
                        dashboardId={dashboardId}
                        onChange={onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                rules={{ required: '제목은 필수로 작성해주세요.' }}
                render={({ field: { ref, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        ref={ref}
                        label="제목"
                        required
                        requiredValue={form.formState.errors.title?.message}
                        placeholder="제목을 입력해 주세요"
                        {...rest}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                rules={{ required: '설명은 필수로 작성해주세요.' }}
                render={({ field: { ref, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        ref={ref}
                        label="설명"
                        {...rest}
                        required
                        requiredValue={form.formState.errors.description?.message}
                      />
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
