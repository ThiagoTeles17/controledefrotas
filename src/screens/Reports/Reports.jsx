import Container from '../../components/Container/Container';
import styles from './Reports.module.css';
import {ReportBox} from './components/ReportBox/ReportBox';
import {Modal} from 'react-modal';
import { ApiContext } from '../../context/ApiContext';


import {AiFillCar} from 'react-icons/ai';
import { BsPersonVcard } from 'react-icons/bs';
import { FaTools } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { GiCarWheel } from "react-icons/gi";


import { useState, useContext, useEffect } from 'react';

import { reportDrivers } from './Scripts/ReportDrivers';
import { doc, getDoc } from 'firebase/firestore';
import { GenerateVehicleControl } from './Scripts/VehicleControl';
import { reportVehicles } from './Scripts/ReportVehicles';
import { reportInsurances } from './Scripts/ReportInsurances';
import { reportTires } from './Scripts/ReportTires';

export const Reports = () => {

    const {
        db,
        drivers,
        activities,
        insurances,
        vehicles,
        tires
    } = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState(false);

    const [modalContent, setModalContent] = useState(<></>);
  

    const handleVehicleControl = () => {
        Object.keys(vehicles).map((i) => {
            GenerateVehicleControl(i, vehicles);
        });
    };

    return(
        <Container>
            <ReportBox handleOnClick={() => reportVehicles(vehicles, activities)} icon={<AiFillCar size={80}/>} title="Veículos"/>
            <ReportBox handleOnClick={() => reportDrivers(drivers)} icon={<BsPersonVcard size={80}/>} title="Condutores"/>
            <ReportBox handleOnClick={() => handleVehicleControl()} icon={<AiFillCar size={80}/>} title="Controle de Veículos"/>
            <ReportBox icon={<FaTools size={80}/>} title="Manutenções Pendentes"/>
            <ReportBox icon={<FaHistory size={80}/>} title="Histórico de Manutenções"/>
            <ReportBox handleOnClick={() => reportTires(vehicles, tires)} icon={<GiCarWheel size={80}/>} title="Pneus"/>
            <ReportBox handleOnClick={() => reportInsurances(vehicles, insurances)} icon={<IoShieldCheckmark size={80}/>} title="Seguros"/>



           {/*<Modal
            isOpen={modalVisible}
            className={styles.modal}
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)', zIndex: '10'}}}
            >   
            {modalContent}
            </Modal>*/}

        </Container>
    );

}