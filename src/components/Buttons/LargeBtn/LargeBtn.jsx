import styles from './LargeBtn.module.css';

const LargeBtn = ({title, link}) => {
    return(
    <a target='_blank' href={link}>
        <button className={styles.btnContainer}>
            {title}
        </button>
    </a>
    );
}
export default LargeBtn;