import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/libs/utils";
import { cva } from 'class-variance-authority';

type AvatarProps = {
  nickname?: string;
  profileImageUrl?: string;
  size: 'xs' | 's' | 'm' | 'lg' | undefined;
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const getRandomColorClass = () => {
  const colors = ['bg-orange-ffc85a', 'bg-yellow-fdd446', 'bg-blue-9dd7ed', 'bg-brown-c4b1a2', 'bg-green-a3c4a2'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
};

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
>(({ className, size, nickname, profileImageUrl, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({size,
    className})
    )}
    {...props}
  >
    {profileImageUrl !== undefined && profileImageUrl !== "" ? (
      <AvatarImage src={profileImageUrl} alt={nickname || ""} />
    ) : (
      <AvatarFallback>{nickname ? nickname[0].toUpperCase() : ""}</AvatarFallback>
    )}
  </AvatarPrimitive.Root>
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
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
      `flex h-full w-full items-center justify-center rounded-full ${getRandomColorClass()}`,
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