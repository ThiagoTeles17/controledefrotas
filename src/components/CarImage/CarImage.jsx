import styles from './CarImage.module.css';

const CarImage = ({vehicles, curVehicle}) => {

    if(vehicles == null){
        return
    }
    else if (vehicles[curVehicle] && vehicles[curVehicle].imagem){
        return(
        <div className={styles.divContainer}>
            <img
                className={styles.imageContainer} 
                src={vehicles[curVehicle] ? `${vehicles[curVehicle].imagem}` : ''}
                alt='Imagem Carro'
            />
        </div>
        );
    }
    

}
export default CarImage;