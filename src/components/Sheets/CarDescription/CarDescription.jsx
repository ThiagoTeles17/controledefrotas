import Box from './Box/Box.jsx';
import DoubleBox from './DoubleBox/DoubleBox.jsx';
import styles from './CarDescritpion.module.css'
import { useContext } from 'react';
import { ApiContext } from '../../../context/ApiContext.jsx';

const CarDescritpion = ({data}) => {
    
    const {curVehicle, setCurVehicle} = useContext(ApiContext);
    

    return(
        <>
            {
            data.veiculos &&
            <div className={styles.descContainer}>
                {data.atividades[curVehicle]  &&
                <Box 
                title='Atividade:' 
                content={data.atividades[curVehicle]}
                />
                }

                {data.veiculos[curVehicle].modelo &&
                <Box 
                title='Modelo:' 
                content={data.veiculos[curVehicle].modelo}
                />
                }
                
                {data.veiculos[curVehicle].placa &&
                <Box 
                title='Placa:' 
                content={data.veiculos[curVehicle].placa}
                />
                }

                {data.veiculos[curVehicle].renavam &&
                <Box 
                title='Renavam:' 
                content={data.veiculos[curVehicle].renavam}
                />
                }
                {data.seguros[curVehicle].seguradora &&
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <DoubleBox 
                    border_right={true} 
                    title='Seguradora:'
                    content={data.seguros[curVehicle] ? data.seguros[curVehicle].seguradora : ''} 
                    />
                    <DoubleBox 
                    title='Vigência até:'
                    content={data.seguros[curVehicle] ? data.seguros[curVehicle].vigencia : ''} 
                    />
                </div>
                }
            </div>
            }
        </>
            
        
    );

}
export default CarDescritpion;