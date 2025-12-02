
/**
 * 디바운스
 * 
 * 행동이 종료되고 delay 시간 이후 이벤트 호출
 * 
 * @param {function} callback 호출할 함수
 * @param {number} [delay=300] 지연시간
*/
export function debounced(callback, delay = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  }
}