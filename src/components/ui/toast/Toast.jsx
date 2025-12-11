import styles from "./Toast.module.css";

export default function Toast({ toasts, removeToast }) {

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[`toast-${toast.type}`]}`} onClick={() => removeToast(toast.id)}>
          {toast.message}
        </div>
      ))}
    </div>
  )
}