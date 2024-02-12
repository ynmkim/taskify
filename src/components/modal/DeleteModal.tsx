import { Button } from '@/components/ui/button';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const DeleteModal = ({ isOpen, onClose, onDelete }:ModalProps) => {
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
              <Button variant="violet" size="modal" text="login" onClick={onDelete} className="w-[120px] h-[48px] py-[14px] px-[46px]">
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
