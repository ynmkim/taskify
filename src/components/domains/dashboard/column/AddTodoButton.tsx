import PlusChip from './PlusChip';
import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface DialogModalProps {
  children: ReactNode;
}
const AddTodoButton = ({ children, ...rest }: DialogModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex justify-center px-[132px] py-1.5 md:px-[261px] md:py-[9px] lg:px-[146px] bg-white rounded-md border border-gray-D9D9D9 h-fit">
          <PlusChip />
        </button>
      </DialogTrigger>
      <DialogContent {...rest}>{children}</DialogContent>
    </Dialog>
  );
};

export default AddTodoButton;
