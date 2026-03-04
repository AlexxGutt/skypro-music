'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { signUp } from '../../services/auth/signUpApi';

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim() || !username.trim()) {
      setError('Заполните все поля');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp({
        email,
        password,
        username,
      });

      if (result.success) {
        router.push('/auth/signin');
      } else {
        setError(result.error || 'Ошибка при регистрации');
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

  return (
    <div>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>

      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        value={username}
        onChange={handleInputChange(setUsername)}
        disabled={loading}
        autoComplete="username"
      />

      <input
        className={styles.modal__input}
        type="email"
        name="email"
        placeholder="Почта"
        value={email}
        onChange={handleInputChange(setEmail)}
        disabled={loading}
        autoComplete="email"
      />

      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handleInputChange(setPassword)}
        disabled={loading}
        autoComplete="new-password"
      />

      {error && <div className={styles.errorContainer}>{error}</div>}

      <button
        className={styles.modal__btnSignupEnt}
        onClick={handleSubmit}
        disabled={loading}
        type="button"
      >
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </div>
  );
}
