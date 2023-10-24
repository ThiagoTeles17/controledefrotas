import { useContext, useEffect, useState } from "react";
import styles from './Dashboard.module.css';

import Container from "../../components/Container/Container";
import ListBox from "../../components/ListBox/ListBox";
import CarImage from "../../components/CarImage/CarImage";
import MechanicalPendences from "../../components/Sheets/MechanicalPendences/MechanicalPendences";
import VerticalContainer from "../../components/VerticalContainer/VerticalContainer";
import CarDescription from '../../components/Sheets/CarDescription/CarDescription';
import Tires from "../../components/Sheets/Tires/Tires";
import MaintenancesHistory from "../../components/Sheets/MaintenancesHistory/MaintenancesHistory";
import LargeBtn from "../../components/Buttons/LargeBtn/LargeBtn";
import VehicleControl from "../../components/Sheets/VehicleControl/VehicleControl";

import {VscLoading} from 'react-icons/vsc'
import {AiFillCar} from 'react-icons/ai';

import { ApiContext } from "../../context/ApiContext";


const Dashboard = () => {

    const {curVehicle, setCurVehicle, dados, setDados, fetchData} = useContext(ApiContext);

    useEffect (() => {
        fetchData();
    }, [curVehicle]);

    if(JSON.stringify(dados) == '{}' || JSON.stringify(dados) == undefined || JSON.stringify(dados) == '[]'){
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25rem'}}>
                 <VscLoading className={styles.loading}/>
            </div>
        );
    }
    else if (JSON.stringify(dados.veiculos) == '{}' || JSON.stringify(dados.veiculos) == undefined){
        return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25rem'}}>
            Nenhum Veículo Encontrado
        </div>
        );
    }
    else {
        if(curVehicle == null){
            setCurVehicle(Object.keys(dados.veiculos)[0]);
        }else{
            return(
                <Container>
                    <VerticalContainer>
                        <ListBox data={dados} items={['uno', 'duos']}/>
                        <CarImage data={dados} curVehicle={curVehicle}/>
                        <MechanicalPendences fetchData={fetchData} data={dados} curVehicle={curVehicle}/>  
                    </VerticalContainer>
                    <VerticalContainer>
                        <CarDescription data={dados}/>
                        <Tires data={dados} curVehicle={curVehicle}/>
                    </VerticalContainer>
                    <VerticalContainer>
                        <LargeBtn 
                        title='Consulta Detran'
                        link={
                            dados.veiculos ?
                            `https://consultas.detrannet.sc.gov.br/servicos/consultaveiculo.asp?placa=${dados.veiculos[curVehicle].placa}&renavam=${dados.veiculos[curVehicle].renavam}`
                            : ''
                        }
                        icon={<AiFillCar/>}
                        />
                        <VehicleControl years={[2021, 2022, 2023]} months={['01', '02', '03', '04', '05', '06']}/>
                        <MaintenancesHistory data={dados} curVehicle={curVehicle}/>
                    </VerticalContainer>
                </Container>
            );  
    
        }
       
    }
    

}

export default Dashboard;