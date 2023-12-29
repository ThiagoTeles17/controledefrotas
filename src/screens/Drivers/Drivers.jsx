import { useContext, useEffect, useState } from "react";
import styles from './Drivers.module.css';

import Container from "../../components/Container/Container";
import Modal from 'react-modal';
import brasao from '../../assets/imgs/brasao.png'

import {BsFillPencilFill, BsPencilFill} from 'react-icons/bs';

import {AiFillPlusCircle} from 'react-icons/ai';



import { ApiContext } from "../../context/ApiContext";
import { ModalAddDriver } from "./components/ModalAddDriver/ModalAddDriver";
import { doc, getDoc } from "firebase/firestore";
import { ModalEditDriver } from "./components/ModalEditDriver/ModalEditDriver";
import {GrCheckmark} from 'react-icons/gr';


const Drivers = () => {
        
    const {db, drivers, getDrivers} = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('add');

    //sucess message on save changes
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');

    const [driverToEditId, setDriverToEditId] = useState();

    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <ModalAddDriver
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                db={db}
                getDatabase={() => getDrivers()}
                setSuccessMessage={setSuccesMessage}
                setSuccess={setSuccess}
                />
            );
        }
        else if(modalContent == 'edit'){
            return(
                <ModalEditDriver
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                driverId={driverToEditId}
                db={db}
                drivers={drivers}
                getDatabase={() => getDrivers()}
                setSuccessMessage={setSuccesMessage}
                setSuccess={setSuccess}
                />
            );
        }
       
    }

    const handleAddVehicle = () => {
        setModalContent('add');
        setModalVisible(!modalVisible);
    }

    const handleEditVehicle = (id) => {
        setModalContent("edit");
        setModalVisible(!modalVisible);
        setDriverToEditId(id);
    }


    return(
        <div className={styles.VerticalContainer}>

           

            {/*Displays sucess message if succes is true*/}
            {success && <div className={styles.successMessage}>
            <GrCheckmark 
            style={{
                filter: 'invert(51%) sepia(97%) saturate(414%) hue-rotate(71deg) brightness(103%) contrast(92%)'
            }}
            />
            {successMessage}
            </div>}

            <Container>           

            <AiFillPlusCircle onClick={() => handleAddVehicle()} className={styles.addBtn}/>
          

           <table>
                <tr className={styles.tableHeader}>
                    <td>Nome do Condutor</td>
                    <td style={{width: '10rem'}}>CNH</td>
                    <td style={{width: '5rem'}}>Categoria</td>
                    <td style={{width: '5rem'}}>Validade</td>
                    <td style={{width: '10rem'}}>Situação</td>          
                    <td style={{width: '5rem'}}>Status</td>  
                    <td></td>
                </tr>
                {drivers && 
                Object.keys(drivers).map((item, index) => {
                    
                    //convert date string to javascript Date
                    let [day, month, year] = drivers[item].validade && (drivers[item].validade).split("/");
                    let dataVenc = new Date(year, month - 1, day);

                    return(
                        <tr>
                            <td
                            style={{textTransform: 'uppercase'}}
                            >{drivers[item].nome ? drivers[item].nome : ''}</td>

                            <td 
                            style={{textTransform: 'capitalize'}}
                            >
                             {drivers[item].cnh && drivers[item].cnh}   
                            </td>
                            
                            <td
                            style={{textTransform: 'uppercase', textAlign: 'center'}}
                            >{drivers[item].categoria ? drivers[item].categoria : ''}</td>
                            
                            <td style={dataVenc.getTime() <= Date.now() ? {backgroundColor: 'rgba(250, 5, 5, 1)'} : {backgroundColor: 'transparent'}}
                            >
                            {drivers[item].validade ? drivers[item].validade : ''}
                            </td>
        
                            <td>{dataVenc.getTime() <= Date.now() ? 'CNH Vencida' : 'CNH Vigente'}</td>

                            
                            <td style={{textAlign: 'center'}}>
                            {drivers[item].ativo && drivers[item].ativo == true ? 'Ativo' : 'Inativo'}
                            </td>

                            <td style={{width: '1.5rem'}}>
                                <BsFillPencilFill
                                onClick={() => handleEditVehicle(item)}
                                className={styles.editBtn}
                            />
                            </td> 
                        </tr>
                    );
                })}
           </table>

           <Modal
            isOpen={modalVisible}
            className={styles.modal}
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)', zIndex: '10'}}}
            >   
            {handleModalContent()}
            </Modal> 
            </Container>
        </div>
    );  

}

export default Drivers;