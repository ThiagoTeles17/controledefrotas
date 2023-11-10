import { useContext, useEffect, useState } from "react";
import styles from './Drivers.module.css';

import Container from "../../components/Container/Container";
import Modal from 'react-modal';
import brasao from '../../assets/imgs/brasao.png'

import {BsFillPencilFill, BsPencilFill} from 'react-icons/bs';

import {AiFillPlusCircle} from 'react-icons/ai';



import { ApiContext } from "../../context/ApiContext";
import { ModalAddVehicle } from "../ManangeVehicles/components/ModalAddVehicle/ModalAddVehicle";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ModalEditVehicle } from "../ManangeVehicles/components/ModalEditVehicle/ModalEditVehicle";
import {GrCheckmark} from 'react-icons/gr';


const Drivers = () => {

        
    const {curVehicle, setCurVehicle, db} = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('add');

    //sucess message on save changes
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');

    const [vehicles, setVehicles] = useState();
    const [activities, setActivities] = useState();
    const [unities, setUnities] = useState();
    const [tires, setTires] = useState();
    const [insurances, setInsurances] = useState();

    const [vehToEditId, setVehToEditId] = useState();

    const getDatabase = async() => {
        setVehicles((await getDoc(doc(db, 'assistencia', 'veiculos'))).data());
        setActivities((await getDoc(doc(db, 'assistencia', 'atividades'))).data());
        setUnities((await getDoc(doc(db, 'assistencia', 'unidades'))).data());
        setTires((await getDoc(doc(db, 'assistencia', 'pneus'))).data());
        setInsurances((await getDoc(doc(db, 'assistencia', 'seguros'))).data());
        console.log(vehicles);
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
                    <td>Nome do Condutor</td>
                    <td style={{width: '25rem'}}>CNH</td>
                    <td>Categoria</td>
                    <td>Validade</td>
                    <td>Situação</td>           
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