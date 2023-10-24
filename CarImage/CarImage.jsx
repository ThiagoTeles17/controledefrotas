import styles from './CarImage.module.css';

const CarImage = ({data, curVehicle}) => {

    if(data.veiculos == null){
        return
    }
    return(
    <div className={styles.divContainer}>
        <img
            className={styles.imageContainer} 
            src={data.veiculos[curVehicle] ? `${data.veiculos[curVehicle].imagem}` : ''}
            alt='Imagem Carro'
        />
    </div>
    );

}
export default CarImage;