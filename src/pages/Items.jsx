/*
 * Items 페이지
 * 아이템 목록 페이지
 *
 * @returns {JSX.Element} Items 페이지
 */

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import styles from "./Items/Items.module.css";

import { useState, useEffect } from "react";
import { fetchItems } from "../features/items/api/itemsApi";

// 유틸리티
import { getPagination } from "../utility/pagination";

import {
  BestProducts,
  AllProducts,
  Pagination,
} from "../features/items/components";

export default function Items() {
  // 상품 목록 State
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);

  // 전체 상품 관리 State
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("recent");
  const [bestSize, setBestSize] = useState(4);

  // 스켈레톤 UI 로딩
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const { hasPrevPage, hasNextPage, visiblePages } = getPagination(
    totalCount,
    currentPage,
    pageSize,
    5
  );

  const sliceFavoite = [...bestItems].slice(0, bestSize);

  // 마운트되었을때 베스트 상품 4개 요청, 이 값을 가지고 베스트 상품에 대한 컨트롤을 담당한다.
  useEffect(() => {
    let timeout;
    try {
      Promise.all([
        fetchItems(1, 4, "favorite"),
        fetchItems(1, 10, "recent"),
      ]).then((value) => {
        const [favorite, items] = value;

        setBestItems(favorite.list);
        setItems(items.list);
        setTotalCount(items.totalCount);
      }).catch((err) => {
        setIsError(err);
      });
    } finally {
      timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, []);

  // 이건 나중에 분리. 당장은 불필요함.
  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 768px)");
    const tabletMedia = window.matchMedia(
      "(min-width: 768px) and (max-width: 1200px)"
    );
    const pcMedia = window.matchMedia("(min-width: 1200px)");

    function handleMobileChange(e) {
      if (e.matches) {
        setPageSize(4);
        setBestSize(1);
      }
    }

    function handleTabletChange(e) {
      if (e.matches) {
        setPageSize(6);
        setBestSize(2);
      }
    }

    function handlePCChange(e) {
      if (e.matches) {
        setPageSize(10);
        setBestSize(4);
      }
    }

    handleMobileChange(mobileMedia);
    handleTabletChange(tabletMedia);
    handlePCChange(pcMedia);

    mobileMedia.addEventListener("change", handleMobileChange);
    tabletMedia.addEventListener("change", handleTabletChange);
    pcMedia.addEventListener("change", handlePCChange);
  }, []);

  // 의존성 주입으로 현재 페이지, 노출될 아이템, 정렬 기준에 따라 재요청
  useEffect(() => {
    fetchItems(currentPage, pageSize, orderBy).then(({ list, totalCount }) => {
      setItems(list);
      setTotalCount(totalCount);
    });
  }, [currentPage, pageSize, orderBy]);

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

  if (loading) {
    return (
      <>
        <Header />
        <div>여기 스켈레톤 UI 보여줄꺼야.</div>
        <Footer/>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <Header />
        <div>에러 발생!!!</div>
        <Footer/>
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <div className={`container ${styles["items__container"]}`}>
          <section className={`${styles["items__section"]} ${styles["items__section--best"]}`}>
            <h1 className={`${styles["items__section__title"]}`}>베스트 상품</h1>
            <div className={`${styles["items__section__lists"]}`}>
              <BestProducts lists={sliceFavoite} />
            </div>
          </section>
          <section className={`${styles["items__section"]} ${styles["items__section--all"]}`}>
            <div className={`${styles["items__section__header"]}`}>
              <h1 className={`${styles["items__section__title"]}`}>전체 상품</h1>
              <div className={`${styles["items__section__filter"]}`}>
                <ul className={`${styles["items__section__filter__list"]}`}>
                  <li>
                    <button
                      className={`${styles["items__section__filter__button"]} ${
                        orderBy === "recent"
                          ? styles["items__section__filter__button--active"]
                          : ""
                      }`}
                      onClick={() => {
                        setOrderBy("recent");
                      }}
                    >
                      최신순
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles["items__section__filter__button"]} ${
                        orderBy === "favorite"
                          ? styles["items__section__filter__button--active"]
                          : ""
                      }`}
                      onClick={() => {
                        setOrderBy("favorite");
                      }}
                    >
                      인기순
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles["items__section__lists"]}`}>
              <AllProducts lists={items} />
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
      <Footer />
    </>
  );
}
