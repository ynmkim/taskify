import useToggle from "@/hooks/useToggle";
import PlusChip from "./PlusChip";
import Modal from "@/components/modal/column";

const AddColumnButton = () => {
  const { isOpen, toggleModal } = useToggle();

  return(
    <>
      <button className="flex justify-center ml-[9px] mr-[15px] my-3 md:mx-5 md:my-5 lg:mt-[68px] px-[60px] py-5 md:px-[180px] lg:px-[86px] md:py-6 bg-white rounded-md border border-gray-D9D9D9 h-fit"
        onClick={toggleModal}
      >
        <div className="flex items-center gap-3 w-fit">
          <p className="font-Pretendard text-base md:text-lg font-bold whitespace-nowrap text-black-333236 leading-none">새로운 컬럼 추가하기</p>
          <PlusChip />
        </div>
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal} title="새 컬럼 생성" label="이름" placeholder="새로운 프로젝트" confirmButtonText="생성" onConfirm={() => true} modalType=""/>
    </>
  )
};

export default AddColumnButton;
