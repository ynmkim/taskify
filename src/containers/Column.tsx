import AddTodoDialog from "@/components/dialog/AddTodoDialog";
import ModifyColumnDialog from "@/components/dialog/ModifyColumnDialog";
import TodoCardDialog from "@/components/dialog/TodoCardDialog";
import { Badge } from "@/components/ui/badge";
import { getCard } from "@/libs/network";
import { Card } from "@/types/DashboardType";
import { useEffect, useState } from "react";

const Column = ({title, id}:{title:string, id:number}) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const getCardData = async() => {
      try{
        const cardData = await getCard(id);
        if(cardData){
          setCards(cardData.data.cards);
        }
      } catch(error) {
        alert(error);
      }
    };

    getCardData();
  },[id]);

  return(
    <div className="flex flex-col bg-gray-FAFAFA gap-[25px] px-3 pt-[17px] pb-3 md:px-5 md:pb-5 md:pt-[22px] border-b lg:border-r lg:border-b-0 lg:min-h-screen border-gray-EEEEEE">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-5534DA"></div>
          <div className="flex items-center gap-3">
            <p>{title}</p>
            <Badge>3</Badge>
          </div>
        </div>
        <div>
          <ModifyColumnDialog />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <AddTodoDialog />
        {cards?.map((card) => <TodoCardDialog key={card.id}/>)}
      </div>
    </div>
  )
};

export default Column;
