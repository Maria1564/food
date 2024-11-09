import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import s from "./Pagination.module.scss";
import { createPagination } from "./utils";

type PaginationProps = {
  setQueryParams: (prev: { offset: number; page: number }) => void;
  totalRecipes: number
};

const Pagination: React.FC<PaginationProps> = ({ setQueryParams, totalRecipes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<(string | number)[]>([]);
  const [page, setPage] = useState<number>(1);

  const createNewQuery = useCallback((key: string, page: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(key, page);
      return params;
    });
  }, [setSearchParams]);

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    if (searchParams.get("page") === null) {
      createNewQuery("page", "1");
    }
  }, [searchParams, createNewQuery]);

  

  useEffect(() => {
    createPagination(page, totalRecipes, setPages);
  }, [page, totalRecipes]);

  const handlerClick = useCallback((currentPage: number) => {
    if ( currentPage === page) {
      return;
    }
    const offset = (Number(currentPage)-1)*9;
    createNewQuery("page", String(currentPage));
    setQueryParams({ page: Number(currentPage), offset });
  }, [page, createNewQuery, setQueryParams]);

  const togglePrevArrow = useCallback(() => {
    createNewQuery("page", String(Number(page) - 1));
    setQueryParams({ page: Number(page) - 1, offset: (Number(page)-2)*9 });
  }, [createNewQuery, page, setQueryParams]);

  const toggleNextArrow = useCallback(() => {
    createNewQuery("page", String(Number(page) + 1));
    setQueryParams({ page: Number(page) + 1, offset: (Number(page))*9 });
  }, [createNewQuery, setQueryParams, page]);
  
  return (
    <div className={s.pagination__wrapper}>
      <div>
        {Number(page) !== 1 ? (
          <svg
            onClick={togglePrevArrow}
            className={s['pagination__arrow-left']}
            width="38"
            height="42"
            viewBox="0 0 38 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.12 31.5599L14.4267 22.8666C13.4 21.8399 13.4 20.1599 14.4267 19.1333L23.12 10.4399"
              stroke="#151411"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="38"
            height="42"
            viewBox="0 0 38 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.12 31.5599L14.4267 22.8666C13.4 21.8399 13.4 20.1599 14.4267 19.1333L23.12 10.4399"
              stroke="#AFADB5"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {pages.map((item, index) => {
        return (
          <div
            key={index}
            className={classNames(s.pagination__page, {
              [s['pagination__page-num']]: !isNaN(Number(item)),
              [s.pagination__page_active]: item === Number(page),
            })}
            onClick={() => handlerClick(item as number)}
          >
            {item}
          </div>
        );
      })}
      {Number(page) !== pages[pages.length - 1] ? (
        <svg onClick={toggleNextArrow}
        className={s['pagination__arrow-right']}
          width="38"
          height="42"
          viewBox="0 0 38 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.88 31.5599L23.5733 22.8666C24.6 21.8399 24.6 20.1599 23.5733 19.1333L14.88 10.4399"
            stroke="#151411"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="38"
          height="42"
          viewBox="0 0 38 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.88 31.5599L23.5733 22.8666C24.6 21.8399 24.6 20.1599 23.5733 19.1333L14.88 10.4399"
            stroke="#AFADB5"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default Pagination;
