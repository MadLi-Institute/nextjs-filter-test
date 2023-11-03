"use client";

import { Button } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const Pagination = ({ page_num, total, limit }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(parseInt(page_num));
  const page_max = Math.ceil(total / limit);

  const nextBtn = useCallback(
    (num) => {
      const params = new URLSearchParams(searchParams);
      setPage((prev) => prev + num);
      params.set("page", page + num);
      router.replace(`${pathname}?${params}`);
    },
    [page, router, pathname, searchParams]
  );

  const prevBtn = useCallback(
    (num) => {
      const params = new URLSearchParams(searchParams);
      setPage((prev) => prev - num);
      params.set("page", page - num);
      router.replace(`${pathname}?${params}`);
    },
    [page, router, pathname, searchParams]
  );

  return (
    <div className="flex flex-row gap-5">
      <Button isIconOnly isDisabled={page < 2} onClick={() => prevBtn(1)}>
        Prev
      </Button>

      {page > 1 && <Button isIconOnly>{page - 1}</Button>}
      <Button isIconOnly isDisabled>
        {page}
      </Button>
      {page < page_max && <Button isIconOnly>{page + 1}</Button>}

      <Button
        isIconOnly
        isDisabled={page > page_max - 1}
        onClick={() => nextBtn(1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
