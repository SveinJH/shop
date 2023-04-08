import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function App() {
    return (
        <div className={styles.page}>
            <span className={styles.logo}>Nikkel</span>
            <main className={styles.main}>
                <h1>
                    Enkel administrering av bonger til ditt neste arrangmenent.
                </h1>
                <p>Kom i gang ved å logge inn</p>
                <Link href="/logg-inn">Logg inn</Link>
            </main>
            <div>
                <h2>UNDER DEVELOPMENT</h2>
                <h3>Page not indexed</h3>
            </div>
            <footer className={styles.footer}>
                <p>Høie Consulting</p>
                <p>Org.nr. 931013890</p>
                <Link href="/kontakt">Kontakt</Link>
            </footer>
        </div>
    );
}
