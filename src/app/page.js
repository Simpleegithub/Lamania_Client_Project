import Image from "next/image";
import Hero from "/public/hero.png";
import styles from "./page.module.css";
import Button from "../components/Button/Button";

function page() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Better design for your digital products.</h1>
        <p className={styles.desc}>Turning your ideas into reality.We bring together the teams from around the globe.</p>
        <Button url="/portfolio" text="See our works"/>
      
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img}  />
      </div>
    </div>
  );
}

export default page;
