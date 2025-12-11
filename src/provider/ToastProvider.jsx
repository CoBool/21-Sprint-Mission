import { useState, useRef } from "react";
import { ToastContext } from '../context/ToastContext.js'

import Toast from "../components/ui/toast/Toast.jsx";

const TOAST_DURATION = 3300;


export default function ToastProvider({ children }) {
  // 토스트 상태
  const [toast, setToast] = useState([]);
  const timerRef = useRef(new Map());

  const addToast = (message, type) => {
    const newToast = {
      id: crypto.randomUUID(),
      message,
      type,
    };
    setToast((prev) => [...prev, newToast]);

    const timer = setTimeout(() => {
      removeToast(newToast.id);
    }, TOAST_DURATION);
    timerRef.current.set(newToast.id, timer);
  }

  const removeToast = (id) => {
    setToast((prev) => prev.filter((toast) => toast.id !== id));

    const timer = timerRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timerRef.current.delete(id);
    }
  }

  const value = {
    toast,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toasts={toast} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}