import { useEffect, useState } from "react";
import styles from './ModalEditVehicle.module.css';

import brasao from '../../../../assets/imgs/brasao.png'

import ReactInputMask from "react-input-mask";
import {GiCarWheel} from 'react-icons/gi';
import {AiOutlineSchedule} from 'react-icons/ai';
import { setDoc, doc, getDoc } from "firebase/firestore";


export const ModalEditVehicle = ({
    unidades, 
    db, 
    modalVisible, 
    setModalVisible, 
    vehicleId,
    vehicles,
    activities,
    tires,
    insurances
}) => {

    const [marca, setMarca] = useState();
    const [modelo, setModelo] = useState();
    const [placa, setPlaca] = useState();
    const [renavam, setRenavam] = useState();
    const [atividade, setAtividade] = useState();
    const [despesa, setDespesa] = useState();
    const [ufOrigem, setUfOrigem] = useState();
    const [anoFabricacao, setAnoFabricacao] = useState();
    const [unidade, setUnidade] = useState();
    const [imagem, setImagem] = useState();
    const [seguradora, setSeguradora] = useState();
    const [vigenciaSeguro, setVigenciaSeguro] = useState();
    const [pneus, setPneus] = useState();
    const [agendamento, setAgendamento] = useState();

    //set values to inputs
    const setData = () => {

        if(vehicles[vehicleId])
        {
            setMarca(vehicles[vehicleId].marca && vehicles[vehicleId].marca);
            setModelo(vehicles[vehicleId].modelo && vehicles[vehicleId].modelo);
            setPlaca(vehicles[vehicleId].placa && vehicles[vehicleId].placa);
            setRenavam(vehicles[vehicleId].renavam && vehicles[vehicleId].renavam);
            setDespesa(vehicles[vehicleId].despesa && vehicles[vehicleId].despesa);
            setUfOrigem(vehicles[vehicleId].ufOrigem && vehicles[vehicleId].ufOrigem);
            setAnoFabricacao(vehicles[vehicleId].ano && vehicles[vehicleId].ano);
            setImagem(vehicles[vehicleId].image && vehicles[vehicleId].image);
            setAgendamento(vehicles[vehicleId].precisaAgendar && vehicles[vehicleId].precisaAgendar);
        }
        setAtividade(activities[vehicleId] && activities[vehicleId]);
        
        if(insurances[vehicleId]){
            setSeguradora(insurances[vehicleId].seguradora && insurances[vehicleId].seguradora);
            setVigenciaSeguro(insurances[vehicleId].vigencia && insurances[vehicleId].vigencia);
        }

        setPneus(tires[vehicleId] && tires[vehicleId]);
    }

    useEffect(() => {
        setData();
    }, []);

    const handleCancelModal = () => {
        setModalVisible(!modalVisible);
        setMarca('');
        setModelo('');
        setPlaca('');
        setRenavam('');
        setDespesa('');
        setUfOrigem('sc');
        setAnoFabricacao('');
        setUnidade(unidades && Object.keys(unidades)[0]);
        setImagem('');
        setSeguradora('');
        setVigenciaSeguro('');
        setPneus('');
        setAgendamento(false);
    };
    const handleAddCar = (event) => {
        event.preventDefault();

        
        let newVehicle = {
            [vehicleId] : {
                'marca' : marca,
                'modelo' : modelo,
                'ano' : anoFabricacao,
                'placa' : placa,
                'renavam' : renavam,
                'imagem' : imagem,
                'despesa' : despesa,
                'ufOrigem' : ufOrigem,
                'unidade' : unidade,
                'precisaAgendar' : agendamento
            }
        }


        let newInsurance = {
            [vehicleId] : {
                'seguradora' : seguradora,
                'vigencia' : vigenciaSeguro
            }
        }
        let newActivity = {
            [vehicleId] : atividade
        }

        let newTires = {
            [vehicleId] : {
                ...pneus
            }
        }

        setDoc(doc(db, 'assistencia', 'veiculos'), newVehicle, {merge: true});
        setDoc(doc(db, 'assistencia', 'seguros'), newInsurance, {merge: true});
        setDoc(doc(db, 'assistencia', 'atividades'), newActivity, {merge: true});
        setDoc(doc(db, 'assistencia', 'pneus'), newTires, {merge: true});


        setModalVisible(!modalVisible);
        setMarca('');
        setModelo('');
        setPlaca('');
        setRenavam('');
        setDespesa('');
        setUfOrigem('sc');
        setAnoFabricacao('');
        setUnidade(unidades && Object.keys(unidades)[0]);
        setImagem('');
        setSeguradora('');
        setVigenciaSeguro('');
        setPneus('');
        setAgendamento(false);


    };
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />

                <span className={styles.modalTitle}>Editar Veículo</span>

                <form onSubmit={(e) => handleAddCar(e)} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '1rem'}}> 
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
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
                                        <select value={ufOrigem} onChange={(val) => setUfOrigem(val.target.value)} className={styles.modalInputHalf} type='text'>
                                            <option value={'pr'}>PR</option>
                                            <option value={'sc'}>SC</option>
                                            <option value={'rs'}>RS</option>
                                        </select>
                                    </div>    
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Unidade:</span>
                                    <select value={unidade} onChange={(val) => setUnidade(val.target.value)} className={styles.modalInput} type='text'>
                                        {unidades && 
                                            Object.keys(unidades).map((item, index) => {
                                                return(
                                                    <option key={index} value={item}>{item}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div> 
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Atividade:</span>
                                    <input 
                                    value={atividade}
                                    onChange={(text) => setAtividade(text.target.value)}
                                    placeholder="atividade" 
                                    className={styles.modalInput} 
                                    type='text'
                                    ></input>
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

                                <span style={{marginTop: '1rem'}}>
                                    <GiCarWheel/> Tipo e Estado dos pneus:
                                </span> 
                                    
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem'}}>
                                            <div className={styles.verticalFlex}>
                                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Dianteiro Esquerdo:</span>
                                                <select
                                                defaultValue={tires[vehicleId].de}
                                                onChange={(val) => setPneus(
                                                    {
                                                        ...pneus,
                                                        'de' : val.target.value
                                                    }
                                                )}
                                                className={styles.modalSelectSmall}
                                                >
                                                    <option disabled value="selecionar">Selecionar</option>
                                                    <option value="Bom">Bom</option>
                                                    <option value="Médio">Médio</option>
                                                    <option value="Ruim">Ruim</option>
                                                </select>
                                            </div>
                                            <div className={styles.verticalFlex}>
                                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Dianteiro Direito:</span>
                                                <select
                                                defaultValue={tires[vehicleId].dd}
                                                onChange={(val) => setPneus(
                                                    {
                                                        ...pneus,
                                                        'dd' : val.target.value
                                                    }
                                                )} 
                                                className={styles.modalSelectSmall}
                                                >
                                                    <option disabled value="selecionar">Selecionar</option>
                                                    <option value="Bom">Bom</option>
                                                    <option value="Médio">Médio</option>
                                                    <option value="Ruim">Ruim</option>
                                                </select>
                                            </div>
                                    </div>

                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem'}}>
                                        <div className={styles.verticalFlex}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Traseiro Esquerdo:</span>
                                            <select
                                            defaultValue={tires[vehicleId].te}
                                            onChange={(val) => setPneus(
                                                {
                                                    ...pneus,
                                                    'te' : val.target.value
                                                }
                                            )}   
                                            className={styles.modalSelectSmall}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                        </div>
                                        <div className={styles.verticalFlex}>  
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Traseiro Direito:</span>
                                            <select
                                            defaultValue={tires[vehicleId].td}
                                            onChange={(val) => setPneus(
                                                {
                                                    ...pneus,
                                                    'td' : val.target.value
                                                }
                                            )} 
                                            className={styles.modalSelectSmall}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                        </div>     
                                    </div> 
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem'}}>
                                        <div className={styles.verticalFlex}>
                                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Estepe:</span>
                                                <select
                                                defaultValue={tires[vehicleId].estepe}
                                                onChange={(val) => setPneus(
                                                    {
                                                        ...pneus,
                                                        'estepe' : val.target.value
                                                    }
                                                )} 
                                                className={styles.modalSelectSmall}
                                                >
                                                    <option disabled value="selecionar">Selecionar</option>
                                                    <option value="Bom">Bom</option>
                                                    <option value="Médio">Médio</option>
                                                    <option value="Ruim">Ruim</option>
                                                </select>                                           
                                        </div>
                                        <div className={styles.verticalFlex}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Tipo: </span>
                                            <ReactInputMask
                                            value={tires[vehicleId].tipo}
                                            mask={"999/99 r99"}
                                            placeholder="___/__ r__"
                                            onChange={(val) => setPneus(
                                                {
                                                    ...pneus,
                                                    'tipo' : val.target.value
                                                }
                                            )} 
                                            className={styles.modalSelectSmall} 
                                            type='text'
                                        ></ReactInputMask>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.horizontalFlex} style={{marginTop: '1rem', marginTop: '2rem'}}>
                                        <AiOutlineSchedule/>
                                        <span style={{fontSize: '14px', marginLeft: '1rem', marginRight: '.5rem'}}>Necessita agendamento para uso</span>
                                        <input 
                                        type="checkbox" 
                                        defaultChecked={vehicles[vehicleId].precisaAgendar == true ? true : false} 
                                        
                                        onChange={() => setAgendamento(!agendamento)}
                                        />
                                    </div>
                             </div>                     

                        </div>
                              
                        </div>
                        <div style={{display: 'flex', gap: '.8rem'}}>
                            <button 
                            type='submit' 
                            className={styles.modalBtn} 
                            >Salvar</button>

                            <button className={styles.modalBtn} onClick={handleCancelModal}>Cancelar</button>
                        </div>                       
                    </form>
                     
                </div>      

    );



}