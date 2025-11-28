export const PAGINATION = {
  PAGE_SIZE: 10,
  PAGE_BLOCK : 5
};

/**
 * 페이지네이션 custok Hooks
 * @param {Number} totalItems - 총 아이템 갯수
 * @param {Number} currentPage - 현재 보고 있는 페이지 번호
 * @param {Number} PAGE_SIZE - 페이지당 보여줄 아이템 갯수
 * @param {Number} PAGE_BLOCK - 페이지네이션에서 보여줄 Button의 갯수
 * @returns {
 * totalPages - 총 페이지 번호
 * startPage - 페이지네이션 버튼의 노출 시작 번호
 * endPage - 페이지네이션 버튼의 노출 종료 번호
 * hasPrev - 이전 페이지 존재 여부
 * hasNext - 다음 페이지 존재 여부
 * pages - 페이지네이션 배열
 * }
 */
export function usePagination({
  totalItems = 0,
  currentPage,
  PAGE_SIZE = PAGINATION.PAGE_SIZE,
  PAGE_BLOCK = PAGINATION.PAGE_BLOCK,
}) {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const startPage =
    Math.floor((currentPage - 1) / PAGE_BLOCK) * PAGE_BLOCK + 1;
  const endPage = Math.min(startPage + PAGE_BLOCK - 1, totalPages);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pages = []

  for(let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return {
    totalPages,
    startPage,
    endPage,
    hasPrev,
    hasNext,
    pages
  };
}
