"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Sorting = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedItem = useCallback(
    (e) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", 1);
      params.set("sort", e.target.value);
      router.replace(`${pathname}?${params}`);
    },
    [searchParams, router, pathname]
  );

  return (
    <div className="w-52 flex flex-row gap-2">
      <Select
        label="Sort By"
        selectionMode="single"
        onChange={selectedItem}
        defaultSelectedKeys={[searchParams.get("sort") || "trade_id,asc"]}
      >
        {select_item.map((v, i) => (
          <SelectItem key={v.query} value={v.query}>
            {v.title}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

const select_item = [
  {
    query: "trade_id,asc",
    title: "Trade ID - ASC",
  },
  {
    query: "trade_id,desc",
    title: "Trade ID - DESC",
  },
  {
    query: "trade_price,asc",
    title: "Trade Price - ASC",
  },
  {
    query: "trade_price,desc",
    title: "Trade Price - DESC",
  },
];



export default Sorting;
