import { useNavigate, Link, Outlet } from "react-router-dom";
import styles from'../CSS/Home.module.css';  
import { useContext } from "react";
import { CurrentUserContext } from '../App';

export default function Home() {
    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    return (
        <div className={styles.Home}>
            <header className={styles.header}>{currentUser && currentUser.name}</header>
            <main>
                <nav className={styles.nav}>
                    <Link to="Info" className={styles.link}>Info</Link>
                    <Link to="Todos" className={styles.link}>Todos</Link>
                    <Link to="Posts" className={styles.link}>Posts</Link>
                    <Link to="Albums" className={styles.link}>Albums</Link>
                    <button className={styles.link} onClick={() => {
                        localStorage.removeItem('currentUser')
                        setCurrentUser(null)
                        navigate('/Login')
                    }}>LogOut</button>
                </nav>
                <div className={styles.context}>
                    <Outlet />
                </div>
            </main>
            <footer className={styles.footer}>כל הזכויות שמורות לרינה וחנה</footer>
        </div>
    )
}
