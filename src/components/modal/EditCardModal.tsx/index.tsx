import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';

import ModalTitle from '@/components/modal/ModalTitle';
import Textarea from '@/components/common/Textarea';
import { DateTimePicker } from '@/components/common/DateTimePicker';
import ImagePicker from '@/components/common/ImagePicker';
import AddTag from '@/components/common/AddTag';
import InputDropdown from '@/components/common/InputDropdown';
import StateDropdown from '@/components/common/StateDropdown';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import usePutCard from '@/hooks/usePutCard';
import { Column, Card } from '@/types/DashboardType';
import { useRouter } from 'next/router';
import useGetColum from '@/hooks/useGetColums';

export interface EditCardModalForm {
  manager: string;
  title: string;
  description: string;
  dueDate: string | null;
  imageUrl: string | null;
  tags: string[];
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  states: Column[];
}
export interface ModalProps {
  onCancel: () => void;
  dashboardId: number;
  columnId: number;
  getCards: () => void;
  card: Card;
  state: Column;
  states: Column[];
}

export function EditCardModal({ columnId, card }: ModalProps) {
  columnId = 971;
  const dashboardId = 2930;
  const form = useForm<EditCardModalForm>({
    mode: 'onChange',
  });

  // const assigneeUserId = form.watch('manager') ? Number(form.watch('manager')) : undefined;
  const assigneeUserId = 798;

  //대시보드에서 받아와야 Columns 데이터
  const { execute: getColum, columns: states } = useGetColum(dashboardId);
  useEffect(() => {
    getColum();
  }, [dashboardId]);

  // const state = states?.[0];

  // console.log(states);

  // const [StateId, setStateId] = useState<number>(state.id);

  const handleImageSelect = (imageUrl: string) => {
    form.setValue('imageUrl', imageUrl);
  };

  const onTagListChange = (newTagList: string[]) => {
    form.setValue('tags', newTagList);
  };
  // const handleStateChange = (newStateId: number) => {
  //   setStateId(newStateId);
  // };

  // const { execute: putCard } = usePutCard({
  //   assigneeUserId,
  //   title: form.watch('title'),
  //   description: form.watch('description'),
  //   dueDate: form.watch('dueDate')?.toString(),
  //   imageUrl: form.watch('imageUrl'),
  //   tags: form.watch('tags'),
  //   cardId: card?.id,
  //   columnId: StateId,
  // });

  const onSubmit = async () => {
    await putCard();
  };

  return (
    <div>
      <Form {...form}>
        <div className="scrollbar-hide max-h-[90vh] overflow-y-auto flex flex-col gap-[20px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <ModalTitle>할 일 수정</ModalTitle>
            <div className="flex flex-col gap-8 w-full ">
              <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                <div className="w-[287px] md:w-[217px]">
                  <FormField
                    control={form.control}
                    name="manager"
                    render={({ field: { onChange } }) => (
                      <FormItem>
                        <FormControl>
                          {/* <StateDropdown label="상태" onChange={onChange} states={states} stateTitle={state.title} /> */}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
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
                </div>
              </div>
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
