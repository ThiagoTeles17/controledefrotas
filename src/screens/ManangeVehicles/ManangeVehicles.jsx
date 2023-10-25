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

    const [marca, setMarca] = useState('rgr');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [renavam, setRenavam] = useState('');
    const [despesa, setDespesa] = useState('');
    const [ufOrigem, setUfOrigem] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState('');
    const [unidade, setUnidade] = useState(dados.unidades && dados.unidades[0]);
    const [imagem, setImagem] = useState('');
    const [seguradora, setSeguradora] = useState('');
    const [vigenciaSeguro, setVigenciaSeguro] = useState('');
    const [pneus, setPneus] = useState([{}]);

    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />

                <span className={styles.modalTitle}>Adicionar Veículo</span>

                <form onSubmit={(e) => handleAddCar(e)} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}> 
                    <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Marca:</span>
                                            <input
                                            value={marca}
                                            onChange={(text) => setMarca(text.target.value)}
                                            placeholder="marca do veículo" 
                                            autoFocus 
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                        </div> 
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Modelo:</span>
                                            <input 
                                            value={modelo}
                                            onChange={(text) => setModelo(text.target.value)}
                                            placeholder="modelo do veículo" 
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                        </div> 
                                </div>
        
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Ano de fabricação/modelo:</span>
                                    <ReactInputMask 
                                    value={anoFabricacao}
                                    onChange={text => setAnoFabricacao(text.target.value)}
                                    mask={"9999/9999"} 
                                    placeholder="ano de fabricação/modelo do veículo" 
                                    className={styles.modalInput} 
                                    type='text'
                                    ></ReactInputMask>
                                </div>

                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Placa:</span>
                                        <input
                                        value={placa}
                                        onChange={(text) => setPlaca(text.target.value)}
                                        maxLength={7} 
                                        placeholder="placa"  
                                        className={styles.modalInputHalf} 
                                        type='text'
                                        ></input>
                                    </div> 
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Renavam:</span>
                                        <input 
                                        value={renavam}
                                        onChange={(text) => setRenavam(text.target.value)}
                                        placeholder="renavam" 
                                        className={styles.modalInputHalf} 
                                        type='text'
                                        ></input>
                                    </div> 
                                </div>

                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Despesa Orçamentária:</span>
                                        <input 
                                        value={despesa}
                                        onChange={text => setDespesa(text.target.value)}
                                        maxLength={3}
                                        placeholder="despesa"
                                        className={styles.modalInputHalf} 
                                        type='text'
                                        ></input>
                                    </div> 
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>UF de Origem:</span>
                                        <select onChange={(val) => setUfOrigem(val.target.value)} className={styles.modalInputHalf} type='text'>
                                            <option value={'pr'}>PR</option>
                                            <option selected='selected' value={'sc'}>SC</option>
                                            <option value={'rs'}>RS</option>
                                        </select>
                                    </div>    
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Unidade:</span>
                                    <select value={unidade} onChange={(val) => setUnidade(val.target.value)} className={styles.modalInput} type='text'>
                                        {dados.unidades && 
                                            dados.unidades.map((item, index) => {
                                                return(
                                                    <option key={index} value={item}>{item}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div> 
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Imagem:</span>
                                    <input 
                                    value={imagem}
                                    onChange={(text) => setImagem(text.target.value)}
                                    placeholder="link da imagem" 
                                    className={styles.modalInput} 
                                    type='text'
                                    ></input>
                                </div> 
                                <div style={{display: 'flex', gap: '.8rem'}}>

                                    <button 
                                    type='submit' 
                                    className={styles.modalBtn} 
                                    >Adicionar</button>

                                    <button className={styles.modalBtn} onClick={handleCancelModal}>Cancelar</button>
                                </div> 
                             </div>

                             <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Seguradora:</span>
                                            <input 
                                            value={seguradora}
                                            onChange={text => setSeguradora(text.target.value)}
                                            placeholder="seguradora"
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Vigência Seguro Até:</span>
                                            <ReactInputMask
                                            mask={"99/99/9999"}
                                            value={vigenciaSeguro}
                                            onChange={text => setVigenciaSeguro(text.target.value)}
                                            placeholder="vigência"
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></ReactInputMask>
                                    </div>
                                </div>

                                <span>
                                    Estado dos pneus:
                                </span> 

                                
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Dianteiro Esquerdo:</span>
                                            <select
                                            defaultValue={'selecionar'}
                                            onChange={(val) => setPneus([...pneus, {'de' : val.target.value}])} 
                                            className={styles.modalSelectHalf}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Dianteiro Direito:</span>
                                            <select
                                            defaultValue={'selecionar'}
                                            onChange={(val) => setPneus([...pneus, {'dd' : val.target.value}])} 
                                            className={styles.modalSelectHalf}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Traseiro Esquerdo:</span>
                                            <select
                                            defaultValue={'selecionar'}
                                            onChange={(val) => setPneus([...pneus, {'te' : val.target.value}])} 
                                            className={styles.modalSelectHalf}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Traseiro Direito:</span>
                                            <select
                                            defaultValue={'selecionar'}
                                            onChange={(val) => setPneus([...pneus, {'td' : val.target.value}])} 
                                            className={styles.modalSelectHalf}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Estepe:</span>
                                            <select
                                            defaultValue={'selecionar'}
                                            onChange={(val) => setPneus([...pneus, {'estepe' : val.target.value}])} 
                                            className={styles.modalSelectHalf}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                    </div>
                                 
                             </div>

                        </div>
                    </form>
                </div>      
            );
        }
       
    }

    const handleCancelModal = () => {
        setModalVisible(!modalVisible);
        setMarca('');
        setModelo('');
        setPlaca('');
        setRenavam('');
        setDespesa('');
        setUfOrigem('');
        setAnoFabricacao('');
        setUnidade(dados.unidades && dados.unidades[0]);
        setImagem('');
        setSeguradora('');
        setVigenciaSeguro('');
        setPneus('');
    };
    const handleAddCar = (event) => {
        event.preventDefault();
        
        console.log(pneus);

    };

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
            >   
            {handleModalContent()}
            </Modal> 

        </Container>
    );  

}

export default ManangeVehicles;