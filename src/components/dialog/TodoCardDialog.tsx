import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '../ui/dialog';
import TodoCard from '../domains/dashboard/column/TodoCard';
import TodoCardModal from '../modal/TodoCardModal';
import { Card, Column } from '@/types/DashboardType';
import { useState } from 'react';

const TodoCardDialog = ({
  card,
  column,
  columns,
  columnTitle,
  getCard,
  onClick,
}: {
  card: Card;
  column: Column;
  columns: Column[];
  columnTitle: string;
  getCard: () => void;
  onClick: (cardId: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen((prev) => !prev);
  };
  const handleDeleteButton = () => {
    onClick(card.id);
    handleOpenChange();
  };

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={handleOpenChange}>
        <TodoCard card={card} />
      </DialogTrigger>
      <DialogOverlay
        onClick={handleOpenChange}
        className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"
      />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <TodoCardModal
          getCard={getCard}
          card={card}
          column={column}
          columns={columns}
          columnTitle={columnTitle}
          onClick={handleDeleteButton}
          toggleModal={handleOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TodoCardDialog;
