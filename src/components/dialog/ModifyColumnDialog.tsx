import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "../ui/dialog";
import ColumnModal from "../modal/ColumnModal";
import { MdOutlineSettings } from "react-icons/md";
import useToggle from "@/hooks/useToggle";

const ModifyColumnDialog = () => {
  const {isOpen, toggleModal} = useToggle();
  return(
    <Dialog open={isOpen}>
      <DialogTrigger onClick={toggleModal}  className="">
        <MdOutlineSettings className="w-6 h-6 text-gray-787486"/>
      </DialogTrigger>
      <DialogOverlay onClick={toggleModal} className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent>
        <ColumnModal title="컬럼 관리" label="이름" placeholder="Done" confirmButtonText="변경" onConfirm={() => true} modalType="delete" toggleModal={toggleModal}/>
      </DialogContent>
    </Dialog>
  )
};

export default ModifyColumnDialog;
