"use client";
import useSWR from "swr";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Dashboard() {
  const session = useSession();
  console.log(session);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error,mutate, isLoading } = useSWR(
    `http://localhost:3000/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  console.log(data);
  async function handleSubmit(e){
    e.preventDefault();
    const title=e.target[0].value;
    const desc=e.target[1].value;
    const img=e.target[2].value;
    const content=e.target[3].value;
    const username=e.target[4].value;
    console.log(title,desc,img,content,username);

    try{ 
      const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",       
      body: JSON.stringify({
        title,
        desc,
        content,
        img,
        username:session.data.user.name
      }),
    });
    mutate();

    if(res.ok){
      console.log(res.text());
      router.refresh();
    }


    }catch (err){

    }

   
  
  }

  const handleDelete = async (id) => {
    console.log(id);
   try{
   await fetch(`http://localhost:3000/api/posts/${id}`,{
    method: "DELETE",
   })
   mutate();

   } catch(err){

   }
  }




  const router = useRouter();
  if (session.status == "loading") {
    return <p>Loading...</p>;
  }

  if (session.status == "unauthenticated") {
    router.push("/dashboard/login");
  }

  if (session.status == "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading ? "Loading..." : data?.map((post) => (
            <div key={post._id} className={styles.post}>
              <div className={styles.imgContainer}>
                <Image src={post.img} width={200} height={200} alt="user" />
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <span className={styles.delete} onClick={() => handleDelete(post._id)}>X</span>
            </div>
          ))}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Add new Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
       


          <textarea cols={30} rows={10} placeholder="Content" className={styles.textarea}></textarea>
          <button className={styles.button}>Create</button>
        </form>
      </div>
    );
  }
  // console.log(data)

  // console.log(data);
}

export default Dashboard;
