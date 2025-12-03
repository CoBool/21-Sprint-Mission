import styles from './AddItem.module.css';

export default function AddItem() {

  return (
    <>
      <main>
        <div className={`container ${styles['add-item__container']}`}>
          <form action={`${styles['add-item__section']}`}>
            일단 채워주기.
          </form>
        </div>
      </main>
    </>
  )
}