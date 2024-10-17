import { ChangeEvent, FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'

import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection'
import { doc, getDoc, addDoc, collection, where, query, getDocs } from 'firebase/firestore'
import { Calendar, User, Globe, Key, Trash } from 'lucide-react'
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
    allComments: CommentProps[]
}

interface CommentProps {
    id: string;
    comment: string;
    name: string;
    taskId: string;
    user: string;
}

export default function Task({ item, allComments }: TaskProps) {

    const { data: session } = useSession(); 
    const [input, setInput] = useState("");
    const [comments, setComments] = useState<CommentProps[]>(allComments || [])

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
                

                <section className={styles.commentsContainer}>
                    <h2 className={styles.allCommentsStyle}>Todos os comentários</h2>
                    {comments.length === 0 && (
                        <span>Nenhum comentário foi encontrado</span>
                    )}

                    {comments.map((item) => (
                       <article key={item.id} className={styles.comment}>
                            <div className={styles.headComment}>
                                <label className={styles.commentsLabel}>{item.name}</label>
                                {item.user === session?.user?.email && (
                                    <button className={styles.buttonTrash}><Trash size={18} color='#EA3140'/></button>
                                )}
                            </div>
                            <p className={styles.commentsValue}>{item.comment}</p>
                       </article> 
                    ))}
                </section>
            </div>

            
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string
    
    try {
        const docRef = doc(db, "tarefas", id)

        const q = query(collection(db, "comments"), where("taskId", "==", id))
        const snapshotComments = await getDocs(q);

        let allComments: CommentProps[] = []

        snapshotComments.forEach((doc) => {
            allComments.push({
                id: doc.id,
                comment: doc.data().comment,
                user: doc.data().user,
                name: doc.data().name,
                taskId: doc.data().taskId,
            })
        })

        console.log(allComments)

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
                allComments: allComments,
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