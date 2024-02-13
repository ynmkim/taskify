import { ChangeEvent, useState } from "react";
import ColumnModal from "../modal/ColumnModal";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { FaRegSquarePlus } from "react-icons/fa6";
import { axiosAuthInstance } from "@/libs/axios";
import { DialogOverlay } from "@radix-ui/react-dialog";

const authInstance = axiosAuthInstance();

const InvitationDialog = ({dashboardid, onInviteSuccess = () => {}}:{dashboardid:number; onInviteSuccess?: () => void}) => {
  const [inputValue, setInputValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const toggleDialog = () => {
    setOpen(prev => !prev);
  }

  const emailValidCheck = (username: string) => {
    return emailRegEx.test(username);
  }
  
  const handleChangeEvent = (e:ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const isValid = emailValidCheck(inputValue);
    setIsEmailValid(isValid);
    setErrorMessage(isValid ? '' : '이메일 형식이 올바르지 않습니다.');
}

const handleInvite = async () => {
  if (isEmailValid) {
    try {
      await authInstance.post(`dashboards/${dashboardid}/invitations`, {
        email: inputValue,
      });
      alert('초대가 완료되었습니다.');
      toggleDialog();
      onInviteSuccess();
    } catch (e) {
      console.error('Error creating invitation:', e);
      alert('이미 초대된 멤버입니다');
    }
  }
};

  return(
    <Dialog open={open}>
      <DialogTrigger onClick={toggleDialog}>
        <div className='text-gray-787486 align-middle border border-gray-9 py-[7px] gap-2 w-[96px] lg:w-[116px] md:w-[116px] flex  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
          <span><FaRegSquarePlus className="w-0 lg:w-5 md:w-5 h-5" /></span><span>초대하기</span>
        </div>
      </DialogTrigger>
      <DialogOverlay onClick={toggleDialog} className="bg-black-000000/40 w-screen h-screen fixed top-0 left-0 z-[5]"/>
      <DialogContent className="fixed left-[50%] top-[50%] h-fit translate-x-[-50%] translate-y-[-50%] z-10">
        <ColumnModal
          title="초대하기"
          label="이메일"
          placeholder="codeit@codeit.com"
          confirmButtonText="초대"
          value={inputValue}
          onChange={handleChangeEvent}
          modalType="invite"
          onConfirm={handleInvite}
          toggleModal={toggleDialog}
        />
      </DialogContent>
    </Dialog>
  )
};

export default InvitationDialog;
