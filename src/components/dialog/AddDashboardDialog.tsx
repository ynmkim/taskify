import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '../ui/dialog';
import CreateDashboardModal from '../domains/mydashboard/CreateDashboardModal';
import { ReactNode } from 'react';
import { Dashboard } from '@/types/DashboardType';
import useToggle from '@/hooks/useToggle';

const AddDashboardDialog = ({children, onChange}:{children:ReactNode, onChange?:(dashboard:Dashboard) => void}) => {
  const {isOpen, toggleModal} = useToggle();

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={toggleModal} className="flex items-center w-full">
        {children}
      </DialogTrigger>
      <DialogOverlay onClick={toggleModal} className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <CreateDashboardModal onChange={onChange} onToggle={toggleModal}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddDashboardDialog;
