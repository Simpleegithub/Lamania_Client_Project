"use client";
import { signOut, useSession } from "next-auth/react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import styles from "./Navbar.module.css";

import Link from "next/link";
const Links=[
    {
        id:1,
        name:"Home",
        path:"/"
    },

    {
        id:2,
        name:"Portfoilio",
        path:"/portfolio"
    },

    {
        id:3,
        name:"Blog",
        path:"/blog"
    },

    {
        id:4,
        name:"About",
        path:"/about"
    },

    {
        id:5,
        name:"Contact",
        path:"/contact"
    },

    {
        id:6,
        name:"Dashboard",
        path:"/dashboard"
    },

]

function Navbar() {
    const session=useSession();
    return (
        <div className={styles.container}>
            <Link href={"/"} className={styles.logo}>lamania</Link>
            <div className={styles.links}>
                <DarkModeToggle/>
                {Links.map((link)=>(
                    <Link className={styles.link} key={link.id} href={link.path}>{link.name}</Link>
                ))}
                {session.status=="authenticated" && <button className={styles.logout} onClick={()=>signOut()}>Logout</button>}
                
            </div>
        </div>
    )
}

export default Navbar
