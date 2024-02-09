import { useState, useEffect, useRef } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './TableLayout';
import CardTitle from '@/components/common/CardTitle';
import EmptyView from './EmptyView';
import { SearchInput } from './SearchInput';
import { Button } from '@/components/ui/button';
import { InvitationData } from '@/types/InvitationType';
import fetchInvitation from '@/api/fetchInvitation';

export default function InvitedCard(initialInvitationData: InvitationData) {
  const [invitationList, setInvitationList] = useState(initialInvitationData.invitations);
  const [cursorId, setCursorId] = useState(initialInvitationData.cursorId);

  console.log('cursorId', cursorId, 'invitaions', invitationList);

  const lastElementRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (lastElementRef.current) {
      console.log('lastEl', lastElementRef.current.id);
    }
  });

  // const handleIntersect = (cursorId: number) => {
  //   fetchInvitation(cursorId);
  // };

  // const observer = new IntersectionObserver(handleIntersect, { threshold: 0.9, root: null });

  return (
    <div className="max-w-[1022px] pt-6 pb-5 px-4 md:pt-8 md:pb-0 md:px-7 rounded-lg bg-white">
      <CardTitle className="mb-6">초대받은 대시보드</CardTitle>
      {invitationList.length === 0 ? (
        <EmptyView />
      ) : (
        <>
          <SearchInput placeholder="검색" className="mb-2 md:mb-5" />
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
                        <span className="basis-10 md:hidden block text-gray-9FA6B2 text-sm whitespace-nowrap">
                          이름
                        </span>
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
        </>
      )}
    </div>
  );
}
