"use client";

import { Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter,useSearchParams } from 'next/navigation';


export default function Search({
  placeholder = "Search",
  queryKey
}: {
  placeholder?: string;
  queryKey: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      params.set(queryKey, term);
    } else {
      params.delete(queryKey);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        type="text"
        startContent={
          <MagnifyingGlassIcon className="pointer-events-none shrink-0 text-2xl text-default-400" />
        }
        placeholder={placeholder}
        className="w-full max-w-40"
        variant="faded"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </>
  );
}
