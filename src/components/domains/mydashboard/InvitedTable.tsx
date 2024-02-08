import React, { useRef, useEffect } from 'react';
import { cn } from '@/libs/utils';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './TableLayout';

import { Button } from '@/components/ui/button';
import { useInvitationStore } from '@/store/invitationStore';
import { Invitation } from '@/types/InvitationType';

export default function InvitedTable() {
  const invitaionData = useInvitationStore((state) => state.invitationData);
  const cursorId: number | null = invitaionData.cursorId;
  const invitationList: Invitation[] = invitaionData.invitations;
  // useInvitation에서 set해서 invitaionData를 바꾸면 useState 필요없는지 고민
  // const [cursorId, setCursorId] = useState<number | null>(invitaionData.cursorId);
  // const [invitationList, setInvitationList] = useState<Invitation[]>(invitaionData.invitations);

  console.log('cursorId', cursorId, 'invitaions', invitationList);

  const lastElementRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (lastElementRef.current) {
      console.log('lastEl', lastElementRef.current.id);
    }
  });

  return (
    <div className="max-h-[712px] md:max-h-[459px] overflow-auto">
      <Table className="table-fixed">
        <TableHeader className="sticky top-0 hidden md:table-header-group bg-white">
          <TableRow className="border-0">
            <TableHead>이름</TableHead>
            <TableHead>초대자</TableHead>
            <TableHead>수락 여부</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitationList.map((invitation, idx) => (
            <TableRow
              key={invitation.id}
              id={invitation.id.toString()}
              ref={idx === invitationList.length - 1 ? lastElementRef : null}
            >
              <TableCell>
                <div className="flex gap-4">
                  <span className="basis-10 md:hidden block text-gray-9FA6B2 text-sm whitespace-nowrap">이름</span>
                  <span className="grow">{invitation.dashboard.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <span className="basis-10 md:hidden block text-gray-9FA6B2 text-sm">초대자</span>
                  <span className="grow">{invitation.inviter.nickname}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-between md:justify-start gap-2.5">
                  <Button variant="violet" size="input" text="input" className="w-full h-8 md:w-[84px] md:h-8">
                    수락
                  </Button>
                  <Button size="input" text="input" className="w-full h-8 md:w-[84px] md:h-8">
                    거절
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
