import { DialogModal } from '@/components/common/DialogModal';
import { CreateCardModal } from '@/components/modal/CreateCardModal';
import { EditCardModal } from '@/components/modal/EditCardModal.tsx/EditCardModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button text="login" size="login" variant="violet">
        로그인
      </Button>

      <DialogModal name="생성">
        <CreateCardModal />
      </DialogModal>
      <DialogModal name="수정">
        <EditCardModal />
      </DialogModal>
    </div>
  );
}
