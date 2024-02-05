import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import ColumnModal from "../modal/ColumnModal";
import { MdOutlineSettings } from "react-icons/md";

const ModifyColumnDialog = () => {
  return(
    <Dialog>
      <DialogTrigger className="">
        <MdOutlineSettings className="w-6 h-6 text-gray-787486"/>
      </DialogTrigger>
      <DialogOverlay className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent>
        <ColumnModal title="컬럼 관리" label="이름" placeholder="Done" confirmButtonText="변경" onConfirm={() => true} modalType="delete"/>
      </DialogContent>
    </Dialog>
  )
};

export default ModifyColumnDialog;
