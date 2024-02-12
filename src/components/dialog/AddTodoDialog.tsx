import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '../ui/dialog';
import AddTodoButton from '../domains/dashboard/column/AddTodoButton';
import { CreateCardModal } from '../modal/CreateCardModal';
import { useState } from 'react';

export interface ModalProps {
  dashboardId: number;
  columnId?: number;
  getCard: () => void;
}
const AddTodoDialog = ({ dashboardId, columnId, getCard }: ModalProps) => {
  const [isOpen, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={toggleModal}>
        <AddTodoButton />
      </DialogTrigger>
      <DialogOverlay onClick={toggleModal} className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <CreateCardModal getCard={getCard} toggleModal={toggleModal} dashboardId={dashboardId} columnId={columnId} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
