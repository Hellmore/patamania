import { useState } from 'react';
import ProductTypeSelection from './ProductTypeSelection';
import FoodForm from './FoodForm';
import NonPerishableForm from './NonPerishableForm';
import ConfirmationScreen from './ConfirmationScreen';
import styles from './styles.module.css';
import axios, { HttpStatusCode } from 'axios'; 
import { useAuth } from '../../../../context/AuthContext';
import { useForm } from 'react-hook-form';

export default function ProductRegistration() {
  const { user } = useAuth();
  const { setValue } = useForm();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    produto_name: '',
    produto_tamanho: '',
    produto_composicao: '',
    produto_marca: '',
    produto_lote: '',
    produto_fabricante: '',
    produto_origem: '',
    produto_instrucao: '',
    produto_imagem: '',
    produto_codigobarras: '',
    produto_estoque: '',
    produto_preco: '',
    // dado específico para produto perecível
    produto_validade: '',
    // dado específico para produto não perecível
    produto_garantia: ''
    });

    const handleBack = () => {
      setStep(1);
    };
  
    const handleTypeSelect = (type) => {
      setSelectedType(type);
      setStep(2);
    };
  
    const handleSubmitForm = async (data) => {
      let tipo;
      if (selectedType === 'PERECIVEL') {
        tipo = 'PERECIVEL';
        data.produto_garantia = null; //Como produto perecível não possui garantia, aplica como null para armazenar no bd
      } else {
        tipo = 'NAO PERECIVEL';
        // Verifica se o campo de validade está vazio e define como null
        if (!data.produto_validade) {
            data.produto_validade = null; // ou undefined
        }
      }
      //Envio para a api
      try {
        const dadosCompletos = {
          ...data,
          usuarioId: user.id, // Associa ao usuário logado
          ...formData,
          ...data,
          produto_tipo: tipo
        };
        console.log('Dados completos:', dadosCompletos);

        const response = await axios.post('http://localhost:3001/produtos/cadastro', 
          dadosCompletos,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === HttpStatusCode.Created) {
          // Após o sucesso, pode avançar para step 3 (confirmação)
          setStep(3);
        }
        // Redirecionar ou limpar formulário
      } catch (error) {
        console.error('Erro no cadastro:', error.response?.data || error.message);
        alert('Erro ao cadastrar produto');
      }
    };
  
    const renderStep = () => {
      switch (step) {
        case 1:
          return <ProductTypeSelection onSelect={(type) => {setSelectedType(type); setStep(2);}}/>;
        case 2:

          return selectedType === 'PERECIVEL' 
            ? <FoodForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack}/>
            : <NonPerishableForm onSubmit={handleSubmitForm} initialData={formData} onBack={handleBack}/>;
        case 3:
          return <ConfirmationScreen />;
        default:
          return <ProductTypeSelection onSelect={handleTypeSelect} />;
      }
    };
  
  return (
    <div className={styles.container}>
      {renderStep()}
    </div>
  );
};