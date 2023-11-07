import { createContext, useEffect, useState } from "react";

import {getFirestore, getDocs, getDoc, collection, doc} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDa8BEdqlO1Pt9WIXIXA2Xo58qmtbe5InM",
    authDomain: "asssistencia-2023.firebaseapp.com",
    databaseURL: "https://asssistencia-2023-default-rtdb.firebaseio.com",
    projectId: "asssistencia-2023",
    storageBucket: "asssistencia-2023.appspot.com",
    messagingSenderId: "312564370922",
    appId: "1:312564370922:web:fda99435586b629dd7b693",
    measurementId: "G-2HQY8Y1PDD"
});

export const ApiContext = createContext();

export const ApiProvider = ({children}) => {

    const db = getFirestore(firebaseApp);


    const [curVehicle, setCurVehicle] = useState();
    


    return (
    <ApiContext.Provider value={{curVehicle, setCurVehicle, db}}>
        {children}
    </ApiContext.Provider>
    );
}