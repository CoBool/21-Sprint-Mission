import { useState, useEffect, useCallback } from "react";
/** 
 * [1] 훅 함수 정의
 * 
 * - subscribe: 상태 변경 구독
 * - getState: 현재 상태 조회
 * - dispatch: 상태 변경 디스패치
 * - toast: 토스트 메시지 생성 함수
 */
import { subscribe, getState, dispatch, toast } from "./toast-store.js";


function useToast() {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const unsubscribe = subscribe(setState);

    return () => unsubscribe();
  }, []);

  const dismiss = useCallback((id) => {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
  }, []);

  return {
    ...state,
    toast,
    dismiss,
  }
}

export { toast,useToast };