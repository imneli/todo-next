import { ChangeEvent, FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'

import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection'
import { doc, getDoc, addDoc, collection } from 'firebase/firestore'
import { Calendar, User, Globe, Key } from 'lucide-react'
import styles from './styles.module.css'
import { Textarea } from '@/components/TextArea'

interface TaskProps {
    item: {
        tarefa: string;
        public: boolean;
        created: string;
        user: string;
        taskId: string;
    }
}

export default function Task({ item }: TaskProps) {

    const { data: session } = useSession(); 

    const [input, setInput] = useState("");

    async function handleComment(event: FormEvent) {
        event.preventDefault();

        if (input === "") return;
        if (!session?.user?.email || !session?.user?.name) return;
        try {
            const docRef = await addDoc(collection(db, "comments"), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            })

            setInput("")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <Head>
                <title>Detalhes da Tarefa</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.taskCard}>
                    <div className={styles.header}>
                        <div className={styles.headerTop}>
                            <h1 className={styles.title}>Detalhes da Tarefa</h1>
                            <div className={styles.icon}>
                                {item.public ? (
                                    <Globe className={styles.publicIcon} />
                                ) : (
                                    <Key className={styles.privateIcon} />
                                )}
                            </div>
                        </div>

                        <div className={styles.metadataSection}>
                            <div className={styles.metadataItem}>
                                <Calendar />
                                <span>Criado: {item.created}</span>
                            </div>
                            <div className={styles.metadataItem}>
                                <User />
                                <span>Criado por: {item.user}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.taskContent}>
                        <p className={styles.taskText}>{item.tarefa}</p>
                    </div>

                    <div className={styles.footer}>
                        <p>ID: {item.taskId}</p>
                    </div>
                </div>
                <section className={styles.commentsContainer}>
                <h2 className={styles.comentariosTitle}>Deixar comentários</h2>

                <form onSubmit={handleComment}>
                    <Textarea 
                    value={input}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => 
                    setInput(event.target.value)}
                    placeholder='Digite seu comentário...'
                    
                    />
                    <button disabled={!session?.user} className={styles.button}>Comentar</button>
                </form>
                </section>
            </div>

            
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string
    
    try {
        const docRef = doc(db, "tarefas", id)
        const snapshot = await getDoc(docRef)
        const data = snapshot.data()

        if (!data) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        if (!data.public) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        const miliseconds = data.created?.seconds * 1000

        const task = {
            tarefa: data.tarefa,
            public: data.public,
            created: new Date(miliseconds).toLocaleDateString(),
            user: data.user,
            taskId: id,
        }

        return {
            props: {
                item: task,
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}