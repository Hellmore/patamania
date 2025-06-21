import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LayoutDefault from './components/layout/LayoutDefault';
import LayoutEmpty from './components/layout/LayoutEmpty';
import LayoutNavbarOnly from './components/layout/LayoutNavbarOnly';
import LayoutAdmin from './components/layout/LayoutAdmin';

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
import PageCarrinho from './components/pages/PageCarrinho';
import PagePagamento from './components/pages/PagePagamento';
import PageAgendamentoBanhoTosa from './components/pages/PageAgendamentoBanhoTosa';
import PageAgendamentoConsultaVeterinaria from './components/pages/PageAgendamentoConsultaVeterinaria';
import PageAgendamentoPasseio from './components/pages/PageAgendamentoPasseio';
import PageAgendamentoHospedagem from "./components/pages/PageAgendamentoHospedagem";

import HomeAdmin from './components/pages/private/HomeAdmin';
import CadastrarProduto from './components/pages/private/registro_prouduto/index';
import CadastrarServico from './components/pages/private/registro_servico/index';
import ListarUsuario from './components/pages/private/listar_usuarios/ListarUsuario';
import ListarProdutos from './components/pages/private/listar_produtos/ListarProdutos';
import ListarServicos from './components/pages/private/listar_servicos/ListarServicos';
import EditUSer from './components/pages/private/listar_usuarios/EditUser';
import EditProduct from './components/pages/private/listar_produtos/EditProduct';
import EditService from './components/pages/private/listar_servicos/EditService';

import Profile from './components/pages/profile/Profile';
import EditProfile from './components/pages/profile/EditProfile';
import EditEndereco from './components/pages/profile/EditEndereco';
import Orders from './components/pages/profile/Orders';
import CadastrarEndereco from './components/pages/profile/CadastrarEndereco';

// Dropdown - Perfil
import Agendamentos from './components/pages/agendamentos/Agendamentos';

import EsqueceuSenha from './components/pages/EsqueceuSenha';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout padrão */}
          <Route element={<LayoutDefault />}>
            <Route path="/" element={<Home />} />
            <Route path="/alimentos" element={<PageAlimentos />} />
            <Route path="/acessorios" element={<PageAcessorios />} />
            <Route path="/higiene" element={<PageHigiene />} />
            <Route path="/farmacia" element={<PageFarmacia />} />
            <Route path="/banho_&_tosa" element={<PageBanhoTosa />} />
            <Route path="/consultas" element={<PageConsultas />} />
            <Route path="/passeios" element={<PagePasseios />} />
            <Route path="/hospedagem" element={<PageHospedagem />} />
            <Route path="/promocoes" element={<PagePromocoes />} />
            <Route path="/servicos" element={<PageServicos />} />
            <Route path="/carrinho" element={<PageCarrinho />} />
            <Route path="/pagamento" element={<PagePagamento />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/agendamentos/banho-e-tosa" element={<PageAgendamentoBanhoTosa />}/>
            <Route path="/agendamentos/consulta-veterinaria" element={<PageAgendamentoConsultaVeterinaria />} />
            <Route path="/agendamentos/passeio" element={<PageAgendamentoPasseio />} />
            <Route path="/agendamentos/hospedagem" element={<PageAgendamentoHospedagem />} />
            <Route path="/profile/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          </Route>

          {/* Layout vazio */}
          <Route element={<LayoutEmpty />}>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/esqueci_senha" element={<EsqueceuSenha />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/profile/:id/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route path="/profile/:id/address" element={<PrivateRoute><EditEndereco /></PrivateRoute>} />
            <Route path="/cadastrar_endereco" element={<PrivateRoute><CadastrarEndereco /></PrivateRoute>} />
          </Route>

          {/* Layout menu profile */}
          <Route element={<LayoutNavbarOnly />}>
            <Route path="/agendamentos" element={<PrivateRoute><Agendamentos /></PrivateRoute>} />
            <Route path="/profile/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          </Route>

          {/* Layout admin - rotas protegidas */}
          <Route element={<LayoutAdmin />}>
            <Route path="/home_admin" element={<PrivateRoute><HomeAdmin /></PrivateRoute>} />
            <Route path="/cadastrar_servico" element={<PrivateRoute><CadastrarServico /></PrivateRoute>} />
            <Route path="/profile_admin" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/profile_admin/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route path="/listar_usuarios" element={<PrivateRoute><ListarUsuario /></PrivateRoute>} />
            <Route path="/edit_user/:usuario_id" element={<PrivateRoute><EditUSer /></PrivateRoute>} />
            <Route path="/cadastrar_produto" element={<PrivateRoute><CadastrarProduto /></PrivateRoute>} />
            <Route path="/listar_produtos" element={<PrivateRoute><ListarProdutos /></PrivateRoute>} />
            <Route path="/edit_product/:produto_id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
            <Route path="/listar_servicos" element={<PrivateRoute><ListarServicos /></PrivateRoute>} />
            <Route path="/edit_service/:servico_id" element={<PrivateRoute><EditService /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
