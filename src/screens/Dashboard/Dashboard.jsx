import { useContext, useEffect, useState } from "react";
import styles from './Dashboard.module.css';

import Container from "../../components/Container/Container";
import ListBox from "../../components/ListBox/ListBox";
import CarImage from "../../components/CarImage/CarImage";
import MechanicalPendences from "../../components/Sheets/MechanicalPendences/MechanicalPendences";
import VerticalContainer from "../../components/VerticalContainer/VerticalContainer";
import CarDescription from '../../components/Sheets/CarDescription/CarDescription';
import Tires from "../../components/Sheets/Tires/Tires";
import MaintenancesHistory from "../../components/Sheets/MaintenancesHistory/MaintenancesHistory";
import LargeBtn from "../../components/Buttons/LargeBtn/LargeBtn";
import VehicleControl from "../../components/Sheets/VehicleControl/VehicleControl";

import {VscLoading} from 'react-icons/vsc'
import {AiFillCar} from 'react-icons/ai';



import { ApiContext } from "../../context/ApiContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import ReactModal from "react-modal";


const Dashboard = () => {

    const {curVehicle, db, setCurVehicle} = useContext(ApiContext);

    const [vehicles, setVehicles] = useState([]);
    const [mechanicalHistory, setMechanicalHistory] = useState([]);
    const [database, setDatabase] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const getDatabase = async() => {
            
        setDatabase((await getDocs(collection(db, 'assistencia'))));

        let veh = (await getDoc(doc(db, 'assistencia', 'veiculos'))).data();
        setVehicles(veh);

        setMechanicalHistory((await getDoc(doc(db, 'assistencia', 'historicoMec'))).data());

        if(curVehicle == null){
            setCurVehicle(Object.keys(veh)[0]);
        }
    }


    useEffect (() => {
        
        getDatabase();

        setTimeout(() => {
            setIsLoaded(true);
        }, 200);
        
    }, []);
    
    
    if(database == [] || !isLoaded){
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25rem'}}>
                 <VscLoading className={styles.loading}/>
            </div>
        );
    }
    else if (vehicles == []){
        return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25rem'}}>
            Nenhum Veículo Encontrado
        </div>
        );
    }
    else {
            return(
                <Container>
                    <VerticalContainer>
                        <ListBox/>
                        <CarImage vehicles={vehicles} curVehicle={curVehicle}/>
                        <MechanicalPendences 
                        setHistory={setMechanicalHistory} 
                        db={db} 
                        curVehicle={curVehicle}
                        />  
                   </VerticalContainer>
                    <VerticalContainer>
                        <CarDescription db={db} curVehicle={curVehicle}/>
                        <Tires db={db} curVehicle={curVehicle}/>
                    </VerticalContainer>
                    <VerticalContainer>
                        <LargeBtn 
                        title='Consulta Detran'
                        link={
                            vehicles[curVehicle] ?
                            `https://consultas.detrannet.sc.gov.br/servicos/consultaveiculo.asp?placa=${vehicles[curVehicle].placa}&renavam=${vehicles[curVehicle].renavam}`
                            : ''
                        }
                        icon={<AiFillCar/>}
                        />
                        <VehicleControl curVehicle={curVehicle} vehicles={vehicles}/>
                        
                        <MaintenancesHistory 
                        history={mechanicalHistory} 
                        db={db} 
                        curVehicle={curVehicle}
                        />

                    </VerticalContainer>
            
                </Container>
            );         
    }
    

}

export default Dashboard;