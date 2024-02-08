import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import { FiPlusSquare } from "react-icons/fi";
import AddDashboardModal from "../domains/mydashboard/AddDashboardModal";

const AddDashboardDialog = () => {
  return(
    <Dialog>
      <DialogTrigger>
      <button className="w-5 h-5 flex items-center justify-center"><FiPlusSquare className=" text-gray-787486"/></button>
      </DialogTrigger>
      <DialogOverlay className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent>
        <AddDashboardModal />
      </DialogContent>
    </Dialog>
  )
};

export default AddDashboardDialog;
