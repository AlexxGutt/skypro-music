'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './nav.module.css';
import { useState } from 'react';
import { useAppDispatch } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/app/store/features/authSlice';
export default function Nav() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');
  };
  return (
    <nav className={styles.main__nav}>
      <Link href="/">
        <div className={styles.nav__logo}>
          {/*TODO: img –> Image*/}
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </div>
      </Link>

      <div onClick={toggleMenu} className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div
        className={`${styles.nav__menu} ${isMenuOpen ? styles.nav__menu_on : ''}`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            {/*TODO: a -> Link*/}
            <Link href="/" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item}>
            <span onClick={logout} className={styles.menu__link}>
              Выйти
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
