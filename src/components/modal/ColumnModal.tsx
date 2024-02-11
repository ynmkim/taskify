import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/modal/DeleteModal';
import { DialogClose } from '../ui/dialog';
import { axiosAuthInstance } from '@/libs/axios';

interface ColumnModalProps {
  title: string;
  label: string;
  placeholder: string;
  confirmButtonText: string;
  value:string;
  onChange:(e:ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  modalType: 'delete' | 'invite' | 'column'; 
}


const ColumnModal = ({ title, label, placeholder, confirmButtonText, value, onChange, onConfirm, modalType }:ColumnModalProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };



  return (
    <div className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center z-10 w-[327px] lg:w-[540px] md:w-[540px]  ${modalType === 'delete' ? 'h-[300px]' : 'h-[276px]'}`}>
      {
        !isDeleteModalOpen ? (<div className={`bg-white p-6 w-[327px] lg:w-[540px] md:w-[540px]  ${modalType === 'delete' ? 'h-[300px]' : 'h-[276px]'} flex-shrink-0 rounded-md`}>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <label className="text-lg font-medium block mb-[10px] mt-[32px]">{label}</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-3 placeholder:text-gray-500 focus:outline-violet-500"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
          />
          <div className={`mt-[28px] ${modalType === 'delete' ? 'lg:mt-[44px] md:mt-[44px]' : 'mt-[28px]'} flex flex-col lg:flex-row md:flex-row items-start lg:items-end md:items-end ${modalType === 'delete' ? 'justify-between' : 'justify-end'}`}>
            {modalType === 'delete' && (
              <button className="text-[#9FA6B2] font-normal text-sm underline mb-[16px] lg:mb-0 md:mb-0" onClick={handleDeleteClick}>
                삭제하기
              </button>
            )}
            <div>
              <DialogClose>
                <Button variant="default" size="modal" text="modal" className="w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px] mr-[12px]">
                  취소
                </Button>
              </DialogClose>
              <Button variant="violet" size="modal" text="login" onClick={onConfirm} className="text-sm lg:text-base md:text-base w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px]">
                {confirmButtonText}
              </Button>
            </div>
          </div>
        </div>) :  <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel} />
      }
    </div>
  );
};


export default ColumnModal;
