import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/modal/DeleteModal';
import { axiosAuthInstance } from '@/libs/axios';

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  label: string;
  placeholder: string;
  confirmButtonText: string;
  onConfirm: (inputValue: string) => void;
  modalType: 'delete' | 'invite' | 'column';
  dashboardid?: string | string[] | number | undefined; 
}

const authInstance = axiosAuthInstance();

const ColumnModal: React.FC<ColumnModalProps> = ({ isOpen, onClose, title, label, placeholder, confirmButtonText, onConfirm, modalType, dashboardid }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [columns, setColumns] = useState<any[]>([]);
  const [columnId, setColumnId] = useState<string | undefined>(undefined); 
  const isInviteModal = modalType === 'invite';
  const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const emailValidCheck = (username: string) => {
    return emailRegEx.test(username);
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (modalType === 'column' && dashboardid) {
          const response = await authInstance.get(`columns?dashboardId=${dashboardid}`);
          const responseData = response.data.data;
          setColumns(responseData);
        }
      } catch (error) {
        alert('컬럼을 가져오는 중 오류가 발생했습니다: ' + (error as Error).message);
      }
    };
    fetchData();
  }, [modalType, dashboardid]);
  
  const handleCreateColumn = async () => {
    if (modalType === 'column') {
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
  
          alert('컬럼이 생성되었습니다.');
          onConfirm(inputValue);
          setInputValue('');
          onClose();
        } catch (error) {
          alert('컬럼을 생성하는 중 오류가 발생했습니다.');
        }
      } else {
        alert('이미 존재하는 컬럼입니다.');
      }
    }
  };

  const handleInvite = async () => {
    if (modalType === 'invite' && dashboardid) {
      try {
        await authInstance.post(`dashboards/${dashboardid}/invitations`, {
          email: inputValue,
        });
        alert('초대가 완료되었습니다.');
        onClose();
      } catch (error) {
        console.error('Error creating invitation:', error);
        alert('초대를 생성하는 중 오류가 발생했습니다.' + (error as Error).message);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
          {
            !isDeleteModalOpen ? (<div className={`bg-white p-6 w-[327px] lg:w-[540px] md:w-[540px]  ${modalType === 'delete' ? 'h-[300px]' : 'h-[276px]'} flex-shrink-0 rounded-md`}>
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <label className="text-lg font-medium block mb-[10px] mt-[32px]">{label}</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-3 placeholder:text-gray-500 focus:outline-violet-500"
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setInputValue(inputValue);
                  if(isInviteModal) {
                    const isValid = emailValidCheck(inputValue);
                    setIsEmailValid(isValid);
                    setErrorMessage(isValid ? '' : '이메일 형식에 올바르지 않습니다.');
                  }
                }}
              />
              {isEmailValid ? (
                  null
              ) : (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <div className={`mt-[28px] ${modalType === 'delete' ? 'lg:mt-[44px] md:mt-[44px]' : 'mt-[28px]'} flex flex-col lg:flex-row md:flex-row items-start lg:items-end md:items-end ${modalType === 'delete' ? 'justify-between' : 'justify-end'}`}>
                {modalType === 'delete' && (
                  <button className="text-[#9FA6B2] font-normal text-sm underline mb-[16px] lg:mb-0 md:mb-0" onClick={handleDeleteClick}>
                    삭제하기
                  </button>
                )}
                <div>
                  <Button variant="default" size="modal" text="modal" onClick={onClose} className="w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px] mr-[12px]">
                    취소
                  </Button>
                  {modalType === 'invite' && emailValidCheck(inputValue) ? (
                    <Button variant="violet" size="modal" text="login" onClick={handleInvite} className="text-sm lg:text-base md:text-base w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px]">
                      {confirmButtonText}
                    </Button>
                  ) : (modalType === 'invite' && (
                    <Button variant="violet" size="modal" text="login" disabled className="text-sm lg:text-base md:text-base w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px]">
                      {confirmButtonText}
                    </Button>
                  ))}
                  {modalType === 'column' && (
                    <Button variant="violet" size="modal" text="login" onClick={handleCreateColumn} disabled={!inputValue.trim()} className="text-sm lg:text-base md:text-base w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px]">
                      {confirmButtonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>) :  <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel} dashboardid={dashboardid} columnId={columnId} inputValue={inputValue} />
          }
        </div>
      )}
    </>
  );
};

export default ColumnModal;
