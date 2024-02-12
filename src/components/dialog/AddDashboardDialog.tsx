import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '../ui/dialog';
import CreateDashboardModal from '../domains/mydashboard/CreateDashboardModal';
import { ReactNode } from 'react';
import { Dashboard } from '@/types/DashboardType';

const AddDashboardDialog = ({children, onChange}:{children:ReactNode, onChange?:(dashboard:Dashboard) => void}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center w-full">
        {children}
      </DialogTrigger>
      <DialogOverlay className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <CreateDashboardModal onChange={onChange}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddDashboardDialog;
