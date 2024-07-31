import Image from 'next/image';
import styles from './page.module.css';
import { notFound } from 'next/navigation';




// Function to fetch data
async function getData(id) {
  try {
    console.log('hello')
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
     // revedate after 10s
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      // Activate the closest `error.js` Error Boundary
      notFound();
      return null;  // Ensure function returns a fallback
    }

    // Return JSON data
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    notFound();  // Optionally handle fetch errors
    return null;
  }
}


export async function generateMetadata({params}) {
const post=await getData(params.id);

  return {
    title: post?.title,
    description: post?.desc,  
}

}

// BlogPost component
async function BlogPost({ params }) {
  // console.log(params.id,'form line 29');
  // Check that params.id is available
  if (!params || !params.id) {
    notFound();  // Redirect to 404 if no ID is provided
    return null;
  }

  // Fetch data based on the provided ID
  const data = await getData(params.id);

  // Ensure data is not null
  if (!data) {
    return null;  // Return null or some fallback if data is not available
  }

  // Render the blog post
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {data.title}
          </h1>
          <p className={styles.desc}>
            {data.desc || 'No description available.'}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt="Author's avatar"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>Jawad Raza</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg"
            alt="Blog post image"
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {data.content || 'No content available.'}
        </p>
      </div>
    </div>
  );
}

export default BlogPost;
