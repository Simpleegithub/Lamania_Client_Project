"use client";
import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


function Page() {
    const router = useRouter();
    const [error, setError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        console.log(name, email, password);

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if (res.status === 201) {
                const message = await res.text();
                console.log(message);
                router.push('/dashboard/login?success=Account created successfully');
            }

        } catch (err) {
            setError(true);
            console.log(res.error);
        }
    }

    return (
        <div className={styles.container}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder='username' className={styles.input} required />
                <input type="email" placeholder='email' className={styles.input} required />
                <input type="password" placeholder='password' className={styles.input} required />
                <button className={styles.button}>Register</button>
            </form>
            {error && <span className={styles.error}>Something went wrong</span>}
            <Link href={'/dashboard/login'}>Login with existing account</Link>
        </div>
    );
}

export default Page;
