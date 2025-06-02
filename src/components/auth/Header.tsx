import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from '@/assets/images/logo.png';

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div
      className={cn("w-full flex flex-col gap-y-4 items-center justify-center")}
    >
      <div className="flex justify-center items-center gap-2">
        <Image src={logo} width={50} height={50} alt="Logo" />
        <h1 className="text-3xl font-semibold">Vocablaze</h1>
      </div>

      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
