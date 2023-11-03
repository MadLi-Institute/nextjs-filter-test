"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Filtering = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSymbol = useCallback(
    (e) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", 1);
      params.set("stock_symbol", e.target.value);
      router.replace(`${pathname}?${params}`);
    },
    [searchParams, router, pathname]
  );

  const selectedBroker = useCallback(
    (e) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", 1);
      params.set("trade_broker", e.target.value);
      router.replace(`${pathname}?${params}`);
    },
    [searchParams, router, pathname]
  );

  return (
    <div className="w-full flex flex-row gap-2">
      <Select
        label="Stock Symbol"
        selectionMode="multiple"
        onChange={selectedSymbol}
        className="w-52"
      >
        {select_symbol.map((v) => (
          <SelectItem key={v} value={v}>
            {v}
          </SelectItem>
        ))}
      </Select>    
      <Select
        label="Trade Broker"
        selectionMode="multiple"
        onChange={selectedBroker}
        className="w-52"
      >
        {select_broker.map((v) => (
          <SelectItem key={v} value={v}>
            {v}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

const select_symbol = ["AAPL", "AMZN", "FB", "GOOGL", "MSFT"];
const select_broker = [
  "Charles Schwab",
  "E*TRADE",
  "Fidelity",
  "TD Ameritrade",
];

export default Filtering;
