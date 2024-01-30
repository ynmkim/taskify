import Image from "next/image";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Chip } from "../ui/tag";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import Comment from "./Comment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const TodoCardModal = () => {
  return(
    <div className="w-screen h-screen fixed top-0 left-0 opacity-70 bg-black-000000 flex justify-center items-center">
      <div className="px-7 py-8 bg-white flex flex-col gap-6 w-[730px] rounded-lg">
        <div className="flex items-center justify-between">
          <p className="text-black-333236 font-Pretendard text-2xl leading-none font-bold">새로운 일정 관리 Taskify</p>
          <div className="flex items-center gap-6">
            <Popover>
              <PopoverTrigger><button><IoEllipsisVerticalSharp className="w-7 h-7"/></button></PopoverTrigger>
              <PopoverContent className="flex flex-col w-[110px] border rounded-md border-gray-D9D9D9 bg-white shadow px-1.5 py-1.5">
                <button className="rounded font-Pretendard py-1 px-4 text-violet-5534DA bg-violet-8%">수정하기</button>
                <button className="rounded font-Pretendard py-1 px-4">삭제하기</button>
              </PopoverContent>
            </Popover>
            <button><IoClose className="w-7 h-7"/></button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5">
              <Chip variant="primary" size="large">To Do</Chip>
              <div className="w-px h-5 bg-gray-D9D9D9" />
              <div className="flex gap-1.5">
                <Chip variant="basic" color="orange" size="large">프로젝트</Chip>
                <Chip variant="basic" color="green" size="large">일반</Chip>
                <Chip variant="basic" color="pink" size="large">백엔드</Chip>
                <Chip variant="basic" color="blue" size="large">상</Chip>
              </div>
            </div>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, nemo numquam quaerat ex quae ipsum praesentium voluptatem rem sed quibusdam quo accusamus nobis, vel inventore! Inventore nemo fuga vitae qui?
            </p>
            <div className="relative w-[450px] h-[263px]">
              <Image src='/landing.jpg' alt="임시" fill/>
            </div>
            <form action="" className="w-[450px] flex flex-col gap-2.5 relative">
              <label className="font-Pretendard text-base font-medium text-black-333236">댓글</label>
              <textarea className="border rounded-md px-4 py-4 h-[110px]" placeholder="댓글 입력하기"/>
              <Button text='input' size='input' className="absolute right-3 bottom-3">입력</Button>
            </form>
            <div>
              <Comment />
            </div>
            <div></div>
          </div>
          <div className="border py-4 px-4 w-[200px] h-[155px] rounded-lg border-gray-D9D9D9 shrink-0 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <p className="font-Pretendard font-semibold text-xs">담당자</p>
              <div className="flex items-center gap-2">
                <Avatar nickname="B"className="w-[34px] h-[34px]"/>
                <p className="font-Pretendard text-sm text-black-333236">배유철</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="font-Pretendard font-semibold text-xs">마감일</p>
              <p className="font-Pretendard text-sm text-black-333236">2022.12.30 19:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TodoCardModal;
