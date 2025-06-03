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
import CadastrarProduto from './components/pages/registro_prouduto/index';
import CadastrarServico from './components/pages/registro_servico/index';

import EsqueceuSenha from './components/pages/EsqueceuSenha';
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // const [dados, setDados] = useState([]);

  // useEffect(() => {
  //   axios.get('https://miniature-space-waffle-qrwp9x6qj5gcgjq-3001.app.github.dev/users')
  //     .then(res => setDados(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  return (
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
        </Route>
        {/* Rotas que não usam layout padrão */}
        <Route element={<LayoutEmpty />}>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/cadastrar" element={<Cadastrar />}/>

          <Route exact path="/esqueci_senha" element={<EsqueceuSenha />}/>
        </Route>
        <Route element={<LayoutNavbarOnly />}>
          <Route exact path="/cadastrar_produto" element={<CadastrarProduto />}/>
          <Route exact path="/cadastrar_servico" element={<CadastrarServico />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;