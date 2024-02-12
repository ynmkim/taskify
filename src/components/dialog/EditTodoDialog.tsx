import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { EditCardModal } from '@/components/modal/EditCardModal.tsx';
import { Card, Column } from '@/types/DashboardType';
import { useState } from 'react';

export interface ModalProps {
  card: Card;
  column: Column;
  columns: Column[];
  getCard: () => void;
}

const EditTodoDialog = ({ getCard, column, columns, card }: ModalProps) => {
  const [isOpen, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={toggleModal}>수정하기</DialogTrigger>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <EditCardModal getCard={getCard} toggleModal={toggleModal} column={column} columns={columns} card={card} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDialog;
