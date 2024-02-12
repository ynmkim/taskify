import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import usePostComments from '@/hooks/usePostCommnets';
import useGetComment from '@/hooks/useGetComment';
import { Comment } from '@/types/DashboardType';

interface CommentInputProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentInput({ cardId, columnId, dashboardId, comments, setComments }: CommentInputProps) {
  const { control, watch, setValue } = useForm();
  const content = watch('comment');
  const { execute: postComments, data: updatedComments } = usePostComments({
    content,
    cardId,
    columnId,
    dashboardId,
  });
  const { data } = useGetComment({ cardId });

  useEffect(() => {
    if (!data) return;
    setComments([...data?.comments]);
  }, []);

  useEffect(() => {
    if (comments.length !== 0) {
      setComments([...comments, updatedComments]);
    } else {
      setComments([updatedComments]);
    }
  }, [updatedComments]);

  const handlePostComment = () => {
    postComments();
    setValue('comment', '');
  };

  return (
    <div className="w-[287px] md:w-[420px] lg:w-[450px] flex flex-col gap-2.5 relative">
      <label className="font-Pretendard text-base font-medium text-black-333236">댓글</label>
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            maxLength={200}
            className="border rounded-md px-4 py-4 h-[110px] focus:outline-none"
            placeholder="댓글 입력하기"
          ></textarea>
        )}
      />
      <Button text="input" size="input" className="absolute right-[12px] bottom-[12px] " onClick={handlePostComment}>
        입력
      </Button>
    </div>
  );
}

export default CommentInput;
