import { useCallback } from 'react';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';
import { useAsync } from '@/hooks/useAsync';
import { CreateCard } from '@/types/DashboardType';

const usePutCard = ({
  assigneeUserId = null,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
  cardId,
  columnId,
}: CreateCard & { cardId: number; columnId: number }) => {
  const putCard = useCallback(
    () =>
      axiosAuthInstance().put<CreateCard>(`cards/${cardId}`, {
        assigneeUserId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
        columnId,
      }),
    [title, description, dueDate, tags, imageUrl, cardId, columnId, assigneeUserId],
  );

  const { execute, error, data } = useAsync(putCard, true);

  return {
    execute,
    error,
    data,
  };
};

export default usePutCard;
