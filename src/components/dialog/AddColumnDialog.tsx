import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '../ui/dialog';
import AddColumnButton from '../domains/dashboard/column/AddColumnButton';
import ColumnModal from '../modal/ColumnModal';
import { ChangeEvent, useEffect, useState } from 'react';
import { ColumnType } from '@/types/DashboardType';
import { axiosAuthInstance } from '@/libs/axios';

const authInstance = axiosAuthInstance();

const AddColumnDialog = ({ dashboardid }: { dashboardid: number }) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen((prev) => !prev);
  };

  const handleCreateColumn = async () => {
    const maxColumnCount = 10;

    if (columns.length >= maxColumnCount) {
      alert('컬럼의 개수는 10개를 초과할 수 없습니다.');
      return;
    }

    const isDuplicate = columns.every((column) => column.title !== inputValue);

    if (isDuplicate) {
      try {
        const response = await authInstance.post('columns', {
          title: inputValue,
          dashboardId: Number(dashboardid),
        });

        const createdColumn = response.data;
        setColumns((prevColumns) => [...prevColumns, createdColumn]);
        toggleDialog();
        alert('컬럼이 생성되었습니다.');
        setInputValue('');
      } catch (error) {
        alert('컬럼을 생성하는 중 오류가 발생했습니다.');
      }
    } else {
      alert('이미 존재하는 컬럼입니다.');
    }
  };

  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authInstance.get(`columns?dashboardId=${dashboardid}`);
        const responseData = response.data.data;
        setColumns(responseData);
      } catch (error) {
        alert('컬럼을 가져오는 중 오류가 발생했습니다: ' + (error as Error).message);
      }
    };

    fetchData();
  }, [dashboardid]);

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={toggleDialog}>
        <AddColumnButton />
      </DialogTrigger>
      <DialogOverlay onClick={toggleDialog} className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0" />
      <DialogContent>
        <ColumnModal
          title="새 컬럼 생성"
          label="이름"
          placeholder="새로운 프로젝트"
          confirmButtonText="생성"
          value={inputValue}
          onChange={handleChangeEvent}
          onConfirm={handleCreateColumn}
          modalType="column"
          toggleModal={toggleDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddColumnDialog;
