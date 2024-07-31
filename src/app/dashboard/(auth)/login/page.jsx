
"use client";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

import { signIn, useSession } from "next-auth/react";


function page() {

    const session=useSession();
    const router=useRouter();

    if(session.status==="authenticated"){

        router.push("/dashboard");

    }

    if(session.status=="loading"){

        return <p>Loading...</p>
    }
    
   

    async function handleSubmit(e) {
        e.preventDefault();
        let email=e.target[0].value;
        let password=e.target[1].value;
        console.log(email,password);
        signIn("credentials",{email,password})
        
       
    }
    return (
        <div className={styles.container}>
               <form action="" className={styles.form} onSubmit={handleSubmit}>
             
                <input type="email" placeholder='email' className={styles.input} required />
                <input type="password" placeholder='password' className={styles.input} required />
                <button className={styles.button}>Login</button>
            </form>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
    )
}

export default page
