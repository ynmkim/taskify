import { Button } from '@/components/ui/button';
import React, { ReactNode } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface DialogModalProps {
  children: ReactNode;
}

export function DialogModal({ children, ...rest }: DialogModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>할 일 생성</Button>
      </DialogTrigger>
      <DialogContent {...rest}>{children}</DialogContent>
    </Dialog>
  );
}
