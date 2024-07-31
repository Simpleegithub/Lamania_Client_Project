import Image from 'next/image'
import styles from './page.module.css'
import Button from '../../components/Button/Button'


export const metadata = {
    title: "Lema Dev Contact Information",
    description: "This is contact page",
  };

function page() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Let's keep up in Touch</h1>
            <div className={styles.content}>
               <div className={styles.imgContainer}>
                <Image src={"/contact.png"} alt="" fill={true} className={styles.image}/>
               </div>
               <form className={styles.form}>
                <input type="text" placeholder='name' className={styles.input}/>
                <input type="text" placeholder='email' className={styles.input}/>
                <textarea cols={30} rows={10} className={styles.textArea} placeholder='message'></textarea>
                <Button url="#" text="Send" className={styles.button}/>
               </form>
            </div>
        </div>
    )
}

export default page
