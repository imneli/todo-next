import Head from 'next/head'
import styles from './styles.module.css'
import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection'
import { doc, collection, query, where, getDoc } from 'firebase/firestore'

interface TaskProps {
    item: {
        tarefa: string;
        public: boolean;
        created: string,
        user: string,
        taskId: string,
    }
}

export default function Task( { item }: TaskProps) {
    return(
        <>
        <div className={styles.container}>
            <Head>
                <title>Detalhes da task</title>
            </Head>

            <main className={styles.main}>
                <h1>Tarefa</h1>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async({ params }) => {

    const id = params?.id as string
    const docRef = doc(db, "tarefas", id)

    const snapshot = await getDoc(docRef)

    if (snapshot.data() === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    if (!snapshot.data()?.public) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        } 
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000

    const task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id,
    }

    return {
        props: {
            item: task,
        }
    }
}