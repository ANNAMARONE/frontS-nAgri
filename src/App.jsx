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
import Article from './components/pages/article/article'
import DétaileArticle from './components/pages/article/détaileArticle'
import CreateForum from './components/pages/forum/AjouteForum'
import ForumDetails from './components/pages/forum/ForumDetails'
import ArticleDetails from './components/pages/article/détaileArticle'
import RessourcesList from './components/pages/ressource/ressource'
import RessourceDetails from './components/pages/ressource/DétailRessource'
import Profile from './components/profile/profile'




function App() {

  return (
    <div className='App'>
      
     <Navbar/>
     <Routes>
     <Route path='/' element={<Accueil/>}/>
     <Route path='/evenement' element={<Evenement/>}/>
     <Route path='/produit' element={<Produit/>}/>
     <Route path='/article' element={<Article/>}/>
     <Route path='/forum' element={<Forum/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/panier' element={<Panier/>}/>
     <Route path='/ajouterForum' element={<CreateForum/>}/>
     <Route path="/produits/:id" element={<ProduitDetails />} />
     <Route path="/article/:id" element={<DétaileArticle />} />
     <Route path="/forums/:id" element={<ForumDetails />} />
     <Route path="/articles/:id"  element={<ArticleDetails/>} />
     <Route path="/ressources"  element={<RessourcesList/>}/>
     <Route path="/ressources/:id" element={<RessourceDetails />} />
     <Route path="/profile" element={<Profile/>}  />
     </Routes>
    
   

   
    </div>
  )

}

export default App
