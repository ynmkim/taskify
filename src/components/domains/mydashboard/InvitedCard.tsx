import { useState, useEffect, useRef, useCallback } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './TableLayout';
import CardTitle from '@/components/common/CardTitle';
import EmptyView from './EmptyView';
import { SearchInput } from './SearchInput';
import { Button } from '@/components/ui/button';
import { Invitation, InvitationData } from '@/types/InvitationType';
import fetchInvitation from '@/api/fetchInvitation';
import replyInvitation from '@/api/replyInvitation';

export default function InvitedCard(initialInvitationData: InvitationData) {
  const [invitationList, setInvitationList] = useState<Invitation[] | []>(initialInvitationData.invitations);
  const [cursorId, setCursorId] = useState<number | null>(initialInvitationData.cursorId);

  const lastElementRef = useRef<HTMLTableRowElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && cursorId !== null) {
          fetchInvitation(cursorId)
            .then((res) => {
              if (res) {
                // TODO: 하나의 함수에서 set 두개 사용 금지. (but 동작은 잘 되고 log가 이상함)
                // 리팩토링 필요
                setInvitationList((prev) => [...prev, ...res.invitations]);
                setCursorId(res.cursorId);
                console.log('새로운 cursorId:', cursorId, '추가된 invitations:', invitationList);
              }
            })
            .catch((error) => {
              console.log(error);
              throw new Error(error);
            });
        }
      });
    },
    [cursorId],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.8, root: null });

    lastElementRef.current && observer.observe(lastElementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, lastElementRef]);

  const handleReplyInvitation = (invitationId: number, inviteAccepted: boolean) => {
    replyInvitation(invitationId, inviteAccepted).then(() => {
      setInvitationList((prev) => {
        return prev.filter((e) => e.id !== invitationId);
      });
    });
  };

  return (
    <div className="max-w-[1022px] pt-6 pb-5 px-4 md:pt-8 md:pb-0 md:px-7 rounded-lg bg-white">
      <CardTitle className="mb-6">초대받은 대시보드</CardTitle>
      {/* TODO: invitationList(화면단)으로 체크하면 렌더링 되지않은 뒤쪽 데이터 체크 불가 */}
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
                        <Button
                          variant="violet"
                          size="input"
                          text="input"
                          className="w-full h-8 md:w-[84px] md:h-8"
                          onClick={() => handleReplyInvitation(invitation.id, true)}
                        >
                          수락
                        </Button>
                        <Button
                          size="input"
                          text="input"
                          className="w-full h-8 md:w-[84px] md:h-8"
                          onClick={() => handleReplyInvitation(invitation.id, false)}
                        >
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
