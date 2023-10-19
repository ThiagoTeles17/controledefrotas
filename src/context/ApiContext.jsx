import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({children}) => {

    const [dados, setDados] = useState([]);
    const [curVehicle, setCurVehicle] = useState ();
    
    const fetchData = () => {
        fetch('http://localhost:5000/assistencia', {
            method : 'GET',
            headers : {
                'Accept': 'application/json', 
                'Content-Type' : 'application/json',
                },
                })
                .then((resp) => resp.json())
                .then((data) => setDados(data))
                .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchData();
    }, [curVehicle]);

    return (
    <ApiContext.Provider value={{curVehicle, setCurVehicle, dados, setDados, fetchData}}>
        {children}
    </ApiContext.Provider>
    );
}