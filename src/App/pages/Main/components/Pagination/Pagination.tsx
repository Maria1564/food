import classNames from "classnames";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import ArrowLeftIcon from "./ArrowLeftIcon";
import ArrowRightIcon from "./ArrowRightIcon";
import s from "./Pagination.module.scss";
import { createPagination } from "./utils";
import { ParamsContext } from "../../../../.././App/provider/QueryContext";

type PaginationProps = {
  totalRecipes: number;
};

const Pagination: React.FC<PaginationProps> = ({
  totalRecipes,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<(string | number)[]>([]);
  const [page, setPage] = useState<number>(Number(searchParams.get("page")));
  const objContext = useContext(ParamsContext)

  const createNewQuery = useCallback(
    (key: string, page: string) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        // console.log(params)
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
      const query = searchParams.get("query") || ""
      console.log("q", query)
      createNewQuery("page", String(currentPage));
      objContext?.handlerQueryParams(offset, Number(currentPage), query );
    },
    [page, createNewQuery, objContext?.handlerQueryParams]
  );

  const togglePrevArrow = useCallback(() => {
    createNewQuery("page", String(Number(page) - 1));
    const query = searchParams.get("query") || ""
    objContext?.handlerQueryParams( (Number(page) - 2) * 9, Number(page) - 1,  query );
  }, [createNewQuery, page, objContext?.handlerQueryParams]);

  const toggleNextArrow = useCallback(() => {
    createNewQuery("page", String(Number(page) + 1));
    const query = searchParams.get("query") || ""
    objContext?.handlerQueryParams( Number(page) * 9, Number(page) + 1, query );
  }, [createNewQuery, objContext?.handlerQueryParams, page]);
  console.log(pages)
  if(totalRecipes === 0) {
    return <></>
  }

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
