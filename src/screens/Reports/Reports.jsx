import Container from '../../components/Container/Container';
import styles from './Reports.module.css';
import {ReportBox} from './components/ReportBox/ReportBox';

import {AiFillCar} from 'react-icons/ai';
import { BsPersonVcard } from 'react-icons/bs';

export const Reports = () => {

    return(
        <Container>
            <ReportBox icon={<AiFillCar size={80}/>} title="Veículos"/>
            <ReportBox icon={<BsPersonVcard size={80}/>} title="Condutores"/>
            <ReportBox icon={<AiFillCar size={80}/>} title="Emissão de Controle de Veículos em Massa"/>
        </Container>
    );

}