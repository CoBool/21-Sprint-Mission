/*
 * Items 페이지
 * 아이템 목록 페이지
 *
 * @returns {JSX.Element} Items 페이지
 */

import styles from "./Items.module.css";

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fetchItems } from "../features/items/api/itemsApi";

// 유틸리티
import { getPagination } from "../utility/pagination";
import { debounced } from "../utility/delay";
import { BREAK_POINTS, getResponsive } from "../utility/screen.js";

import {
  ProductsList,
  Pagination,
  ItemsSort,
  Skeleton,
} from "../features/items/components";

const PAGE_SIZE_MAP = { desktop: 10, tablet: 6, mobile: 4 };
const BEST_PAGE_SIZE_MAP = { desktop: 4, tablet: 2, mobile: 1 };

export default function Items() {
  // 상품 목록 State
  const [bestItems, setBestItems] = useState(null);
  const [items, setItems] = useState(null);

  // 전체 상품 관리 State
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(getResponsive(PAGE_SIZE_MAP));
  const [bestPageSize, setBestPageSize] = useState(
    getResponsive(BEST_PAGE_SIZE_MAP)
  );
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = debounced((keyword) => {
    setKeyword(keyword);
    // 현재 페이지 이동안시켜주면 검색한 아이템 갯수랑 일치하지않아서 있음에도 불구하고 상품을 못보는 경우가 있음. 그래서 현재 페이지를 1로 초기화해준다.
    setCurrentPage(1);
  }, 500);

  // 스켈레톤 UI 로딩
  const loading = bestItems !== null && items !== null;
  const [isError, setIsError] = useState(null);

  const { hasPrevPage, hasNextPage, visiblePages } = getPagination(
    totalCount,
    currentPage,
    pageSize,
    5
  );

  // 마운트되었을때 베스트 상품 4개 요청, 이 값을 가지고 베스트 상품에 대한 컨트롤을 담당한다.
  useEffect(() => {
    fetchItems(1, 4, "favorite")
      .then(({ list }) => {
        setBestItems(list);
      })
      .catch((err) => {
        setIsError(err);
      });
  }, []);

  /**
   * 기존 함수형에서 커링패턴으로 변경.
   * 
   * 처음 매게변수를 받아서 함수를 리턴.
   * handleChange를 호출하면 내부에서 새로운 함수 (e) => {...} 를 반환하는 방식
   * https://ko.javascript.info/currying-partials 참고.
   */
  useEffect(() => {
    const desktopMedia = window.matchMedia(
      `(min-width: ${BREAK_POINTS.DESKTOP}px)`
    );
    const tabletMedia = window.matchMedia(
      `(max-width: ${BREAK_POINTS.TABLET}px)`
    );
    const mobileMedia = window.matchMedia(
      `(max-width: ${BREAK_POINTS.MOBILE}px)`
    );

    const handleChange = (a, b) => (e) => {
      if (e.matches) {
        setPageSize(a);
        setBestPageSize(b);
      }
    };

    const handleMobileChange = handleChange(4, 1);
    const handleTabletChange = handleChange(6, 2);
    const handlePCChange = handleChange(10, 4);

    mobileMedia.addEventListener("change", handleMobileChange);
    tabletMedia.addEventListener("change", handleTabletChange);
    desktopMedia.addEventListener("change", handlePCChange);

    return () => {
      mobileMedia.removeEventListener("change", handleMobileChange);
      tabletMedia.removeEventListener("change", handleTabletChange);
      desktopMedia.removeEventListener("change", handlePCChange);
    };
  }, []);

  // 의존성 주입으로 현재 페이지, 노출될 아이템, 정렬 기준에 따라 재요청
  useEffect(() => {
    fetchItems(currentPage, pageSize, orderBy, keyword)
      .then(({ list, totalCount }) => {
        setItems(list);
        setTotalCount(totalCount);
      })
      .catch((err) => {
        setIsError(err); // 에러 처리 추가
      });
  }, [currentPage, pageSize, keyword, orderBy]);

  const handlePage = (type, value) => {
    switch (type) {
      case "prev":
        setCurrentPage((prev) => prev - 1);
        break;
      case "next":
        setCurrentPage((prev) => prev + 1);
        break;
      case "number":
        setCurrentPage(value);
        break;
    }
  };

  if (!loading) {
    return <Skeleton bestPageSize={bestPageSize} pageSize={pageSize} />;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <main>
      <div className={`container ${styles["items__container"]}`}>
        <section
          className={`${styles["items__section"]} ${styles["items__section--best"]}`}
        >
          <h1 className={`${styles["items__section__title"]}`}>베스트 상품</h1>
          <div className={`${styles["items__section__lists"]}`}>
            {bestItems && (
              <ProductsList lists={bestItems.slice(0, bestPageSize)} />
            )}
          </div>
        </section>
        <section
          className={`${styles["items__section"]} ${styles["items__section--all"]}`}
        >
          <div className={`${styles["items__section__header"]}`}>
            <h1 className={`${styles["items__section__title"]}`}>전체 상품</h1>
            <div
              className={`${styles["items__section__controls__search__container"]}`}
            >
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요."
                onChange={(e) => {
                  debouncedSearch(e.target.value);
                }}
                className={`${styles["items__section__controls__search__input"]}`}
              />
            </div>
            <Link
              to="/items/additem"
              className={`${styles["items__section__controls__button__container"]}`}
            >
              <button
                className={`${styles["items__section__controls__button"]}`}
              >
                상품 등록하기
              </button>
            </Link>
            <div className={`${styles["items__section__sort__container"]}`}>
              <ItemsSort orderBy={orderBy} setOrderBy={setOrderBy} />
            </div>
          </div>
          <div className={`${styles["items__section__lists"]}`}>
            {items && <ProductsList lists={items} />}
          </div>

          <Pagination
            currentPage={currentPage}
            hasPrevPage={hasPrevPage}
            visiblePages={visiblePages}
            hasNextPage={hasNextPage}
            onPageChange={handlePage}
          />
        </section>
      </div>
    </main>
  );
}
