import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { axiosAuthInstance } from '@/libs/axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardid?: string | string[] | number | undefined;
  columnId?: string | string[] | number | undefined;
  inputValue?: string;
  onDeleteSuccess?: () => void;
}

const authInstance = axiosAuthInstance();

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, dashboardid, columnId, inputValue, onDeleteSuccess }) => {
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dashboardid) {
          const response = await authInstance.get(`columns?dashboardId=${dashboardid}`);
          const responseData = response.data.data;
          setColumns(responseData);
        }
      } catch (error) {
        alert('컬럼을 가져오는 중 오류가 발생했습니다: ' + (error as Error).message);
      }
    };
    fetchData();
  }, [dashboardid]);

  useEffect(() => {
    const handleColumnChange = async () => {
      try {
        if (dashboardid) {
          const response = await authInstance.get(`columns?dashboardId=${dashboardid}`);
          const responseData = response.data.data;
          setColumns(responseData);
        }
      } catch (error) {
        alert('컬럼을 가져오는 중 오류가 발생했습니다: ' + (error as Error).message);
      }
    };

    handleColumnChange();
  }, [dashboardid, columns]);

  const deleteColumn = async () => {
    try {
      if (inputValue) {
        const columnToDelete = columns.find((column) => column.title === inputValue);
        if (columnToDelete) {
          await authInstance.delete(`columns/${columnToDelete.id}`);
          const updatedColumns = columns.filter((column) => column.id !== columnToDelete.id);
          setColumns(updatedColumns);
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
          onClose();
        } else {
          alert('삭제할 컬럼을 찾을 수 없습니다.');
        }
      }
    } catch (error) {
      alert('컬럼을 삭제하는 중 오류가 발생했습니다: ' + (error as Error).message);
    }
  };
  
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white px-[24px] pt-[108px] pb-[28px] w-[327px] lg:w-[540px] md:w-[540px] h-[276px] flex-shrink-0 rounded-md flex flex-col justify-between">
            <span className="w-[100%] text-base lg:text-lg md:text-lg font-medium text-center">컬럼의 모든 카드가 삭제됩니다.</span>
            <div className={`flex items-end justify-end`}>
              <Button variant="default" size="modal" text="modal" onClick={onClose} className="w-[120px] h-[48px] py-[14px] px-[46px] mr-[12px]">
                취소
              </Button>
              <Button variant="violet" size="modal" text="login" onClick={deleteColumn} className="w-[120px] h-[48px] py-[14px] px-[46px]">
                삭제
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
