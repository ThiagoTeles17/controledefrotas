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
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ModalEditVehicle } from "./components/ModalEditVehicle/ModalEditVehicle";


const ManangeVehicles = () => {
    
    const {curVehicle, setCurVehicle, db} = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('add');

    const [vehicles, setVehicles] = useState();
    const [activities, setActivities] = useState();
    const [unities, setUnities] = useState();
    const [tires, setTires] = useState();

    const [vehToEditId, setVehToEditId] = useState();

    const getDatabase = async() => {
        setVehicles((await getDoc(doc(db, 'assistencia', 'veiculos'))).data());
        setActivities((await getDoc(doc(db, 'assistencia', 'atividades'))).data());
        setUnities((await getDoc(doc(db, 'assistencia', 'unidades'))).data());
        setTires((await getDoc(doc(db, 'assistencia', 'pneus'))).data());
    };

    useEffect(() => {
        getDatabase();
    }, []);


    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <ModalAddVehicle
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                unidades={unities}
                db={db}
                />
            );
        }
        else if(modalContent == 'edit'){
            return(
                <ModalEditVehicle
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                unidades={unities}
                db={db}
                vehicleId={vehToEditId}
                vehicles={vehicles}
                activities={activities}
                unities={unities}
                tires={tires}
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
        setVehToEditId(id);
    }


    return(
        <Container>
            <AiFillPlusCircle onClick={() => handleAddVehicle()} className={styles.addBtn}/>
           
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
                {vehicles && 
                Object.keys(vehicles).map((item, index) => {

                    const carModel = () => {
                        //return the name of car with informations
                        if(vehicles[item].marca && vehicles[item].modelo && vehicles[item].ano){
                            return `${vehicles[item].marca} ${vehicles[item].modelo} ${vehicles[item].ano}`
                        }
                    }

                    return(
                        <tr>
                            <td
                            style={{textTransform: 'uppercase'}}
                            >{vehicles[item].placa ? vehicles[item].placa : ''}</td>

                            <td 
                            style={{textTransform: 'capitalize'}}
                            >
                            {carModel()}
                            </td>
                            
                            <td
                            style={{textTransform: 'capitalize'}}
                            >{vehicles[item].unidade ? vehicles[item].unidade : ''}</td>
                            
                            <td>{vehicles[item].despesa ? vehicles[item].despesa : ''}</td>
                            
                            {activities &&
                            <td
                            style={{textTransform: 'capitalize'}}
                            >{activities[item] && activities[item]}</td>
                            
                            }
                            
                            <td>{vehicles[item].renavam ? vehicles[item].renavam : ''}</td> 
                            
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
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)'}}}
            >   
            {handleModalContent()}
            </Modal> 

        </Container>
    );  

}

export default ManangeVehicles;