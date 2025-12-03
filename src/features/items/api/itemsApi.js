import { instance } from '../../../lib/axios';

/*
 * [캐싱 전략 메모]
 *
 * - 초기 아이디어
 *   - "처음에 최신/좋아요 정렬 데이터 50개씩 미리 받아 두고,
 *      클라이언트에서 slice로 페이지네이션/정렬을 처리하면
 *      서버 요청을 줄일 수 있지 않을까?" 라는 생각을 했었음.
 *
 * - 문제점
 *   1) 전체 상품 개수를 알 수 없고, 50개 이후 페이지로 이동하면
 *      결국 추가 요청이 필요해짐 → 클라이언트 slice 전략만으로는 전체 페이지를 커버할 수 없음.
 *   2) 화면 크기에 따라 pageSize가 달라지는 요구사항이 있어서
 *      page, pageSize, orderBy 조합별로 캐시를 나눠 관리해야 하고,
 *      이 경우 캐시 키/무효화 규칙이 과도하게 복잡해짐.
 *
 * - 현재 결론 (YAGNI) 필요하면 하자.
 *   - 지금 단계에서는 캐시를 직접 두지 않고,
 *     (page, pageSize, orderBy)에 따라 서버 페이지네이션 결과를 매번 요청하는 구조로 유지.
 */

/**
 * 전체 상품 목록을 서버에서 요청합니다.
 *
 * @param {number} page 페이지 번호 (1부터 시작)
 * @param {number} pageSize 한 페이지에 가져올 아이템 수
 * @param {string} orderBy 정렬 기준 (예: "recent", "favorite")
 * @param {string} keyword 검색어
 * @returns {Promise<any>} 서버에서 받아온 데이터 객체
 */
export async function fetchItems(page, pageSize, orderBy, keyword = "") {
  const { data } = await instance({
    url: "/products",
    params: { page, pageSize, orderBy, keyword },
  });
  return data;
}

/**
 * 상품 상세 정보를 서버에서 요청합니다.
 *
 * @param {number} id 상품 ID
 * @returns {Promise<any>} 서버에서 받아온 데이터 객체
 */
export async function fetchItem(id) {
  const { data } = await instance({
    url: `products/${id}`,
  });
  return data;
}

/** 
 * 상품 상세 코멘트를 서버에서 요청합니다.
 * 
 * @param {number} id 상품 ID
 * @param {number} limit 코멘트 가지고올 갯수
 * @param {string} cursor 현재 코멘트의 마지막 위치
*/
export async function fetchItemComment(id, limit = 5, cursor) {
  const { data } = await instance({
    url: `products/${id}/comments/`,
    params: {
      limit,
      cursor
    }
  });

  return data;
}