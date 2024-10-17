import styles from "./styles.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react';

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <h1 className={styles.logo}>
              My<span>Tasks</span>
            </h1>
          </Link>
          <button 
            className={`${styles.burgerButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
          <nav className={styles.nav}>
            {session?.user && (
              <Link href="/dashboard" className={styles.link}>
                Meu Painel
              </Link>
            )}
          </nav>

          {status === "loading" ? (
            <></>
          ) : session ? (
            <div className={styles.boxButtons}>
              <button className={styles.loginButton} onClick={() => signOut()}>
                Olá {session?.user?.name}
              </button>
            </div>
          ) : (
            <button className={styles.loginButton} onClick={() => signIn("google")}>
              Acessar
            </button>
          )}
        </div>
      </section>
    </header>
  );
}