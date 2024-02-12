import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';

interface UsePostCommentsProps {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

function usePostComments({ content, cardId, columnId, dashboardId }: UsePostCommentsProps) {
  const postComments = () =>
    axiosAuthInstance().post(`comments`, {
      content,
      cardId,
      columnId,
      dashboardId,
    });

  const { execute, error, data } = useAsync(postComments, true);

  return {
    execute,
    error,
    data,
  };
}

export default usePostComments;
