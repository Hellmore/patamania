import { useState } from 'react';
import ServiceTypeSelection from './ServiceTypeSelection';
import PasseioForm from './PasseioForm';
import ConsultaForm from './ConsultaForm';
import HospedagemForm from './HospedagemForm';
import BanhoTosaForm from './BanhoTosaFrom';
import ConfirmationScreen from './ConfirmationScreen';
import styles from './styles.module.css';

export default function ServiceRegistration() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    disponivel: '',
    localizacao: '',
    responsavel: '',
    duracao: '',
    imagem: '',
    taxa: '',
    // dado específico de passeio, o tipo também é de hospedagem
    tipo: '',
    nivelamento: '',
    // dado específico de hospedagem
    necessidades_esp: '',
    // dado específico de Consulta
    especialidade: '',
    tipo: '',
    vacinas_aplicadas: '',
    exames_realizados: '',
    // dado específico de Banho e Tosa
    tipo_tosa: '',
    produtos_utilizados: ''
    });
  
    const handleTypeSelect = (categoria) => {
      setSelectedType(categoria);
      setStep(2);
    };
  
    const handleSubmitForm = (data) => {
      const completeData = {
        ...formData,
        ...data,
        categoria: selectedType
      };
      
      console.log('Dados completos:', completeData);
      // Aqui você enviaria para a API
      // Após o sucesso, pode avançar para step 3 (confirmação)
      setStep(3);
    };
    
    const handleBack = () => {
      setStep(1);
    };

    const renderStep = () => {
      switch (step) {
        case 1:
          return <ServiceTypeSelection  onSelect={(type) => {setSelectedType(type); setStep(2);}}/>;
        case 2:
          if (selectedType === 'consulta') {
            return <ConsultaForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack}/>;
          } else if (selectedType === 'hospedagem') {
            return <HospedagemForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack}/>;
          } else if (selectedType === 'passeio') {
            return <PasseioForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack}/>;
          } else {
            return <BanhoTosaForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack}/>;
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