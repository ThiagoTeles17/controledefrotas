import Container from '../../components/Container/Container';
import styles from './Reports.module.css';
import {ReportBox} from './components/ReportBox/ReportBox';
import {Modal} from 'react-modal';

import {AiFillCar} from 'react-icons/ai';
import { BsPersonVcard } from 'react-icons/bs';
import { useState } from 'react';

export const Reports = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const [modalContent, setModalContent] = useState('');

    return(
        <Container>
            <ReportBox icon={<AiFillCar size={80}/>} title="Veículos"/>
            <ReportBox icon={<BsPersonVcard size={80}/>} title="Condutores"/>
            <ReportBox icon={<AiFillCar size={80}/>} title="Emissão de Controle de Veículos em Massa"/>

            <Modal
            isOpen={modalVisible}
            className={styles.modal}
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)', zIndex: '10'}}}
            >   
            {modalContent}
            </Modal> 

        </Container>
    );

}