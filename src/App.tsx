import { FC } from 'react';
import './App.css';
import { ContainerLayout } from './components/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import ScramApp from './components/ScramApp/ScramApp';




const App:FC = () => {

  return (
    <div className="App">

      <Navbar />

      <ContainerLayout>
        <ScramApp />
      </ContainerLayout>

    </div>
  );
}

export default App;
