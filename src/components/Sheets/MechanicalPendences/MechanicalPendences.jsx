import styles from './MechanicalPendences.module.css';
import {CiCircleRemove} from 'react-icons/ci';
import {HiCheck} from 'react-icons/hi';
import {BsTools} from 'react-icons/bs';
import {AiFillPlusCircle} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const MechanicalPendences = ({data, curVehicle, fetchData}) => {

    const pendencesList = data.pendenciasMec ? data.pendenciasMec[curVehicle] : '';


    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const [pendenceValue, setPendenceValue] = useState('');

    //Confirm pendence states declaration
    const [curConfirmPendence, setCurConfirmPendence] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceShop, setServiceShop] = useState('');
    const [serviceDate, setServiceDate] = useState('');


    //Set content that will show on screen
    const handleModalContent = () => {
        if(modalContent == 'add'){
            return(
                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> 

                <span className={styles.modalTitle}>Nova Pendência</span>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Descrição:</span>
                        <input autoFocus onChange={(val) => setPendenceValue(val.target.value)} className={styles.modalInput} type='text'></input>
                    </div>
                    <div style={{display: 'flex', gap: '.8rem'}}>

                        <button 
                        onSubmit={(e) => {e.preventDefault(); handleAddPendence()}} 
                        type='submit' 
                        className={styles.modalBtn} 
                        onClick={handleAddPendence}>
                            Adicionar
                        </button>

                        <button onClick={() => setModalVisible(false)} className={styles.modalBtn}>Cancelar</button>
                    </div> 
                    
                    </form>      
            );
        }
        else if (modalContent == 'confirmPendence'){
            return(
                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> 

                <span className={styles.modalTitle}>Marcar como Concluído</span>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Descrição do serviço realizado:</span>
                        <input autoFocus onChange={(val) => setServiceDescription(val.target.value)} className={styles.modalInput} type='text'></input>
                        
                        <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Oficina:</span>
                        <input onChange={(val) => setServiceShop(val.target.value)} className={styles.modalInput} type='text'></input>

                        <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Data do serviço:</span>
                        <input onChange={(val) => setServiceDate(val.target.value)} className={styles.modalInput} type='date'></input>

                    </div>
                    <div style={{display: 'flex', gap: '.8rem'}}>
                        <button 
                        onSubmit={(e) => {e.preventDefault(); handleConfirmPendence()}} 
                        type='submit'
                        className={styles.modalBtn} 
                        >
                            Confirmar
                        </button>
                        <button onClick={() => setModalVisible(false)} className={styles.modalBtn}>Cancelar</button>
                    </div> 
                    
                    </form>      
            );
        }
    }

    
    //On click to confirm pendence
    const handleOnClickConfirm = (item) => {
        setCurConfirmPendence(item);
        setModalContent('confirmPendence');
        setModalVisible(!modalVisible);
    }
    //On confirm pendence
    const handleConfirmPendence = () => {

        let mecHistory = data.historicoMec;

        let newHistoryItem = {
            [serviceDescription]: {
                'date' : [serviceDate],
                'shop' : [serviceShop]
            }
        };

        let newArray = {'historicoMec' : {
            ...mecHistory,
            [curVehicle] : {
                ...mecHistory[curVehicle],
                newHistoryItem
            }
        }
        };
        console.log(newArray);

    };

    //On click add button
        const handleOnClickAdd = () => {
            setModalContent('add');
            setModalVisible(!modalVisible);
        }
    //On add new pendence
    const handleAddPendence = () =>{
        let pendencias = data.pendenciasMec;

        //concat pendenceValue without change the previous pendences.
        let newArray = {'pendenciasMec':{
            ...pendencias, 
            [curVehicle] : [
                ...pendencias[curVehicle],
                pendenceValue
            ]
        }
        };
        //concat previous data from json with the new pendences.
        let toPostArray = {
            ...data,
            ...newArray
        };
        console.log(toPostArray);

        //fetch new data from toPostArray to json
        fetch('http://localhost:5000/assistencia', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(toPostArray)
        })
        .then (response => response.json)
        .catch(err => console.log(err))

        setModalVisible(!modalVisible);
        fetchData();
    }

    //On click remove pendence
    const handleRemovePendence = (item) => {

        let pendencias = data.pendenciasMec;

        let filteredArray = data.pendenciasMec[curVehicle].filter((pendenceItem) => {
            if(pendenceItem != item){
                return pendenceItem
            }
        });

        let newArray = {'pendenciasMec' : {
            ...pendencias,
            [curVehicle] : [
                ...filteredArray
            ]
        }
        };

        let toPostArray = {
            ...data,
            ...newArray
        };

        //fetch new data from toPostArray to json
       fetch('http://localhost:5000/assistencia', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(toPostArray)
        })
        .then (response => response.json)
        .catch(err => console.log(err))

        fetchData();
    }

    //If have no pendences, then return a blank component. Else return the correct component 
    if(data.pendenciasMec[curVehicle] == "[]"){
        return
    }
    else{
        return(
            <div className={styles.boxContainer}>
            <div className={styles.boxHeader}>
                <BsTools/>
                Manutenções Pendentes
                <AiFillPlusCircle onClick={handleOnClickAdd} className={styles.addButton}/>
            </div>
                {
                pendencesList ?    
                pendencesList.map((item, index) => {
                    return(
                        <div key={index} className={styles.itemContainer}>
                            <div className={styles.boxItem}>{item}</div>
                            <div style={{display: 'flex', gap: '1rem'}}>
                                <HiCheck onClick={() => handleOnClickConfirm(item)} className={styles.checkBtn}/>
                                <CiCircleRemove className={styles.rmvBtn} onClick={() => handleRemovePendence(item)}/>
                            </div>
                        </div>
                    );
                })
                :
                <div className={styles.doNotHaveMaintanences}>Não há manutenções pendentes.</div>
                }        
            <Modal
            isOpen={modalVisible}
            className={styles.modal}
            >   
            {handleModalContent()}
            </Modal>    
    
            </div>
    
        );
    }
    
    
}
export default MechanicalPendences;