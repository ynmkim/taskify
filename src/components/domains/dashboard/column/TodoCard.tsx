import { Avatar } from "@/components/ui/avatar";
import { Chip } from "@/components/ui/tag";
import Image from "next/image";
import { GoCalendar } from "react-icons/go";

const TodoCard = ({image = false}:{image?:boolean}) => {
  return(
    <div className="flex flex-col gap-2.5 py-5 px-5 border rounded-md border-gray-D9D9D9 w-[314px] h-fit">
      {image && 
        <div className="mb-0.5">
        <Image src='/landing.jpg' alt="todo 이미지" width={274} height={160}/>
      </div>}
      <div className="flex flex-col gap-2.5">
        <p className="font-Pretendard font-medium text-black-333236">새로운 일정 관리</p>
        <div className="flex gap-1.5">
          <Chip variant="basic" size="large" color="orange">프로젝트</Chip>
          <Chip variant="basic" size="large" color="pink">백엔드</Chip>
        </div>
      </div>
      <div className="flex w-[274px] justify-between">
        <div className="flex gap-1.5 items-center">
          <span><GoCalendar /></span>
          <p>2023.01.27</p>
        </div>
        <Avatar />
      </div>
    </div>
  )
};

export default TodoCard;
