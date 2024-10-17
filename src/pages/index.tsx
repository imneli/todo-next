import styles from '@/styles/homeStyles.module.css'

import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import HeroImage from '../../public/assets/code.png';
import { GetStaticProps } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface HomeProps {
  posts: number;
  comments: number;
}

export default function Home({ posts, comments }: HomeProps) {
  return ( 
    <>
      <Head>
        <title>Organize suas tarefas</title>
        <meta name="description" content="Sistema de organização de tarefas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.container}`}
      >
        <main className={styles.main}>
          <div className={styles.logoContent}>
            <Image 
              className={styles.hero}
              alt='Logo Tarefas'
              src={HeroImage}
              priority
            />
            <h1 className={styles.title}>
              Sistema feito para você se organizar <br />
              Priorize seus estudos.
            </h1>

            <div className={styles.infoContent}>
              <section className={styles.box}>
                <span>+{posts} Posts</span>
              </section>
              <section className={styles.box}>
                <span>+{comments} Comentários</span>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const commentRef = collection(db, "comments");
    const postRef = collection(db, "tarefas");

    const [commentSnapshot, postSnapshot] = await Promise.all([
      getDocs(commentRef),
      getDocs(postRef)
    ]);

    return {
      props: {
        posts: postSnapshot.size || 0,
        comments: commentSnapshot.size || 0
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        posts: 0,
        comments: 0
      },
      revalidate: 60 
    };
  }
}