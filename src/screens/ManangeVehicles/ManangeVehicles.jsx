import { useContext, useEffect, useState } from "react";
import styles from './ManangeVehicles.module.css';

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

import { ApiContext } from "../../context/ApiContext";


const ManangeVehicles = () => {
    

    return(
        <Container>
           <div>Gerenciar Veículos</div>
        </Container>
    );  

}

export default ManangeVehicles;