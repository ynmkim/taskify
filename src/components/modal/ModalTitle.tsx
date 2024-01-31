import { ReactNode } from 'react';

interface ModalTitleProps {
  children: ReactNode;
}

export default function ModalTitle({ children }: ModalTitleProps) {
  return (
    <div
      className={`font-bold text-[20px] my-[4px] w-[287px] lg:w-[484px] lg:text-[24px]`}
    >
      {children}
    </div>
  );
}
