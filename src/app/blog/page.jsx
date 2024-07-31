
import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image';
import { notFound } from 'next/navigation';


async function getData() {
    const res = await fetch('http://localhost:3000/api/posts', {
       
         //  revalidate no cahce
        cache: 'no-store',

    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return notFound();
    }
   
    return res.json()
  }

async function page() {
    const data=await getData();
    console.log(data)
    return (
        <div className={styles.Maincontainer}>
            {data.map((post)=>(
              
              <Link key={post.id} href={`/blog/${post._id}`} className={styles.container}>
                 <div className={styles.imageContainer}>
                    <Image src={post.img} alt="" width="400" height="250" className={styles.image}/>
                 </div>
                 <div className={styles.content}>
                     <h1 className={styles.title}>{post.title}</h1>
                     <p className={styles.desc}>{post.body}</p>
     
                 </div>
                 
                 </Link>
            ))}
           

        


       


      
        </div>
    )
}

export default page
