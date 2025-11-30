/**
 * 페이지네이션 계산 유틸리티
 *
 * 주어진 전체 아이템 수(totalItems)와 현재 페이지(currentPage)를 기반으로
 * 페이지네이션에 필요한 각종 값을 계산해 반환합니다.
 *
 * pageSize는 "한 페이지에 몇 개의 아이템을 보여줄지",
 * pageBlock은 "페이지네이션 버튼을 몇 개씩 묶어서 보여줄지"를 의미합니다.
 *
 * @param {number} totalItems 총 아이템 개수
 * @param {number} currentPage 현재 페이지 번호 (1부터 시작)
 * @param {number} [pageSize=10] 페이지당 출력할 아이템 수
 * @param {number} [pageBlock=5] 페이지네이션 버튼 묶음 크기
 * @returns {{
*   totalPages: number,      // 전체 페이지 수
*   startPage: number,       // 현재 블록의 시작 페이지 번호
*   endPage: number,         // 현재 블록의 끝 페이지 번호
*   hasPrevPage: boolean,    // 이전 페이지 존재 여부
*   hasNextPage: boolean,    // 다음 페이지 존재 여부
*   visiblePages: number[]   // 실제 화면에 출력할 페이지 번호 배열
* }}
*/
export function getPagination(totalItems, currentPage, pageSize = 10, pageBlock = 5) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const startPage =
    Math.floor((currentPage - 1) / pageBlock) * pageBlock + 1;
  const endPage = Math.min(startPage + pageBlock - 1, totalPages);

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // 조금 더 멋있게 할 수 있지만 제일 이해하기 쉬운 코드로!
  const visiblePages = []

  for(let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return {
    totalPages,
    startPage,
    endPage,
    hasPrevPage,
    hasNextPage,
    visiblePages
  };
}
