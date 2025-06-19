import { useState } from 'react';
import ServiceTypeSelection from './ServiceTypeSelection';
import PasseioForm from './PasseioForm';
import ConsultaForm from './ConsultaForm';
import HospedagemForm from './HospedagemForm';
import BanhoTosaForm from './BanhoTosaFrom';
import ConfirmationScreen from './ConfirmationScreen';
import styles from './styles.module.css';
import { useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';

export default function ServiceRegistration() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [profissionais, setProfissionais] = useState([]);
  const [formData, setFormData] = useState({
    servico_nome: '',
    servico_descricao: '',
    servico_preco: '',
    servico_localizacao: '',
    servico_profissionalresponsavel: '', // Será o id do responsável pelo serviço
    servico_duracao: '',
    servico_taxa: '',
  });
  
  //Buscando profissionais administradores
useEffect(() => {
  const fetchProfissionais = async () => {
    try {
      // console.log("Iniciando busca por profissionais..."); // Código para teste
      const response = await axios.get('http://localhost:3001/usuarios/admin', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Código para teste
      // console.log("Resposta da API:", response.data);
      setProfissionais(response.data);
    } catch (error) {
      console.error("Erro detalhado:", {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
    }
  };
  
  if (step === 2) {
    fetchProfissionais();
  }
}, [step]);

  const handleSubmitForm = async (data) => {
    try {
      // Converter tempo para minutos (ex: "01:30" → 90)
      const [hours, minutes] = data.servico_duracao.split(':').map(Number);
      const duracaoEmMinutos = hours * 60 + minutes;

    const payload = {
      servico: {
        nome: data.servico_nome,
        descricao: data.servico_descricao,
        categoria: selectedType.toUpperCase(),
        preco: parseFloat(data.servico_preco),
        disponibilidade: 'DISPONIVEL',
        localizacao: data.servico_localizacao,
        profissionalResponsavel: parseInt(data.servico_profissionalresponsavel),
        responsavelAgendamento: user.id,
        duracao: duracaoEmMinutos,
        taxa: parseFloat(data.servico_taxa)
      },
    };
    
    const response = await axios.post(
      'http://localhost:3001/servicos/cadastro',
       payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        transformRequest: [(data) => JSON.stringify(data)], // Garante a serialização
      }
    );

    setStep(3);
    } catch (error) {
      console.error('Erro detalhado:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      alert(`Erro ao cadastrar: ${error.response?.data?.message || error.message}`);
    }
};

  const handleBack = () => {
    setStep(1);
  };

  const handleTypeSelect = (categoria) => {
    setSelectedType(categoria);
    setStep(2);
  };    

    const renderStep = () => {
      switch (step) {
        case 1:
          return <ServiceTypeSelection  onSelect={(type) => {setSelectedType(type); setStep(2);}}/>;
        case 2:
          if (selectedType === 'consulta') {
            return <ConsultaForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack} profissionais={profissionais}/>;
          } else if (selectedType === 'hospedagem') {
            return <HospedagemForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack} profissionais={profissionais}/>;
          } else if (selectedType === 'passeio') {
            return <PasseioForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack} profissionais={profissionais}/>;
          } else {
            return <BanhoTosaForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack} profissionais={profissionais}/>;
          }
        case 3:
          return <ConfirmationScreen />;
        default:
          return <ServiceTypeSelection onSelect={handleTypeSelect} />;
      }
    };
  
  return (
    <div className={styles.container}>
      {renderStep()}
    </div>
  );
};