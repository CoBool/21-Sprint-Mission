import styles from "./Toast.module.css";

import { useEffect } from "react";
import { useToast } from "./use-toast.js";

// 간단한 아이콘 컴포넌트들
const Icons = {
  success: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  ),
  error: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
  ),
  default: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  ),
};

function Toast({ toast, dismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dismiss]);

  // 아이콘 선택 로직
  const IconComponent = Icons[toast.type] || Icons.default;

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      // CSS 변수로 duration을 넘겨서 애니메이션 속도 조절
      style={{ "--duration": `${toast.duration || 3000}ms` }}
      data-state={toast.visible ? "visible" : "hidden"}
    >
      {/* 1. 좌측 아이콘 영역 */}
      <div className={styles.icon}>
        <IconComponent />
      </div>

      {/* 2. 중앙 텍스트 영역 */}
      <div className={styles.content}>
        {toast.title && <h3 className={styles.title}>{toast.title}</h3>}
        {toast.description && <p className={styles.desc}>{toast.description}</p>}
      </div>

      {/* 3. 우측 닫기 버튼 */}
      <button className={styles.closeBtn} onClick={() => dismiss(toast.id)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      {/* 4. 하단 프로그레스 바 */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} />
      </div>
    </div>
  );
}

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} dismiss={dismiss} />
      ))}
    </div>
  );
}
