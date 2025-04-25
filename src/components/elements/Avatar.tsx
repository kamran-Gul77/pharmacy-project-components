import type React from "react";
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface SimplifiedAvatarProps
  extends React.ComponentPropsWithoutRef<typeof ShadcnAvatar> {
  src?: string;
  alt?: string;
  fallback?: string;
  fallbackClassName?: string;
  imageClassName?: string;
}

const Avatar = ({
  src,
  alt = "",
  fallback,
  className,
  fallbackClassName,
  imageClassName,
  ...props
}: SimplifiedAvatarProps) => {
  return (
    <ShadcnAvatar className={className} {...props}>
      {src && <AvatarImage src={src} alt={alt} className={imageClassName} />}
      {fallback && (
        <AvatarFallback className={fallbackClassName}>
          {fallback}
        </AvatarFallback>
      )}
    </ShadcnAvatar>
  );
};
export default Avatar;
