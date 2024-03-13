import styles from './MechanicalPendences.module.css';
import {CiCircleRemove} from 'react-icons/ci';
import {HiCheck} from 'react-icons/hi';
import {BsTools} from 'react-icons/bs';
import {AiFillPlusCircle} from 'react-icons/ai';
import { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import brasao from '../../../assets/imgs/brasao.png';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ApiContext } from '../../../context/ApiContext';
import { IoMdClose } from 'react-icons/io';


const MechanicalPendences = ({curVehicle, db}) => {


    const {mechanicalPendences, maintenanceHistory, getMechanicalPendences, getMaintenanceHistory} = useContext(ApiContext);

    const pendencesRef = doc(db, 'assistencia', 'pendenciasMec');
    const mecHistoryRef = doc(db, 'assistencia', 'historicoMec');

    let date = new Date();
    let curYear = String(date.getFullYear());
    let curMonth = String(date.getMonth()+1);
    let curDay = String(date.getDate());

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [pendenceValue, setPendenceValue] = useState('');

    //Confirm pendence states declaration
    const [curConfirmPendence, setCurConfirmPendence] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceShop, setServiceShop] = useState('');
    const [serviceDate, setServiceDate] = useState(`${curYear}-${curMonth.padStart(2, "0")}-${curDay.padStart(2, "0")}`);
    const [NFlink, setNFlink] = useState('');
    const [partsList, setPartsList] = useState({});
    const [addPartInputVisible, setAddPartInputVisible] = useState(false);
    const [partDesc, setPartDesc] = useState('');
    const [partQuantity, setPartQuantity] = useState(1);
    const [partsIdCounter, setPartsIdCounter] = useState(0);
    const [sortedPartsList, setSortedPartsList] = useState(partsList);
    const [commitmentNumber, setCommitmentNumber] = useState('');
    const [NFnumber, setNFnumber] = useState('');

    //prevent scroll when modal is open
    useEffect(() => {
        if (modalVisible) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
      }, [modalVisible]);

      
    
    //Set content that will show on modal
    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> 
                <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />

                <span className={styles.modalTitle}>Cadastrar Pendência</span>
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
        else if (modalContent === 'confirmPendence'){

            
            //Displays inputs to set description and quantity of a part
            const handleAddPart = () => {

                setPartsIdCounter(partsIdCounter + 1);
                if((partDesc && partDesc.length > 0) && (partQuantity > 0)){
                let newPartsList = {
                    ...partsList,
                    'items': {
                        ...partsList['items'],
                        [partsIdCounter] : {
                            'desc' : partDesc,
                            'quantity' : partQuantity
                        }
                }};
                let sorted = Object.keys(newPartsList.items).sort((a, b) => {
                    return a > b ? -1 : 1
                });
                setSortedPartsList(sorted);
                setPartsList(newPartsList);
                setPartDesc(null);
                setPartQuantity(1);
                setAddPartInputVisible(false);
                }
                else{
                    if(!partDesc || partDesc.length < 0){
                        alert("Digite uma descrição para a peça");
                    }
                    else if (partQuantity <= 0){
                        alert("Digite uma quantidade válida");
                    }
                }

            }


            return(
                <form onSubmit={(e) => {e.preventDefault(); handleConfirmPendence()}} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> 

                <span className={styles.modalTitle}>Marcar como concluído</span>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        
                        <div className={styles.horizontalFlex} style={{width: '100%', gap: "1rem", justifyContent: 'space-between', alignItems: 'center'}}>
                            <div className={styles.verticalFlex}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Descrição do serviço realizado:</span>
                                <input value={serviceDescription} autoFocus onChange={(val) => setServiceDescription(val.target.value)} className={styles.modalInput} type='text'></input>
                            </div>
                         
                            <div className={styles.verticalFlex}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Oficina:</span>
                                <input onChange={(val) => setServiceShop(val.target.value)} className={styles.modalInput} type='text'></input>
                            </div>
                            <div className={styles.verticalFlex}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Data do serviço:</span>
                                <input value={serviceDate} onChange={(val) => setServiceDate(val.target.value)} className={styles.modalInput} type='date'></input>
                            </div>
                            
                        
                        </div>
                        
                        <div className={styles.horizontalFlex} style={{width: '100%', gap: "1rem", justifyContent: 'space-between', alignItems: 'center'}}>
                             
                            <div className={styles.verticalFlex}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Empenho:</span>
                                <input value={commitmentNumber} onChange={(val) => setCommitmentNumber(val.target.value)} className={styles.modalInput} type='text'></input>
                            </div>
                            <div className={styles.verticalFlex}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Número da NF:</span>
                                <input value={NFnumber} onChange={(val) => setNFnumber(val.target.value)} className={styles.modalInput} type='text'></input>
                            </div>
                            <div className={styles.verticalFlex}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Link para a NF:</span>
                                <input value={NFlink} onChange={(val) => setNFlink(val.target.value)} className={styles.modalInput} type='text'></input>
                            </div>
                        </div>

                        

                        <div className={styles.partsTable}>
                            <div className={styles.tableHeader}>
                                <span>
                                    Peças substituídas:
                                </span>
                                <AiFillPlusCircle onClick={() => setAddPartInputVisible(true)} className={styles.btnStyleOne}/>
                            </div>
                            <table className={styles.partListTable}>
                                <tr>
                                    <th style={{textAlign: 'left', width: '80%'}}>Descrição</th>
                                    <th>Quantidade</th>
                                </tr>
                            </table>

                            {addPartInputVisible &&
                            <table style={{backgroundColor: 'rgb(0, 112, 240)', margin: '1rem 0 1rem 0'}}>
                                <tr>
                                    <th style={{color: 'white', fontStyle: 'normal'}}
                                    colSpan='2'
                                    >
                                        <span>Adicionar Peça</span>
                                        <IoMdClose onClick={() => { 
                                            setAddPartInputVisible(false);
                                            setPartDesc('');
                                            setPartQuantity(1);
                                        }} 
                                        className={styles.btnStyleOne} 
                                        style={{position: 'absolute', right: '3rem'}}
                                        />
                                    </th>
                                </tr>
                                <tr style={{padding: 0}}>
                                    <td style={{padding: 0, width: '80%'}}>
                                        <input
                                        placeholder='Descrição' 
                                        className={styles.partInput} 
                                        type="text" 
                                        value={partDesc}
                                        onChange={(text) => setPartDesc(text.target.value)}
                                        />
                                    </td>
                                    <td style={{padding: 0, borderLeft: '1px solid gray'}}>
                                        <input 
                                        placeholder='Quantidade' 
                                        className={styles.partInput} 
                                        type="number" 
                                        value={partQuantity}
                                        onChange={(text) => setPartQuantity(text.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{padding: 0}} colSpan='2'>
                                        <button type='button' onClick={() => handleAddPart()} className={styles.buttonAddPart}>Adicionar</button>
                                    </th>
                                </tr>
                                
                            </table>
                            }

                            <div className={styles.tableItemsContainer}>
                            <table>
                                {sortedPartsList.length > 0 ? 
                                    sortedPartsList.map(item => {
                                        console.log(partsList)
                                    return(
                                            <tr className={styles.tableItem}>
                                                <td style={{width: '80%'}}>
                                                    {partsList.items && partsList.items[item].desc}
                                                </td>
                                                <td style={{textAlign: 'center'}}>
                                                    {partsList.items && partsList.items[item].quantity}
                                                </td>
                                            </tr>                                         
                                    )
                                    
                                })
                                :
                                <tr className={styles.tableItem}>
                                    <td style={{fontStyle: 'italic', color: 'gray', textAlign: 'center'}}>Adicione uma ou mais peças</td>
                                </tr>
                                
                                }
                                                                                               
                            </table>
                            </div>
                        </div>

                    </div>
                    <div style={{display: 'flex', gap: '.8rem'}}>
                        <button
                        className={styles.modalBtn}
                        type='submit'
                        >
                        Confirmar
                        </button>
                        <button 
                            onClick={() =>
                             {
                                setModalVisible(false); 
                                setPartsList({'items' : {}}); 
                                setSortedPartsList({'items' : {}})}
                            } 
                            className={styles.modalBtn}>Cancelar</button>
                    </div> 
                    
                    </form>      
            );
        }
    }
    
    
    //On click to confirm pendence
    const handleOnClickConfirm = (item) => {
        setCurConfirmPendence(item);
        setServiceDescription(item);
        setModalContent('confirmPendence');
        setModalVisible(!modalVisible);
    }
    //On confirm pendence
    const handleConfirmPendence = () => {

        //On confirm a pendence, it becomes a history item

        //filter pendences list to remove the current pendence
        let filteredArray = mechanicalPendences[curVehicle].filter((pendenceItem) => {
            if(pendenceItem != curConfirmPendence){
                return pendenceItem
            }
        });
        
        //generate id to service
        const serviceId = () => {
            return Date.now().toString();
        };

        //set new history item structure
        let newHistoryItem = {
            ['serv' + serviceId()]: {
                'desc' : serviceDescription,
                'date' : serviceDate,
                'shop' : serviceShop,
                'nfLink' : NFlink,
                'commitment' : commitmentNumber,
                'nfNumber' : NFnumber,
                'partsList' : partsList              
            }
        };

        //concat new history item to previous history
        let newHistory = maintenanceHistory[curVehicle] ? {
            [curVehicle] : {
                ...maintenanceHistory[curVehicle],
                ...newHistoryItem
            }
        } : {
            [curVehicle] : {
                ...newHistoryItem
            }
        };

        let newMechanicalPendences = {
            [curVehicle] : [
                ...filteredArray
            ]
        };

        setDoc(mecHistoryRef, newHistory, {merge: true});
        setDoc(pendencesRef, newMechanicalPendences, {merge: true});

        
        getMechanicalPendences();
        getMaintenanceHistory();

        setServiceDate(`${curYear}-${curMonth.padStart(2, "0")}-${curDay.padStart(2, "0")}`);
        setServiceDescription('');
        setServiceShop('');
        setModalVisible(!modalVisible);
        setPartsIdCounter(0);
        setPartDesc('');
        setPartQuantity(1);
        setPartsList({});
        setNFlink('');
        setCommitmentNumber('');
        setNFnumber('');
        
    };

    //On click add button
    const handleOnClickAdd = () => {
            setModalContent('add');
            setModalVisible(!modalVisible);
    }
    //On add new pendence
    const handleAddPendence = () => {


        let newArray = mechanicalPendences[curVehicle] ? { 
            [curVehicle] : [
                ...mechanicalPendences[curVehicle],
                pendenceValue
            ]
        } : { 
            [curVehicle] : [
                pendenceValue
            ]
        };

        setDoc(pendencesRef, newArray, {merge: true});
        getMechanicalPendences();
        setModalVisible(!modalVisible);

    }

    //On click remove pendence
    const handleRemovePendence = (item) => {

        let filteredArray = mechanicalPendences[curVehicle].filter((pendenceItem) => {
            if(pendenceItem != item){
                return pendenceItem
            }
        });

        let newArray = {
            [curVehicle] : [
                ...filteredArray
            ]
        };

        setDoc(pendencesRef, newArray, {merge: true});
        getMechanicalPendences();

    }

    //If have no pendences, then return a blank component. Else, return the correct component 
    
        return(
            <div className={styles.boxContainer}>
            <div className={styles.boxHeader}>
                <BsTools/>
                Manutenções Pendentes
                <AiFillPlusCircle onClick={handleOnClickAdd} className={styles.addButton}/>
            </div>
                {mechanicalPendences[curVehicle] ?
                <>
                {
                (mechanicalPendences[curVehicle]).length > 0 ?
                mechanicalPendences[curVehicle].map((item, index) => {

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
            </>  
            :  
            <div className={styles.doNotHaveMaintanences}>Não há manutenções pendentes.</div> 
            }   
            <Modal
            isOpen={modalVisible}
            className={styles.modal}
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)'}}}
            >   
            {handleModalContent()}
            </Modal>    
    
            </div>
        );
    
    
    
}
export default MechanicalPendences;