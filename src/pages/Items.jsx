/*
 * Items 페이지
 * 아이템 목록 페이지
 *
 * @returns {JSX.Element} Items 페이지
 */

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import styles from "./Items.module.css";

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fetchItems } from "../features/items/api/itemsApi";

// 유틸리티
import { getPagination } from "../utility/pagination";

import {
  ProductsList,
  Pagination,
  ItemsSort,
  Skeleton,
} from "../features/items/components";

/**
 * 초기 페이지 사이즈를 반환하는 함수
 * 화면 크기에 따라 초기 페이지 사이즈를 반환한다.
 * 화면 크기가 768px 이하면 4, 768px 이상 1200px 이하면 6, 1200px 이상이면 10을 반환한다.
 * 
 * useState(n) 으로 설정했을때 간혹 오류가 발생 할 수 있어서 함수로 만들었다.
 * 
 * 이 부분은 AI의 도움을 받았습니다.
 * @returns {number} 초기 페이지 사이즈
 */
function getInitialPageSize() {
  const mobileMedia = window.matchMedia("(max-width: 768px)");
  const tabletMedia = window.matchMedia(
    "(min-width: 768px) and (max-width: 1200px)"
  );
  const pcMedia = window.matchMedia("(min-width: 1200px)");
  
  if (mobileMedia.matches) return 4;
  if (tabletMedia.matches) return 6;
  if (pcMedia.matches) return 10;
  
  return 10; // 기본값
}

function getInitialBestPageSize() {
  const mobileMedia = window.matchMedia("(max-width: 768px)");
  const tabletMedia = window.matchMedia(
    "(min-width: 768px) and (max-width: 1200px)"
  );
  const pcMedia = window.matchMedia("(min-width: 1200px)");
  
  if (mobileMedia.matches) return 1;
  if (tabletMedia.matches) return 2;
  if (pcMedia.matches) return 4;
  
  return 4; // 기본값
}

export default function Items() {
  // 상품 목록 State
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);

  // 전체 상품 관리 State
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(getInitialPageSize());
  const [bestPageSize, setBestPageSize] = useState(getInitialBestPageSize());
  const [orderBy, setOrderBy] = useState("recent");

  // 스켈레톤 UI 로딩
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const { hasPrevPage, hasNextPage, visiblePages } = getPagination(
    totalCount,
    currentPage,
    pageSize,
    5
  );

  // 마운트되었을때 베스트 상품 4개 요청, 이 값을 가지고 베스트 상품에 대한 컨트롤을 담당한다.
  useEffect(() => {
    let timeout;
    try {
      fetchItems(1, 4, "favorite")
        .then(({ list }) => {
          setBestItems(list);
        })
        .catch((err) => {
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
        setBestPageSize(1);
      }
    }

    function handleTabletChange(e) {
      if (e.matches) {
        setPageSize(6);
        setBestPageSize(2);
      }
    }

    function handlePCChange(e) {
      if (e.matches) {
        setPageSize(10);
        setBestPageSize(4);
      }
    }

    handleMobileChange(mobileMedia);
    handleTabletChange(tabletMedia);
    handlePCChange(pcMedia);

    mobileMedia.addEventListener("change", handleMobileChange);
    tabletMedia.addEventListener("change", handleTabletChange);
    pcMedia.addEventListener("change", handlePCChange);

    return () => {
      mobileMedia.removeEventListener("change", handleMobileChange);
      tabletMedia.removeEventListener("change", handleTabletChange);
      pcMedia.removeEventListener("change", handlePCChange);
    };
  }, []);

  // 의존성 주입으로 현재 페이지, 노출될 아이템, 정렬 기준에 따라 재요청
  useEffect(() => {
    fetchItems(currentPage, pageSize, orderBy)
      .then(({ list, totalCount }) => {
        setItems(list);
        setTotalCount(totalCount);
      })
      .catch((err) => {
        setIsError(err); // 에러 처리 추가
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
        <Skeleton bestPageSize={bestPageSize} pageSize={pageSize} />
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <div>에러 발생!!!</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className={`container ${styles["items__container"]}`}>
          <section
            className={`${styles["items__section"]} ${styles["items__section--best"]}`}
          >
            <h1 className={`${styles["items__section__title"]}`}>
              베스트 상품
            </h1>
            <div className={`${styles["items__section__lists"]}`}>
              <ProductsList lists={bestItems.slice(0, bestPageSize)} />
            </div>
          </section>
          <section
            className={`${styles["items__section"]} ${styles["items__section--all"]}`}
          >
            <div className={`${styles["items__section__header"]}`}>
              <h1 className={`${styles["items__section__title"]}`}>
                전체 상품
              </h1>
              <div
                className={`${styles["items__section__controls__search__container"]}`}
              >
                <input type="text" placeholder="검색할 상품을 입력해주세요." className={`${styles["items__section__controls__search__input"]}`} />
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
              <ProductsList lists={items} />
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
