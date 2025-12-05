import { useState, useEffect } from "react";
import { fetchItems } from "../api/itemsApi";
import { getPagination } from "../../../utility/pagination.js";
import { debounced } from "../../../utility/delay.js";

import { useResponsiveValue } from "./useResponsive.js";

const PAGE_SIZE_MAP = { desktop: 10, tablet: 6, mobile: 4 };
const BEST_PAGE_SIZE_MAP = { desktop: 4, tablet: 2, mobile: 1 };

/**
 * 상품 목록 데이터와 페이지네이션, 검색, 정렬 기능을 관리하는 커스텀 훅
 * 
 * 화면 크기에 따라 페이지 크기가 자동으로 조정되며, 검색어는 디바운스 처리됩니다.
 * 베스트 상품은 초기 1회만 요청하고, 일반 상품 목록은 페이지/정렬/검색어 변경 시 재요청됩니다.
 * 
 * @returns {Object} 상품 목록 관련 데이터와 핸들러를 포함한 객체
 * @returns {Object} returns.ItemsData - 상품 데이터 및 로딩/에러 상태
 * @returns {Array|null} returns.ItemsData.bestItems - 베스트 상품 목록 (초기 4개)
 * @returns {Array|null} returns.ItemsData.items - 현재 페이지의 상품 목록
 * @returns {boolean} returns.ItemsData.isLoading - 로딩 상태 (bestItems와 items가 모두 null이 아닐 때 true)
 * @returns {Error|null} returns.ItemsData.isError - 에러 상태
 * 
 * @returns {Object} returns.pagination - 페이지네이션 관련 정보
 * @returns {number} returns.pagination.currentPage - 현재 페이지 번호 (1부터 시작)
 * @returns {boolean} returns.pagination.hasPrevPage - 이전 페이지 존재 여부
 * @returns {boolean} returns.pagination.hasNextPage - 다음 페이지 존재 여부
 * @returns {number[]} returns.pagination.visiblePages - 화면에 표시할 페이지 번호 배열
 * 
 * @returns {Object} returns.controls - 화면 표시 제어 값들
 * @returns {number} returns.controls.pageSize - 현재 화면 크기에 맞는 페이지 크기 (desktop: 10, tablet: 6, mobile: 4)
 * @returns {number} returns.controls.bestPageSize - 베스트 상품 표시 개수 (desktop: 4, tablet: 2, mobile: 1)
 * @returns {string} returns.controls.orderBy - 정렬 기준 ("recent" | "favorite")
 * 
 * @returns {Object} returns.handlers - 이벤트 핸들러 함수들
 * @returns {Function} returns.handlers.handlePage - 페이지 변경 핸들러
 * @param {string} returns.handlers.handlePage.type - 페이지 변경 타입 ("prev" | "next" | "number")
 * @param {number} [returns.handlers.handlePage.value] - 페이지 번호 (type이 "number"일 때 필수)
 * @returns {Function} returns.handlers.debouncedSearch - 검색어 변경 핸들러 (500ms 디바운스)
 * @param {string} returns.handlers.debouncedSearch.keyword - 검색어
 * @returns {Function} returns.handlers.setOrderBy - 정렬 기준 변경 함수
 * @param {string} returns.handlers.setOrderBy.orderBy - 정렬 기준 ("recent" | "favorite")
 * 
 * @example
 * const {
 *   ItemsData: { bestItems, items, isLoading, isError },
 *   pagination: { currentPage, hasPrevPage, hasNextPage, visiblePages },
 *   controls: { pageSize, bestPageSize, orderBy },
 *   handlers: { handlePage, debouncedSearch, setOrderBy }
 * } = useItems();
 * 
 * // 페이지 변경
 * handlePage('next');
 * handlePage('prev');
 * handlePage('number', 3);
 * 
 * // 검색
 * debouncedSearch('노트북');
 * 
 * // 정렬 변경
 * setOrderBy('favorite');
 */
export const useItems = () => {
  // --- 1. 상태 (State) 정의
  const [bestItems, setBestItems] = useState(null);
  const [items, setItems] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = useResponsiveValue(PAGE_SIZE_MAP);
  const bestPageSize = useResponsiveValue(BEST_PAGE_SIZE_MAP);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [isError, setIsError] = useState(null);

  // 로딩 상태 계산 (파생상태)
  const isLoading = bestItems !== null && items !== null;

  // --- 2. 로직 & 핸들러

  // 페이지네이션 계산
  const { hasPrevPage, hasNextPage, visiblePages } = getPagination(
    totalCount,
    currentPage,
    pageSize
  );

  // 검색 핸들러 (디바운스)
  const debouncedSearch = debounced((keyword) => {
    setKeyword(keyword);
    setCurrentPage(1);
  }, 500);

  // 페이지 변경 핸들러
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

  // --- 3. Effects (데이터 fetching)

  /**
   * 베스트 아이템 요청 (1회)
   *
   * 초기 요청된 상태로 보여주는 값은 갯수 외에 다른 부분이 없어서 slice 로 관리.
   * 불필요한 추가요청 없음.
   */
  useEffect(() => {
    const fetchBestItems = async () => {
      try {
        const { list } = await fetchItems(1, 4, "favorite");
        setBestItems(list);
      } catch (error) {
        setIsError(error);
      }
    };

    fetchBestItems();
  }, []);

  /**
   * 전체 아이템 요청 (현재페이지, 보여줄 아이템 갯수, 정렬방식, 키워드를 의존)
   * 
   * 값이 변경될때마다 다시 fetch 요청
   * 이 부분은 추후 TanStack Query 로 리팩토링?
   * 
   * 지금은 임시 페이지네이션 구현으로 다소 특이한 방식으로 구현되어있음.
   * 보통은 화면 사이즈에 따라 서버에 재요청을 하지않고 배치만 다르게 하는데 여기서는 학습 목적으로
   * 화면 사이즈에 따라 다시 요청을 보내고 있음.
   */
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const { list, totalCount } = await fetchItems(currentPage, pageSize, orderBy, keyword);

        setItems(list);
        setTotalCount(totalCount);
      } catch (error) {
        setIsError(error);
      }
    };

    fetchAllItems();
  }, [currentPage, pageSize, orderBy, keyword]);

  return {
    ItemsData: { bestItems, items, isLoading, isError },
    pagination: { currentPage, hasPrevPage, visiblePages, hasNextPage },
    controls: { pageSize, bestPageSize, orderBy },
    handlers: { handlePage, debouncedSearch, setOrderBy },
  };
};
