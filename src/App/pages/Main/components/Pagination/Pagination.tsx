import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageStore } from "store/PageStore";
import { useLocalStore } from "utils/useLocalStore";

import ArrowLeftIcon from "./ArrowLeftIcon";
import ArrowRightIcon from "./ArrowRightIcon";
import s from "./Pagination.module.scss";
import { createPagination } from "./utils";
import { ParamsContext } from "../../../../provider/QueryContext";


type PaginationProps = {
  totalRecipes: number;
};

const Pagination: React.FC<PaginationProps> = ({
  totalRecipes,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<(string | number)[]>([]);
  const [page] = useState<number>(Number(searchParams.get("page")));
  const localPage = useLocalStore(() => new PageStore())
  const objContext = useContext(ParamsContext)

  // const objContext = useContext(ParamsContext)

  // const createNewQuery = useCallback(
  //   (key: string, page: string) => {
  //     setSearchParams((prev) => {
  //       const params = new URLSearchParams(prev);
  //       // console.log(params)
  //       params.set(key, page);
  //       return params;
  //     });
  //   },
  //   [setSearchParams]
  // );

  useEffect(() => {
    if (searchParams.get("page") === null) {
      setSearchParams(() => {
        return localPage.setPage("1")
      })
    }
    
  }, [localPage, searchParams, setSearchParams]);

  useEffect(() => {
    createPagination(page, totalRecipes, setPages);
  }, [page, totalRecipes]);

  const handlerClick = useCallback(
    (currentPage: number) => {
      if (currentPage === page) {
        return;
      }
      const offset = (Number(currentPage) - 1) * 9;
      setSearchParams(() => {
        return localPage.setPage(String(currentPage))
      },)
      const query = searchParams.get("query") || ""
      objContext?.handlerQueryParams(offset, Number(currentPage), query );
      },[localPage, objContext, page, searchParams, setSearchParams])
  

  const togglePrevArrow = useCallback(() => {
    
    const currentPage = Number(page) - 1
    const offset = (Number(currentPage) - 1) * 9; 
    setSearchParams(() => {
      return localPage.setPage(String(currentPage))
    })
    const query = searchParams.get("query") || ""
    objContext?.handlerQueryParams(offset, currentPage, query );

  }, [localPage, objContext, page, searchParams, setSearchParams]);

  


  const toggleNextArrow = useCallback(() => {
    const currentPage = Number(page) + 1
    setSearchParams(() => {
      return localPage.setPage(String(currentPage))
    })
    const query = searchParams.get("query") || ""
    objContext?.handlerQueryParams( Number(page) * 9, Number(page) + 1, query );
  }, [localPage, objContext, page, searchParams, setSearchParams]);
  
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

export default observer(Pagination) ;
