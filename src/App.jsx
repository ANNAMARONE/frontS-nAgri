/* eslint-disable no-unused-vars */
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Route, Router, Routes} from 'react-router-dom'

import Evenement from './components/pages/event/Evenement'
import Produit from './components/pages/e-commerce/Produit'
import Forum from './components/pages/forum/Forum'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Accueil from './components/pages/Home/Accueil'
import Panier from './components/pages/cart/panier'
import { PanierProvider } from './context/PanierContext'
import ProduitDetails from './components/pages/e-commerce/détaileProduit'


function App() {

  return (
    <div className='App'>
      
     <Navbar/>
     <Routes>
     <Route path='/' element={<Accueil/>}/>
     <Route path='/evenement' element={<Evenement/>}/>
     <Route path='/produit' element={<Produit/>}/>
    
     <Route path='/forum' element={<Forum/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/panier' element={<Panier/>}/>
    
     </Routes>
     
     <Router>
      <Routes>
        <Route path="/produits/id" element={<ProduitDetails />} />
      </Routes>
    </Router>
    </div>
  )

}

export default App
