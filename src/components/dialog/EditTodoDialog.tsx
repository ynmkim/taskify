import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { EditCardModal } from '@/components/modal/EditCardModal.tsx';
import { Card, ColumnType } from '@/types/DashboardType';
import { useState } from 'react';

export interface ModalProps {
  card: Card;
  column: ColumnType;
  columns: ColumnType[];
}

const EditTodoDialog = ({ column, columns, card }: ModalProps) => {
  const [isOpen, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={toggleModal}>수정하기</DialogTrigger>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <EditCardModal toggleModal={toggleModal} column={column} columns={columns} card={card} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDialog;
