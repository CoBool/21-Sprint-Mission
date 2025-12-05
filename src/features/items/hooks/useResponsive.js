import { useState, useEffect } from "react";
import { BREAK_POINTS, getResponsive } from "../../../utility/screen.js";

/**
 * 화면 크기에 따라 다른 값을 반환하는 커스텀 훅
 * 
 * 브레이크포인트에 따라 desktop, tablet, mobile 값 중 하나를 반환하며,
 * 화면 크기가 변경될 때마다 자동으로 값이 업데이트됩니다.
 * 
 * @param {Object} valueMap - 화면 크기별로 사용할 값 객체
 * @param {*} valueMap.desktop - 데스크톱 화면(1200px 이상)에서 사용할 값
 * @param {*} valueMap.tablet - 태블릿 화면(768px 이상 1199px 이하)에서 사용할 값
 * @param {*} valueMap.mobile - 모바일 화면(768px 미만)에서 사용할 값
 * 
 * @returns {*} 현재 화면 크기에 맞는 값
 * 
 * @example
 * // 화면 크기에 따라 다른 텍스트 표시
 * const text = useResponsiveValue({
 *   desktop: '데스크톱 화면',
 *   tablet: '태블릿 화면',
 *   mobile: '모바일 화면'
 * });
 * 
 * @example
 * // 화면 크기에 따라 다른 숫자 값 사용
 * const itemCount = useResponsiveValue({
 *   desktop: 12,
 *   tablet: 8,
 *   mobile: 4
 * });
 */
export const useResponsiveValue = (valueMap) => {
  const [value, setValue] = useState(getResponsive(valueMap));

  useEffect(() => {
    const queryMaps = [
      { query: `(min-width: ${BREAK_POINTS.DESKTOP}px)`, key: 'desktop'},
      { query: `(min-width: ${BREAK_POINTS.TABLET}px)`, key: 'tablet'},
      { query: `(min-width: ${BREAK_POINTS.MOBILE}px)`, key: 'mobile'}
    ];

    const handlers = queryMaps.map(( { query, key } ) => {
      const mql = window.matchMedia(query);
      const handler = (e) => {
        if (e.matches) {
          setValue(valueMap[key]);
        }
      }

      mql.addEventListener('change', handler);
      return { mql, handler};
    });

    return () => {
      handlers.forEach(({mql, handler}) => mql.removeEventListener('change', handler));
    }
  }, [valueMap]);

  return value;
}