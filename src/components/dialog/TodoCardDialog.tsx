import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import TodoCard from "../domains/dashboard/column/TodoCard";
import TodoCardModal from "../modal/TodoCardModal";
import { Card } from "@/types/DashboardType";

const TodoCardDialog = ({card, columnTitle}:{card:Card, columnTitle:string}) => {
  return(
    <Dialog>
      <DialogTrigger>
        <TodoCard card={card}/>
      </DialogTrigger>
      <DialogOverlay className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <TodoCardModal card={card} columnTitle={columnTitle}/>
      </DialogContent>
    </Dialog>
  )
};

export default TodoCardDialog;
