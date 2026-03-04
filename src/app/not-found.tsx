import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Link href="/music/main">
          <div className={styles.modal__logo}>
            <img src="/img/logo_modal.png" alt="logo" />
          </div>
        </Link>

        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Страница не найдена</h2>
        <p className={styles.errorText}>
          Возможно, она была удалена или вы перешли по неверной ссылке
        </p>

        <Link href="/music/main" className={styles.modal__btn}>
          На главную
        </Link>
      </div>
    </div>
  );
}
