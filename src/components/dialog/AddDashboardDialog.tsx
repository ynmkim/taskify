import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "../ui/dialog";
import { FiPlusSquare } from "react-icons/fi";
import AddDashboardModal from "../domains/mydashboard/AddDashboardModal";

const AddDashboardDialog = () => {
  return(
    <Dialog>
      <DialogTrigger className="flex items-center">
        <div className="w-5 h-5 flex items-center justify-center"><FiPlusSquare className=" text-gray-787486"/></div>
      </DialogTrigger>
      <DialogOverlay className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <AddDashboardModal />
      </DialogContent>
    </Dialog>
  )
};

export default AddDashboardDialog;
