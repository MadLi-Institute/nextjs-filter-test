"use client";

import { Input } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchTxt = useCallback(
    (text) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", 1);
      params.set("search", text);
      router.replace(`${pathname}?${params}`);
    },
    [searchParams, router, pathname]
  );

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => searchTxt(e.target.value)}
        defaultValue={searchParams.get('search')}
      />
    </div>
  );
};

export default Search;
