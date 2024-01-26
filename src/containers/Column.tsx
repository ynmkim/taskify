import AddTodoButton from "@/components/domains/dashboard/column/AddTodoButton";
import TodoCard from "@/components/domains/dashboard/column/TodoCard";

const Column = () => {
  return(
    <div className="flex flex-col bg-gray-FAFAFA">
      <div></div>
      <div className="flex flex-col gap-4">
        <AddTodoButton />
        <TodoCard />
        <TodoCard image={true}/>
      </div>
    </div>
  )
};

export default Column;
