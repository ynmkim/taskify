import { useCallback } from 'react';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';
import { useAsync } from '@/hooks/useAsync';
import { CreateCard } from '@/types/DashboardType';

const usePostCard = ({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: CreateCard) => {
  const postCard = useCallback(
    () =>
      axiosAuthInstance().post<CreateCard>('cards', {
        assigneeUserId,
        dashboardId,
        columnId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      }),
    [assigneeUserId, dashboardId, columnId, title, description, dueDate, tags, imageUrl],
  );

  const { execute, error, data } = useAsync(postCard, true);

  return {
    execute,
    error,
    data,
  };
};

export default usePostCard;
