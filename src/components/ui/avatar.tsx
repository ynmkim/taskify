import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/libs/utils";
import { cva } from 'class-variance-authority';
import { axiosAuthInstance } from "@/libs/axios";

type AvatarProps = {
  user?: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
  size: 'xs' | 's' | 'm' | 'lg' | undefined;
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const authInstance = axiosAuthInstance();

const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: 'w-[24px] h-[24px]',
        s: 'w-[26px] h-[26px]',
        m: 'w-[34px] h-[34px]',
        lg: 'w-[38px] h-[38px]'
      }
    },
    defaultVariants: {
      size: "lg"
    }
  }
);

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => {
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authInstance.get('users/me');
        const data = await response.data;
        setUserData(data);
      } catch (error) {
        alert('Error fetching user data: ' + (error as Error).message);
      }
    };
  
    fetchData();
  }, []);

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, className }))}
      {...props}
    >
      {userData?.profileImageUrl ? (
        <AvatarImage src={userData.profileImageUrl} alt={userData.nickname || ""} size="lg" />
      ) : (
        <AvatarFallback>{userData ? userData.nickname[0].toUpperCase() : ""}</AvatarFallback>
      )}
    </AvatarPrimitive.Root>
  );
});

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>&{ size: AvatarProps['size']}
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    width="100%"
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-green-a3c4a2',
      className
    )}
    {...props}
  >
    <span style={{ color: "#fff", fontSize: "16px", fontWeight: 600 }}>
      {children}
    </span>
  </AvatarPrimitive.Fallback>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
