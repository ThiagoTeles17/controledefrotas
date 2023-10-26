import { useContext, useEffect, useState } from "react";
import styles from './ManangeVehicles.module.css';

import Container from "../../components/Container/Container";
import Modal from 'react-modal';
import brasao from '../../assets/imgs/brasao.png'

import {CiCircleRemove} from 'react-icons/ci';
import {BsFillPencilFill, BsPencilFill} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiFillPlusCircle} from 'react-icons/ai';


import { ApiContext } from "../../context/ApiContext";
import { ModalAddVehicle } from "./components/ModalAddVehicle/ModalAddVehicle";


const ManangeVehicles = () => {
    
    const {curVehicle, setCurVehicle, dados, setDados, fetchData} = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('add');


    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <ModalAddVehicle
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                dados={dados}
                fetchData={fetchData}
                />
            );
        }
       
    }

    useEffect(() => {
        fetchData();
    }, [])


    return(
        <Container>
            <AiFillPlusCircle onClick={() => setModalVisible(!modalVisible)} className={styles.addBtn}/>
           
           <table>
                <tr className={styles.tableHeader}>
                    <td>Placa</td>
                    <td style={{width: '25rem'}}>Modelo</td>
                    <td>Unidade</td>
                    <td>Despesa</td>
                    <td>Atividade</td>           
                    <td>Renavam</td>
                    <td></td>
                </tr>
                {dados.veiculos && 
                Object.keys(dados.veiculos).map((item, index) => {

                    return(
                        <tr>
                            <td>{dados.veiculos[item].placa}</td>
                            <td>{dados.veiculos[item].modelo}</td>
                            <td>{dados.veiculos[item].unidade}</td>
                            <td>{dados.veiculos[item].despesa}</td>
                            <td>{dados.atividades[item] && dados.atividades[item]}</td>
                            <td>{dados.veiculos[item].renavam}</td> 
                            <td style={{width: '1.5rem'}}>
                                <BsFillPencilFill className={styles.editBtn}/>
                            </td> 
                        </tr>
                    );
                })}
           </table>

           <Modal
            isOpen={modalVisible}
            className={styles.modal}
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)'}}}
            >   
            {handleModalContent()}
            </Modal> 

        </Container>
    );  

}

export default ManangeVehicles;