import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import AddColumnButton from "../domains/dashboard/column/AddColumnButton";
import ColumnModal from "../modal/ColumnModal";

const AddColumnDialog = () => {
  return(
    <Dialog>
      <DialogTrigger>
        <AddColumnButton/>
      </DialogTrigger>
      <DialogOverlay className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0"/>
      <DialogContent>
        <ColumnModal title="새 컬럼 생성" label="이름" placeholder="새로운 프로젝트" confirmButtonText="생성" onConfirm={() => true} modalType=""/>
      </DialogContent>
    </Dialog>
  )
};

export default AddColumnDialog;
