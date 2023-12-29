import { useContext, useEffect, useState } from "react";
import styles from './ManangeVehicles.module.css';

import Container from "../../components/Container/Container";
import Modal from 'react-modal';
import brasao from '../../assets/imgs/brasao.png'

import {CiCircleRemove} from 'react-icons/ci';
import {BsFillPencilFill, BsPencilFill} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiFillPlusCircle} from 'react-icons/ai';
import { Pannel } from "./components/Pannel/Pannel";


import { ApiContext } from "../../context/ApiContext";
import { ModalAddVehicle } from "./components/ModalAddVehicle/ModalAddVehicle";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ModalEditVehicle } from "./components/ModalEditVehicle/ModalEditVehicle";
import Box from "../../components/Sheets/CarDescription/Box/Box";
import VerticalContainer from "../../components/VerticalContainer/VerticalContainer";
import {GrCheckmark} from 'react-icons/gr';


const ManangeVehicles = () => {

        
    const {
        curVehicle, 
        setCurVehicle, 
        db, 
        vehicles, 
        activities, 
        unities, 
        tires, 
        insurances, 
        images,
        getVehicles,
        getActivities,
        getUnities,
        getTires,
        getInsurances,
        getImages
    } = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('add');

    //sucess message on save changes
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');

    const [vehToEditId, setVehToEditId] = useState();

    const [vehiclesSorted, setVehiclesSorted] = useState([]);

    const sortData = () => {
        if(vehicles){    
            const sorted = Object.keys(vehicles).sort((a, b) => {
                setVehiclesSorted((vehicles[a].modelo).toLowerCase() < (vehicles[b].modelo).toLowerCase() ? 1 : -1);
            })
            setVehiclesSorted(sorted);
            
            console.log(sorted.map((i) => {return vehicles[i].modelo}))
        }
    }

    const getDatabase = () => {
        getVehicles();
        getActivities();
        getUnities();
        getTires();
        getInsurances();
        getImages();
    };    
    
    useEffect(() => {
        sortData();
    }, [vehicles]);

    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <ModalAddVehicle
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                unidades={unities}
                db={db}
                getDatabase={() => getDatabase()}
                setSuccessMessage={setSuccesMessage}
                setSuccess={setSuccess}
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
                insurances={insurances}
                getDatabase={() => getDatabase()}
                setSuccessMessage={setSuccesMessage}
                setSuccess={setSuccess}
                images={images}
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
        <div className={styles.VerticalContainer}>

            {/* TODO
            <Container>
                    <Pannel
                    title="Veiculos Cadastrados:"
                    content={vehicles && Object.keys(vehicles).length}
                    />
                    <Pannel
                    title="Veiculos Ativos:"
                    content={vehicles && Object.keys(vehicles).length}
                    />
            </Container>
           */}

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
           
            {/* TODO painel
            <Box
            title='Veículos Cadastrados'
            content={vehicles && Object.keys(vehicles).length}
            ></Box>*/}

           <table>
                <tr className={styles.tableHeader}>
                    <td>Placa</td>
                    <td style={{width: '25rem'}}>Modelo</td>
                    <td>Unidade</td>
                    <td>Despesa</td>
                    <td>Atividade</td>           
                    <td>Renavam</td>
                    <td>Status</td>
                    <td></td>
                </tr>
                {vehicles && 
                vehiclesSorted.map((item, index) => {

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
                            
                            <td>{vehicles[item].ativo && vehicles[item].ativo == true ? 'Ativo' : 'Inativo'}</td> 

                            <td style={{width: '1.5rem'}}>
                                <BsFillPencilFill
                                onClick={() => handleEditVehicle(item)}
                                className={styles.editBtn}
                            />
                            </td> 
                        </tr>
                    );
                })/*TODO Sort Map*/}
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

export default ManangeVehicles;