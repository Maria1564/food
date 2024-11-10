import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ArrowLeftIcon from "./ArrowLeftIcon";
import ArrowRightIcon from "./ArrowRightIcon";
import s from "./Pagination.module.scss";
import { createPagination } from "./utils";

type PaginationProps = {
  setQueryParams: (prev: { offset: number; page: number }) => void;
  totalRecipes: number;
};

const Pagination: React.FC<PaginationProps> = ({
  setQueryParams,
  totalRecipes,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<(string | number)[]>([]);
  const [page, setPage] = useState<number>(1);

  const createNewQuery = useCallback(
    (key: string, page: string) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set(key, page);
        return params;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    if (searchParams.get("page") === null) {
      createNewQuery("page", "1");
    }
  }, [searchParams, createNewQuery]);

  useEffect(() => {
    createPagination(page, totalRecipes, setPages);
  }, [page, totalRecipes]);

  const handlerClick = useCallback(
    (currentPage: number) => {
      if (currentPage === page) {
        return;
      }
      const offset = (Number(currentPage) - 1) * 9;
      createNewQuery("page", String(currentPage));
      setQueryParams({ page: Number(currentPage), offset });
    },
    [page, createNewQuery, setQueryParams]
  );

  const togglePrevArrow = useCallback(() => {
    createNewQuery("page", String(Number(page) - 1));
    setQueryParams({ page: Number(page) - 1, offset: (Number(page) - 2) * 9 });
  }, [createNewQuery, page, setQueryParams]);

  const toggleNextArrow = useCallback(() => {
    createNewQuery("page", String(Number(page) + 1));
    setQueryParams({ page: Number(page) + 1, offset: Number(page) * 9 });
  }, [createNewQuery, setQueryParams, page]);

  return (
    <div className={s.pagination__wrapper}>
      <div>
        {page !== 1 ? (
          <ArrowLeftIcon
            color="primary"
            className={s["pagination__arrow-left"]}
            width={38}
            height={42}
            onClick={togglePrevArrow}
          />
        ) : (
          <ArrowLeftIcon
            color="secondary"
            className={s["pagination__arrow-left"]}
            width={38}
            height={42}
          />
        )}
      </div>
      {pages.map((item, index) => {
        return (
          <div
            key={index}
            className={classNames(s.pagination__page, {
              [s["pagination__page-num"]]: !isNaN(Number(item)),
              [s.pagination__page_active]: item === Number(page),
            })}
            onClick={() => handlerClick(item as number)}
          >
            {item}
          </div>
        );
      })}
      {page !== pages[pages.length - 1] ? (
        <ArrowRightIcon
          className={s["pagination__arrow-right"]}
          width={38}
          height={42}
          color={"primary"}
          onClick={toggleNextArrow}
        />
      ) : (
        <ArrowRightIcon
          className={s["pagination__arrow-right"]}
          width={38}
          height={42}
          color={"secondary"}
        />
      )}
    </div>
  );
};

export default Pagination;
