import Container from '../../components/Container/Container';
import styles from './Reports.module.css';
import {ReportBox} from './components/ReportBox/ReportBox';
import {Modal} from 'react-modal';

import {AiFillCar} from 'react-icons/ai';
import { BsPersonVcard } from 'react-icons/bs';
import { FaTools } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

import { useState } from 'react';

import { reportDrivers } from './Scripts/ReportDrivers';

export const Reports = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const [modalContent, setModalContent] = useState(<></>);

    return(
        <Container>
            <ReportBox icon={<AiFillCar size={80}/>} title="Veículos"/>
            <ReportBox handleOnClick={() => reportDrivers()} icon={<BsPersonVcard size={80}/>} title="Condutores"/>
            <ReportBox icon={<AiFillCar size={80}/>} title="Controle de Veículos"/>
            <ReportBox icon={<FaTools  size={80}/>} title="Manutenções Pendentes"/>
            <ReportBox icon={<FaHistory  size={80}/>} title="Histórico de Manutenções"/>


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