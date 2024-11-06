import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./Pagination.module.scss";
import classNames from "classnames";

type PaginationProps = {
  setQueryParams: (prev: { offset: number; page: number }) => void;
  totalRecipes: number
};

const Pagination: React.FC<PaginationProps> = ({ setQueryParams, totalRecipes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<(string | number)[]>([]);
  const [page, setPage] = useState("1");

  const createNewQuery = (key: string, page: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(key, page);
      return params;
    });
  };

  useEffect(() => {
    setPage(searchParams.get("page") || "1");
    if (searchParams.get("page") === null) {
      createNewQuery("page", "1");
    }
  }, [searchParams]);

  const createPagination = (currentPage: string) => {
    console.log(totalRecipes)
    const countPage = Math.ceil(totalRecipes / 9);
    if (Number(currentPage) === 1 || Number(currentPage) === 2) {
      setPages(() => [1, 2, 3, "...", countPage]);
    } else if (
      Number(currentPage) === countPage ||
      Number(currentPage) === countPage - 1
    ) {
      setPages(() => [1, "...", countPage - 2, countPage - 1, countPage]);
    } else if (Number(currentPage) === 3) {
      setPages(() => [1, 2, 3, 4, "...", countPage]);
    } else if (Number(currentPage) === countPage - 2) {
      setPages(() => [
        1,
        "...",
        countPage - 3,
        countPage - 2,
        countPage - 1,
        countPage,
      ]);
    } else {
      setPages(() => [
        1,
        "...",
        Number(currentPage) - 1,
        Number(currentPage),
        Number(currentPage) + 1,
        "...",
        countPage,
      ]);
    }
  };
  useEffect(() => {
    createPagination(page);
  }, [page, totalRecipes]);

  const handlerClick = (currentPage: string) => {
    if (isNaN(Number(currentPage)) || currentPage == page) {
      return;
    }
    const offset = (Number(currentPage)-1)*9;
    createNewQuery("page", currentPage);
    setQueryParams({ page: Number(currentPage), offset });
  };

  const togglePrevArrow = () => {
    createNewQuery("page", String(Number(page) - 1));

    setQueryParams({ page: Number(page) - 1, offset: (Number(page)-2)*9 });
  };

  const toggleNextArrow = () => {
    createNewQuery("page", String(Number(page) + 1));
    setQueryParams({ page: Number(page) + 1, offset: (Number(page))*9 });
  };
  return (
    <div className={s.wrapper_pagination}>
      <div className="">
        {Number(page) !== 1 ? (
          <svg
            onClick={togglePrevArrow}
            className={s.arrow_left}
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
            className={classNames(s.page, {
              [s.num_page]: !isNaN(Number(item)),
              [s.active_page]: item === Number(page),
            })}
            onClick={() => handlerClick(item as string)}
          >
            {item}
          </div>
        );
      })}
      {Number(page) !== pages[pages.length - 1] ? (
        <svg onClick={toggleNextArrow}
        className={s.arrow_right}
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
