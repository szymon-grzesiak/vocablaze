"use client";

import { Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


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
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(queryKey, term);
    } else {
      params.delete(queryKey);
    }
    replace(`${pathname}?${params.toString()}`);

    console.log(term);
  };

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        type="text"
        startContent={
          <MagnifyingGlassIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        placeholder={placeholder}
        className="max-w-40 w-full"
        variant="faded"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </>
  );
}
