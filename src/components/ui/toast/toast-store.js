// [1] 설정값 : 규칙 정의
/**
 * [1] 설정값 규칙 정의
 * 
 * - TOAST_LIMIT: 화면에 최대 3개만 쌓이도록 설정
 * - TOAST_REMOVE_DELAY: 닫힌 후 삭제 대기 시간 (약 5분)
 */
const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 1000 * 60 * 5;
const TOAST_OPTIONS = {
  type: "default",
  title: "",
  description: "",
}

/**
 * [2] 전역 상태 (싱글톤 패턴)
 * 객체로 감싸서 미래의 확장성을 고려.
 * 
 * - toasts: 토스트 메시지 배열
 */
let memoryState = {toasts: []};

/**
 * [3] 구독자 명단 (옵저버 패턴)
 * 
 * - 데이터가 변경되면 연락받을 함수 저장소
 */
const listeners = [];


/**
 * [4] ID 생성기 (유틸리티)
 * 
 * - 토스트 메시지 고유 ID 생성
 * - 고유 ID 생성 후 반환
 */
let count = 0;
function generateId() {
  count += 1;
  return count.toString();
}

/**
 * [5] 사이드 이펙트 관리
 * 
 * - 삭제 예약시스템
 * - 닫힘 상태가 된 토스트를 일정 시간 뒤 배열에서 제거.
 */
const toastTimeouts = new Map();

const addToRemoveQueue = (id) => {
  if (toastTimeouts.has(id)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(id);

    dispatch({ type: "REMOVE_TOAST", toastId: id });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(id, timeout);
}

/**
 * [6] 토스트 상태관리 함수
 * 
 * function (현재 상태, 액션 객체) => 새로운 상태 반환
 */
export const updateToast = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST": 
      return {
        ...state,
        // 새로운 토스트를 배열 앞에 추가하고, 최대 개수를 제한.
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    case "DISMISS_TOAST":  {
      const { toastId } = action;

      // 닫기 요청이 들어오면 큐(타이머)에 등록.
      if ( toastId ) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((t) => addToRemoveQueue(t.id));
      }

      // 데이터는 삭제하지 않고, 상태만 false로 변경 (애니메이션 처리를 위한 로직)
      return {
        ...state,
        toasts: state.toasts.map((t) => 
          t.id === toastId || toastId === undefined ? 
            {...t, visible: false} : t
        ),
      }
    }
    case "REMOVE_TOAST": {
      // 삭제 요청이 들어오면 데이터를 실제로 제거.
      if ( action.toastId === undefined ) {
        return { ...state, toasts: [] }
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    }

    default:
      return state;
  }
}

/**
 * [7] 액션 디스패치 함수
 * 
 * - 상태 변경을 위한 액션 전달
 */
export const dispatch = (action) => {
  memoryState = updateToast(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

/**
 * [8] 공개 함수 (Public API)
 * 
 * - 외부에서 이 함수를 쓰기 위한 도구 내보내기
 */

// 현재 상태 조회
export const getState = () => memoryState;

// 상태 변경 구독
export const subscribe = (listener) => {
  listeners.push(listener);

  // 구독 해지 함수 반환
  return () => {
    const index = listeners.indexOf(listener);
    if ( index > -1 ) {
      listeners.splice(index, 1);
    }
  }
}

/**
 * [9] 토스트 생성 함수
 * 
 * - dismiss: 토스트 메시지 삭제 함수
 * - id: 토스트 메시지 고유 ID
 */
export const toast = (props) => {
  const id = generateId();

  const dismiss = () => {
    dispatch({
      type: "DISMISS_TOAST",
      toastId: id,
    });
  };

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...TOAST_OPTIONS,
      ...props,
      id,
      visible: true,
    },
  });

  return {
    id,
    dismiss,
  }
}