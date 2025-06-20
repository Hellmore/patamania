import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' 
import LayoutDefault from './components/layout/LayoutDefault';
import LayoutEmpty from './components/layout/LayoutEmpty';
import LayoutNavbarOnly from './components/layout/LayoutNavbarOnly';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Cadastrar from './components/pages/Cadastrar';
import PageAlimentos from './components/pages/PageAlimentos';
import PageAcessorios from './components/pages/PageAcessorios';
import PageHigiene from './components/pages/PageHigiene';
import PageFarmacia from './components/pages/PageFarmacia';
import PageBanhoTosa from './components/pages/PageBanhoTosa';
import PageConsultas from './components/pages/PageConsultas';
import PageHospedagem from './components/pages/PageHospedagem';
import PagePasseios from './components/pages/PagePasseios';
import PagePromocoes from './components/pages/PagePromocoes';
import PageNotFound from './components/pages/PageNotFound';
import PageServicos from './components/pages/PageServicos';

// Páginas administrativas
import LayoutAdmin from './components/layout/LayoutAdmin';
import HomeAdmin from './components/pages/private/HomeAdmin';
import CadastrarProduto from './components/pages/private/registro_prouduto/index';
import CadastrarServico from './components/pages/private/registro_servico/index';
import ListarUsuario from './components/pages/private/listar_usuarios/ListarUsuario';
import ListarProdutos from './components/pages/private/listar_produtos/ListarProdutos';
import ListarServicos from './components/pages/private/listar_servicos/ListarServicos';

// Perfil do usuário
import Profile from './components/pages/profile/Profile';
import EditProfile from './components/pages/profile/EditProfile';
import EditEndereco from './components/pages/profile/EditEndereco'; 
import Orders from './components/pages/profile/Orders';

// Edição do usuário
import EditUSer from './components/pages/private/listar_usuarios/EditUser';

// Edição do produto
import EditProduct from './components/pages/private/listar_produtos/EditProduct';

// Edição do servilo
import EditService from './components/pages/private/listar_servicos/EditService';

import EsqueceuSenha from './components/pages/EsqueceuSenha';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Ou um spinner
  }

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas que usam layout padrão */}
          <Route element={<LayoutDefault />}>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/alimentos" element={<PageAlimentos />}/>
            <Route exact path="/acessorios" element={<PageAcessorios />}/>
            <Route exact path="/higiene" element={<PageHigiene />}/>
            <Route exact path="/farmacia" element={<PageFarmacia />}/>
            <Route exact path="/banho_&_tosa" element={<PageBanhoTosa />}/>
            <Route exact path="/consultas" element={<PageConsultas />}/>
            <Route exact path="/passeios" element={<PagePasseios />}/>
            <Route exact path="/hospedagem" element={<PageHospedagem />}/>
            <Route exact path="/promocoes" element={<PagePromocoes />}/>
            <Route exact path="/page_not_found" element={<PageNotFound />}/>
            <Route exact path="/servicos" element={<PageServicos />} />
          </Route>
          {/* Rotas que não usam layout padrão */}
          <Route element={<LayoutEmpty />}>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/cadastrar" element={<Cadastrar />}/>
            <Route exact path="/esqueci_senha" element={<EsqueceuSenha />}/>
          </Route>

          {/* Rotas protegidas */}
          {/* Rota para o admin */}
          <Route element={<LayoutAdmin/>}>
              <Route exact path="/home_admin" element={<PrivateRoute><HomeAdmin/></PrivateRoute>}></Route>
              {/* Rota da ação da listagem de usuários */}
              <Route exact path="/listar_usuarios" element={<PrivateRoute><ListarUsuario/></PrivateRoute>}/>
              <Route path="/edit_user/:usuario_id" element={<PrivateRoute><EditUSer/></PrivateRoute>}/>
              {/* Rota para gerenciar produtos */}
              <Route exact path="/cadastrar_produto" element={<PrivateRoute><CadastrarProduto /></PrivateRoute>}/>
              <Route exact path="/listar_produtos" element={<PrivateRoute><ListarProdutos /></PrivateRoute>}/>
              <Route path="/edit_product/:produto_id" element={<PrivateRoute><EditProduct/></PrivateRoute>}/>
              {/* Rota de gerenciar serviços */}
              <Route exact path="/cadastrar_servico" element={<PrivateRoute><CadastrarServico /></PrivateRoute>}/>
              <Route exact path="listar_servicos" element={<PrivateRoute><ListarServicos /></PrivateRoute>}/>
              <Route path="edit_service/:servico_id" element={<PrivateRoute><EditService /></PrivateRoute>}/>
          </Route>

          {/* Rota para o edição de perfil em ambos usuários */}
          <Route element={<LayoutEmpty />}>
              <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
            <Route exact path="/profile/:id/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>}/>
            <Route exact path="/profile/:id/address" element={<PrivateRoute><EditEndereco /></PrivateRoute>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}



export default App;