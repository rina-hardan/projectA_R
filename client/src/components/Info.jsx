import styles from '../CSS/Info.module.css';
import { CurrentUserContext } from '../App';
import { useContext } from 'react'

export default function Info() {
    const { currentUser } = useContext(CurrentUserContext);

    return (
        <div className={styles.infoContainer}>
            <h1 className={styles.header}>User Information</h1>
            <ul className={styles.infoList}>
                <li><strong>Name:</strong> {currentUser.name}</li>
                <li><strong>Username:</strong> {currentUser.username}</li>
                <li><strong>Email:</strong> {currentUser.email}</li>
            </ul>
        </div>
    );
}
