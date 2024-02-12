import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "../ui/dialog";
import ColumnModal from "../modal/ColumnModal";
import { MdOutlineSettings } from "react-icons/md";
import useToggle from "@/hooks/useToggle";
import { ChangeEvent, useState } from "react";
import { deleteColumn, putColumn } from "@/libs/network";

const ModifyColumnDialog = ({columnId, title, onChange, onChangeColumn}:{columnId:number, title:string, onChange:(value:string) => void, onChangeColumn:(id:number) => void}) => {
  const [inputValue, setInputValue] = useState(title);
  const {isOpen, toggleModal} = useToggle();

  const handleChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleModifyColumn = async() => {
    try{
      const response = await putColumn(columnId, inputValue);
      onChange(inputValue);
      toggleModal();
    } catch(error) {
      alert(error);
    }
  };

  const handleDeleteColumn = async() => {
    try{
      const response = await deleteColumn(columnId);
      onChangeColumn(columnId);
      toggleModal();
    } catch(error){
      alert(error)
    }
  };
  return(
    <Dialog open={isOpen}>
      <DialogTrigger onClick={toggleModal}  className="">
        <MdOutlineSettings className="w-6 h-6 text-gray-787486"/>
      </DialogTrigger>
      <DialogOverlay onClick={toggleModal} className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent>
        <ColumnModal title="컬럼 관리" label="이름" placeholder="Done" confirmButtonText="변경" onConfirm={handleModifyColumn} modalType="delete" toggleModal={toggleModal} value={inputValue} onChange={handleChangeValue} onDelete={handleDeleteColumn}/>
      </DialogContent>
    </Dialog>
  )
};

export default ModifyColumnDialog;
