import Header from "./components/Header/Header.jsx";
import Dashboard from './screens/Dashboard/Dashboard.jsx'
import './App.css';

import { ApiProvider } from "./context/ApiContext.jsx";
import { ScreenProvider, ScreenContext } from "./context/ScreenContext.jsx";

import { useContext, useEffect, useState } from "react";
import ManangeVehicles from "./screens/ManangeVehicles/ManangeVehicles.jsx";

function App() {
  
  const {curScreen} = useContext(ScreenContext);

  const [selectedScreen, setSelectedScreen] = useState(curScreen);

  const handleOnClick = (screen) => {
    setSelectedScreen(screen);
  }

  const screens = ['Visão Geral', 'Gerenciar Veículos', 'Condutores']

  return (

    <div className="App">
      <ScreenProvider>
        <ApiProvider>
          <Header handleOnClick={(screen) => handleOnClick(screen)} screens={screens}/>
          {selectedScreen == 'Visão Geral' && <Dashboard/>}
          {selectedScreen == 'Gerenciar Veículos' && <ManangeVehicles/>}
        </ApiProvider>
      </ScreenProvider>
    </div>

  );
}

export default App;
