import * as React from 'react';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { invitations } from '@/pages/api/mock/invitations.json';

export default function InvitedTable() {
  return (
    <Table>
      <colgroup>
        <col className="w-full md:w-1/3" />
        <col className="w-full md:w-1/3" />
        <col className="w-full md:w-1/3" />
      </colgroup>
      <TableHeader>
        <TableRow className="border-0">
          <TableHead>이름</TableHead>
          <TableHead>초대자</TableHead>
          <TableHead>수락 여부</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => (
          <TableRow key={invitation.id}>
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
  );
}

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full text-sm', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('hidden md:table-header-group', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn(className)} {...props} />,
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn('border-t font-medium', className)} {...props} />,
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b-[1px] border-[#EEEEEE] last:border-0', className)} {...props} />
  ),
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('py-1  border-0 text-left align-middle text-base font-normal text-gray-9FA6B2', className)}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'block md:table-cell md:py-[27px] py-2 first:pt-4 last:pb-4 align-middle text-sm md:text-base text-black-333236',
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => <caption ref={ref} className={cn(className)} {...props} />,
);
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
