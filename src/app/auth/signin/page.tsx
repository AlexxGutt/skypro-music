'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { getTokens, signIn } from '../../services/auth/signInApi';
import { useAppDispatch } from '@/app/store/store';
import { setAccess, setUsername } from '@/app/store/features/authSlice';

export default function Signin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await signIn({ email, password });

      if (result.success && result.user) {
        dispatch(setUsername(result.user.username));
        getTokens({ email, password }).then((res) => {
          dispatch(setAccess(res.access));
          dispatch(setAccess(res.refresh));
        });
        router.push('/music/main');
      } else {
        setError(result.error || 'Ошибка при входе');
      }
    } catch (err) {
      setError('Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error) {
        setError('');
      }
    };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>

      <input
        className={classNames(styles.modal__input, styles.login)}
        type="email"
        name="email"
        placeholder="Почта"
        value={email}
        onChange={handleInputChange(setEmail)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        autoComplete="email"
      />

      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handleInputChange(setPassword)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        autoComplete="current-password"
      />

      <div className={styles.errorContainer}>
        {error && <div className={styles.errorText}>{error}</div>}
      </div>

      <button
        className={styles.modal__btnEnter}
        onClick={handleSubmit}
        disabled={loading}
        type="button"
      >
        {loading ? 'Вход...' : 'Войти'}
      </button>

      <Link href="/auth/signup" className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
