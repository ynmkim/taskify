import Image from "next/image";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Chip } from "../ui/tag";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import Comment from "./Comment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DialogClose } from "../ui/dialog";
import { Card } from "@/types/DashboardType";

const colorArray:Array<'orange'|'pink'|'blue'|'green'> = ['orange', 'pink', 'blue', 'green'];

const TodoCardModal = ({card, columnTitle, onClick, toggleModal}:{card:Card, columnTitle:string, onClick:() => void, toggleModal:() => void}) => {
  return(
    <div className="px-5 py-7 md:px-7 md:py-8 bg-white flex flex-col gap-6 w-[327px] md:w-[680px] lg:w-[730px] rounded-lg">
      <div className="flex md:items-center md:justify-between flex-col md:flex-row gap-1 md:gap-0">
        <p className="text-black-333236 font-Pretendard text-2xl leading-none font-bold order-2 md:order-1">새로운 일정 관리 Taskify</p>
        <div className="flex items-center gap-6 justify-end md:order-2">
          <Popover>
            <PopoverTrigger><div className="flex items-center"><IoEllipsisVerticalSharp className="w-5 h-5 md:w-7 md:h-7"/></div></PopoverTrigger>
            <PopoverContent className="flex flex-col w-[86px] md:w[93px] lg:w-[110px] border rounded-md border-gray-D9D9D9 bg-white shadow px-1.5 py-1.5">
              <button className="rounded font-Pretendard py-1 px-4 text-violet-5534DA bg-violet-8%">수정하기</button>
              <button className="rounded font-Pretendard py-1 px-4" onClick={onClick}>삭제하기</button>
            </PopoverContent>
          </Popover>
          <DialogClose onClick={toggleModal}>
            <div><IoClose className="w-6 h-6 md:w-7 md:h-7"/></div>
          </DialogClose>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 order-2 md:order-1">
          <div className="flex gap-5">
            <Chip variant="primary" size="large">{columnTitle}</Chip>
            <div className="w-px h-5 bg-gray-D9D9D9" />
            <div className="flex gap-1.5">
            {card.tags.map((tag, idx) => <Chip variant="basic" size="large" color={colorArray[idx % 4]} key={idx}>{tag}</Chip>)}
            </div>
          </div>
          <p className="font-Pretendard text-xs">
            {card.description}
          </p>
          {
            card.imageUrl && 
            <div className="relative w-[287px] h-[167px] md:w-[420px] md:h-[245px] lg:w-[450px] lg:h-[263px]">
              <Image src={card.imageUrl} alt="임시" fill/>
            </div>
          }
          <form action="" className="w-[287px] md:w-[420px] lg:w-[450px] flex flex-col gap-2.5 relative">
            <label className="font-Pretendard text-base font-medium text-black-333236">댓글</label>
            <textarea className="border rounded-md px-4 py-4 h-[110px]" placeholder="댓글 입력하기"/>
            <Button text='input' size='input' className="absolute right-3 bottom-3">입력</Button>
          </form>
          <div>
            <Comment />
          </div>
          <div></div>
        </div>
        <div className=" order-1 md:order-2 border py-4 px-4 md:w-[180px] lg:w-[200px] md:h-[155px] rounded-lg border-gray-D9D9D9 shrink-0 flex md:flex-col grow  gap-[62px] md:gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="font-Pretendard font-semibold text-[10px] md:text-xs">담당자</p>
            <div className="flex items-center gap-2">
              <Avatar size="m" nickname={card.assignee.nickname} profileImageUrl={card.assignee.profileImageUrl} />
              <p className="font-Pretendard text-xs md:text-sm text-black-333236">{card.assignee.nickname}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-Pretendard font-semibold text-[10px] md:text-xs">마감일</p>
            <p className="font-Pretendard text-xs md:text-sm text-black-333236 flex items-center grow md:grow-0 md:items-start md:block">{card.dueDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TodoCardModal;
