import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet, Route, Routes } from 'react-router-dom';

// Importation des composants
import Evenement from './components/pages/event/Evenement';
import Produit from './components/pages/e-commerce/Produit';
import Forum from './components/pages/forum/Forum';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Accueil from './components/pages/Home/Accueil';
import Panier from './components/pages/cart/panier';
import ProduitDetails from './components/pages/e-commerce/détaileProduit';
import Article from './components/pages/article/article';
import DétaileArticle from './components/pages/article/détaileArticle';
import CreateForum from './components/pages/forum/AjouteForum';
import ForumDetails from './components/pages/forum/ForumDetails';
import ArticleDetails from './components/pages/article/détaileArticle';
import RessourcesList from './components/pages/ressource/ressource';
import RessourceDetails from './components/pages/ressource/DétailRessource';
import Profile from './components/profile/profile';
import AjouterProduit from './components/ProducteurPage/ajoutProduit';
import ProduitsUtilisateurs from './components/ProducteurPage/afficherProduit';
import ModifierProduit from './components/ProducteurPage/modificationProduit';
import ListeUtilisateurs from './components/ProducteurPage/listeProducteur';
import ProducteurDetail from './components/ProducteurPage/détailProducteur';

import Dashboard from './components/adminPage/dasboard/dashboard';
import Users from './components/adminPage/getion utilisateur/ListeUtilisateur';
import UserDetail from './components/adminPage/getion utilisateur/détailUtilisateur';
import EventList from './components/adminPage/gestion événenement/listeEvenement';
import AjouterEvenement from './components/adminPage/gestion événenement/ajouterEvenement';
import ModifierEvenement from './components/adminPage/gestion événenement/modifierEvenement';
import ListeArticle from './components/adminPage/gestion article/listeArticle';
import ModifierArticle from './components/adminPage/gestion article/modifierarticle';
import AjouterArticle from './components/adminPage/gestion article/ajouteArticle';
import ListeRessources from './components/adminPage/gestion ressource/AfficherRessource';
import AjouterRessource from './components/adminPage/gestion ressource/ajouterRessource';
import ModifierRessource from './components/adminPage/gestion ressource/modifierResource';
import AjouterForum from './components/adminPage/gestion forums/ajouterForume';
import Forumdetails from './components/adminPage/gestion forums/détailfoum';
import ListeCategories from './components/adminPage/gestion catégorie/catégorie produit/afficherCatPr';
import AjouterCategorie from './components/adminPage/gestion catégorie/catégorie produit/ajouterCatPr';
import ModifierCategorie from './components/adminPage/gestion catégorie/catégorie produit/modifierCatPr';
import Commandes from './components/pages/cart/commande';
import { AuthProvider } from './components/pages/Auth/AuthContext';
import Footer from './components/Footer/footer';
import ModifierProfile from './components/profile/modifier';
import DashboardProducteur from './components/ProducteurPage/dasboadProducteur';
import ListeForums from './components/adminPage/gestion forums/listeforume';
import VerificationOpt from './components/pages/Auth/verificationOpt';
import NewDashboard from './new/newDashboard';
import Statistics from './components/ProducteurPage/Statistics';
import MesCommandes from './components/ProducteurPage/CommandeProducteur';
import HistoriqueCommande from './components/ProducteurPage/HistoriqueCommande';
import Index from './components/pages/Home';
import NewdashboardAdmin from './new/newdashboardAdmin';
import MontantCommandesChart from './components/adminPage/StatistiqueAdmin';
import ProtectedRoute from './components/Route Proteger/ProtectedRoute';
import AccessDenied from './components/Route Proteger/AccessDenied';
import GestionStock from './components/ProducteurPage/GestionStock';



// Composant WithSidebar
const WithSidebar = () => (
    <NewDashboard/>
);
// Composant WithSidebar
const WithSidebarAdmin = () => (
   <NewdashboardAdmin/>
      
);
// Composant WithNavbar
const WithNavbar = () => (
  <>
  
    <Navbar />
    
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
    <div className="App">
      
      <Routes>
        {/* Routes avec Navbar */}
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route element={<WithNavbar />}>
        
          <Route path="/page" element={<Accueil />} />
          <Route path="/evenement" element={<Evenement />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/article" element={<Article />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/ajouterForum" element={<CreateForum />} />
          <Route path="/produits/:id" element={<ProduitDetails />} />
          <Route path="/article/:id" element={<DétaileArticle />} />
          <Route path="/forums/:id" element={<ForumDetails />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/ressources" element={<RessourcesList />} />
          <Route path="/ressources/:id" element={<RessourceDetails />} />
          <Route path="/commande" element={<Commandes/>} />
          <Route path="/profileUse" element={<Profile />} />
          <Route path="/modifier-profile" element={<ModifierProfile/>} />
          <Route path='/verificationOpt' element={<VerificationOpt/>}/>
          <Route path='/' element={<Index/>}/>
        </Route>

        {/* Routes avec Sidebar pour le producteur */}
        <Route element={<WithSidebar />}>
       
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/ajoutProduit" element={<AjouterProduit />} />
          <Route path="/afficherProduit" element={<ProduitsUtilisateurs />} />
           <Route path="/modifierProduit/:id" element={<ModifierProduit/>}/>
           <Route path="/producteurs" element={<ListeUtilisateurs />} />
           <Route path="/producteur/:id" element={<ProducteurDetail />} />
           <Route path="/dashboardProducteur" element={<DashboardProducteur/>} />
           <Route path="/forump" element={<Forum />} />
           <Route path="/commandeProducteur" element={< MesCommandes />} />
           <Route path="/historique" element={<HistoriqueCommande />} />
           <Route path="/categoriesProduitcteur" element={<ListeCategories />} />
           <Route path="/gestionStock" element={<GestionStock/>} />
           
        </Route>
         {/* Routes avec Sidebar pour l'adminitrateur */}
      
      <Route element={<WithSidebarAdmin />}>
        {/* Groupez les routes protégées ici */}
      
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profileAdmin" element={<Profile />} />
          <Route path="/ListeUtilisateur" element={<Users />} />
          <Route path="/Utilisateur/:id" element={<UserDetail />} />
          <Route path="/evenements" element={<EventList />} />
          <Route path="/ajouteEvent" element={<AjouterEvenement />} />
          <Route path="/modifierEvent/:id" element={<ModifierEvenement />} />
          <Route path="/articles" element={<ListeArticle />} />
          <Route path="/AjouteArticle" element={<AjouterArticle />} />
          <Route path="/modifierArticle/:id" element={<ModifierArticle />} />
          <Route path="/listeressources" element={<ListeRessources />} />
          <Route path="/ajouterRessource" element={<AjouterRessource />} />
          <Route path="/ressources/modifier/:id" element={<ModifierRessource />} />
          <Route path="/listeforums" element={<ListeForums />} />
          <Route path="/forums/ajouter" element={<AjouterForum />} />
          <Route path="/forumsdetail/:id" element={<Forumdetails />} />
          <Route path="/categories" element={<ListeCategories />} />
          <Route path="/categories/ajouter" element={<AjouterCategorie />} />
          <Route path="/categories/modifier/:id" element={<ModifierCategorie />} />
          <Route path="/forumAdmin" element={<Forum />} />
          <Route path="/evolutionCommande" element={<MontantCommandesChart />} />
       
      </Route>
  
      </Routes>
      <Routes>
      <Route path="/dasbordtest" element={<NewDashboard/>} />
      </Routes>
    </div>
    </AuthProvider>

    
  );
}

export default App;
