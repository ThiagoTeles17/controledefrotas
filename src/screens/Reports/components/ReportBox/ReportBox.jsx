import styles from './ReportBox.module.css';

export const ReportBox = ({icon, title}) => {

    return(
    <div className={styles.container}>
        <div className={styles.icon}>
           {icon} 
        </div>
        <div className={styles.title}>
           {title}
        </div>
    

    </div>
    );

}