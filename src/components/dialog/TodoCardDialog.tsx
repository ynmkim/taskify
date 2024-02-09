import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import TodoCard from "../domains/dashboard/column/TodoCard";
import TodoCardModal from "../modal/TodoCardModal";

const TodoCardDialog = () => {
  return(
    <Dialog>
      <DialogTrigger>
        <TodoCard />
      </DialogTrigger>
      <DialogOverlay className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <TodoCardModal />
      </DialogContent>
    </Dialog>
  )
};

export default TodoCardDialog;
