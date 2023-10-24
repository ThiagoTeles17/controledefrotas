import { useContext, useEffect, useState } from "react";
import styles from './ManangeVehicles.module.css';

import Container from "../../components/Container/Container";
import Modal from 'react-modal';
import brasao from '../../assets/imgs/brasao.png'

import {CiCircleRemove} from 'react-icons/ci';
import {BsFillPencilFill, BsPencilFill} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiFillPlusCircle} from 'react-icons/ai';

import ReactInputMask from "react-input-mask";

import { ApiContext } from "../../context/ApiContext";


const ManangeVehicles = () => {
    
    const {curVehicle, setCurVehicle, dados, setDados, fetchData} = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('add');

    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <form onSubmit={(e) => e.preventDefault()} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}> 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                    <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />
                        <span className={styles.modalTitle}>Adicionar Veículo</span>

                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Marca:</span>
                                <input placeholder="marca do veículo" autoFocus className={styles.modalInput} type='text'></input>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Modelo:</span>
                                <input placeholder="modelo do veículo" className={styles.modalInput} type='text'></input>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Ano de fabricação/modelo:</span>
                                <ReactInputMask mask={"9999/9999"} placeholder="ano de fabricação/modelo do veículo" className={styles.modalInput} type='text'></ReactInputMask>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Placa:</span>
                                <input maxLength={7} placeholder="placa"  className={styles.modalInputHalf} type='text'></input>
                            </div> 
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Renavam:</span>
                                <input placeholder="renavam"  className={styles.modalInputHalf} type='text'></input>
                            </div> 
                            </div>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Despesa Orçamentária:</span>
                                    <input maxLength={3} placeholder="despesa" className={styles.modalInputHalf} type='text'></input>
                                </div> 
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>UF de Origem:</span>
                                    <select className={styles.modalInputHalf} type='text'>
                                        <option value={'pr'}>PR</option>
                                        <option selected='selected' value={'sc'}>SC</option>
                                        <option value={'rs'}>RS</option>
                                    </select>
                                </div>    
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Unidade:</span>
                                <select className={styles.modalInput} type='text'>
                                    {dados.unidades && 
                                        dados.unidades.map((item, index) => {
                                            return(
                                                <option key={index} value={item}>{item}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div> 
                            
                            <div style={{display: 'flex', gap: '.8rem'}}>

                                <button 
                                type='submit' 
                                className={styles.modalBtn} 
                                >
                                    Adicionar
                                </button>

                                <button className={styles.modalBtn}>Cancelar</button>
                            </div> 
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Imagem:</span>
                                <input placeholder="link da imagem" className={styles.modalInput} type='text'></input>
                            </div>
                    </form>      
            );
        }
       
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(dados['veiculos'])
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
            >   
            {handleModalContent()}
            </Modal> 

        </Container>
    );  

}

export default ManangeVehicles;