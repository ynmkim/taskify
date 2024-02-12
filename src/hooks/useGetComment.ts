import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';

interface UseGetCommentsProps {
  cardId: number;
}

function useGetComment({ cardId }: UseGetCommentsProps) {
  const getComments = () => axiosAuthInstance().get(`comments?cardId=${cardId}`);

  const { execute, error, data } = useAsync(getComments);

  return {
    execute,
    error,
    data,
  };
}

export default useGetComment;
