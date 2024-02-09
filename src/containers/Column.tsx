import AddTodoDialog from "@/components/dialog/AddTodoDialog";
import ModifyColumnDialog from "@/components/dialog/ModifyColumnDialog";
import TodoCardDialog from "@/components/dialog/TodoCardDialog";
import { Badge } from "@/components/ui/badge";
import { getCard, getMoreCard } from "@/libs/network";
import { Card } from "@/types/DashboardType";
import { useEffect, useState, useRef } from "react";

const Column = ({title, id}:{title:string, id:number}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [cursorId, setCursorId] = useState(0);
  const [page, setPage] = useState(1);
  const totalCount = useRef(0);

  useEffect(() => {
    const getCardData = async() => {
      try{
        if(page === 1) {
          const cardData = await getCard(id);
          if(cardData){
            setCards(cardData.data.cards);
            setCursorId(cardData.data.cursorId);
            totalCount.current = cardData.data.totalCount;
          }
        } else {
          const cardData = await getMoreCard(id, cursorId);
          if(cardData){
            setCards((prev) => [...prev, ...cardData.data.cards])
            setCursorId(cardData.data.cursorId);
            totalCount.current = cardData.data.totalCount;
          }
        }
      } catch(error) {
        alert(error);
      }
    };

    getCardData();
  },[id, page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && cards.length < totalCount.current) {
          setPage(prev => prev + 1)
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (observer && observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [totalCount, cards.length]);

  return(
    <div className="flex flex-col bg-gray-FAFAFA gap-[25px] px-3 pt-[17px] pb-3 md:px-5 md:pb-5 md:pt-[22px] border-b lg:border-r lg:border-b-0 lg:min-h-screen border-gray-EEEEEE">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-5534DA"></div>
          <div className="flex items-center gap-3">
            <p>{title}</p>
            <Badge>{totalCount.current}</Badge>
          </div>
        </div>
        <div>
          <ModifyColumnDialog />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <AddTodoDialog />
        {cards?.map((card) => <TodoCardDialog key={card.id} card={card} columnTitle={title}/>)}
        <div ref={observerRef}></div>
      </div>
    </div>
  )
};

export default Column;
