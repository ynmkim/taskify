import DashboardCardTitle from '../mydashboard/DashboaordCardTitle';
import { cn } from '@/libs/utils';
import ProfileForm from './ProfileForm';
interface ProfileCardProps {
  className?: string;
}

export default function ProfileCard({ className, ...props }: ProfileCardProps) {
  return (
    <div className={cn('pt-6 pb-5 px-4 md:pt-8 md:pb-7 md:px-7 rounded-lg bg-white', className)} {...props}>
      <DashboardCardTitle className="mb-6 md:mb-8">프로필</DashboardCardTitle>
      <ProfileForm />
    </div>
  );
}
