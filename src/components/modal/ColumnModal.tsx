import * as React from 'react';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/modal/DeleteModal';

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  label: string;
  placeholder: string;
  confirmButtonText: string;
  onConfirm: (inputValue: string) => void;
  modalType: 'delete' | '';
}

const ColumnModal: React.FC<ColumnModalProps> = ({ isOpen, onClose, title, label, placeholder, confirmButtonText, onConfirm, modalType }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const emailValidCheck = (username: string) => {
    return emailRegEx.test(username);
  }

  const handleConfirm = () => {
    onConfirm(inputValue);
    setInputValue('');
    onClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };


  React.useEffect(() => {
    if (isOpen) {
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    } else if (!isDeleteModalOpen) {
      document.body.style.backgroundColor = 'initial';
    }
    return () => {
      if (!isDeleteModalOpen && !isOpen) {
        document.body.style.backgroundColor = 'initial';
      }
    };
  }, [isOpen, isDeleteModalOpen]);

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
                onChange={(e) => {setInputValue(e.target.value); emailValidCheck(e.target.value)}}
              />
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
                  {emailValidCheck(inputValue) ? (
                    <Button variant="violet" size="modal" text="login" onClick={handleConfirm} className="text-sm lg:text-base md:text-base w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px]">
                      {confirmButtonText}
                    </Button>
                  ) : <Button variant="violet" size="modal" text="login" onClick={handleConfirm} disabled className="text-sm lg:text-base md:text-base w-[132px] lg:w-[120px] md:w-[120px] h-[42px] lg:h-[48px] md:h-[48px] py-[12px] lg:py-[14px] md:py-[14px] px-[56px] lg:px-[46px] md:px-[46px]">
                      {confirmButtonText}
                    </Button>}
                </div>
              </div>
            </div>) :  <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel} dashboardId={1} columnId={1} />
          }
        </div>
      )}
    </>
  );
};

export default ColumnModal;
