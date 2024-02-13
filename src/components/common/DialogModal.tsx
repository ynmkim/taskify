import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface DialogModalProps {
  children: ReactNode;
  name: ReactNode;
}

export function DialogModal({ children, name, ...rest }: DialogModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{name}</Button>
      </DialogTrigger>
      <DialogContent className=" px-5 pb-5 pt-7 md:px-7 md:pt-8 md:pb-7" {...rest}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
