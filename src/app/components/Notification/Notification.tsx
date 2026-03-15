'use client';
import Link from 'next/link';
import styles from './notification.module.css';
import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  linkText?: string;
  linkHref?: string;
  onClose: () => void;
  autoClose?: number;
}

export default function Notification({
  message,
  linkText,
  linkHref,
  onClose,
  autoClose = 3000,
}: NotificationProps) {
  useEffect(() => {
    if (autoClose > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className={styles.notification}>
      <div className={styles.notificationContent}>
        <p>{message}</p>
        {linkText && linkHref && (
          <Link href={linkHref} className={styles.notificationLink}>
            {linkText}
          </Link>
        )}
        <button
          className={styles.notificationClose}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
      </div>
    </div>
  );
}
