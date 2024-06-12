import './App.css';
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import Pledge from './pages/Pledge';
import UnPledge from './pages/UnPledge';

import Layout from './components/Layout';
import BuyContainer from './pages/BuyContainer';
import Home from './pages/Home';
import { useMetamask } from './hooks/MetamaskContext';
import { useContract } from './hooks/useContract';

function App() {
  const { account } = useMetamask()

  const PrivateRoute = ({ Component }) => {
    return  account ?  <Component /> : <Navigate to="/" />
  }

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='buy' element={<PrivateRoute Component={BuyContainer} />}  />
          <Route path="pledge" element={<PrivateRoute Component={Pledge} />} />
          <Route path="unpledge" element={<PrivateRoute Component={UnPledge} />} /> 
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
