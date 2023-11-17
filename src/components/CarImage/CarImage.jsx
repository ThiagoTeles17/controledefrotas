import { useContext, useEffect, useState } from 'react';
import styles from './CarImage.module.css';
import { ApiContext } from '../../context/ApiContext';
import { doc, getDoc } from 'firebase/firestore';

const CarImage = ({vehicles, curVehicle}) => {

    const {db} = useContext(ApiContext);

    const [images, setImages] = useState();

    const getImage = async() => {
        setImages((await getDoc(doc(db, 'imgs', 'vehicles'))).data());
    };

    useEffect(() => {
        getImage();
    }, []);

    console.log(images[curVehicle] && images[curVehicle]);

    if(vehicles == null){
        return
    }
    else if (vehicles[curVehicle] && vehicles[curVehicle].imagem){
        return(
        <div className={styles.divContainer}>
            <img
                className={styles.imageContainer} 
                src={images[curVehicle] ? `${images[curVehicle]}` : ''}
                alt='Imagem Carro'
            />
        </div>
        );
    }
    

}
export default CarImage;