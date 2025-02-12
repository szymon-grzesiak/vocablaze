import { ReactNode } from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BackButton } from "./BackButton";
import { Header } from "@/components/auth/Header";
import { Social } from "@/components/auth/Social";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  className?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn("w-[400px] shadow-md flex flex-col gap-2", className)}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
