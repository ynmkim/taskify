import { DialogModal } from '@/components/common/DialogModal';
import { CreateCardModal } from '@/components/modal/CreateCardModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button text="login" size="login" variant="violet">
        로그인
      </Button>

      <DialogModal>
        <CreateCardModal />
      </DialogModal>
    </div>
  );
}
