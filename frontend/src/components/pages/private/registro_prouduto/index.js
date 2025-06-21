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
    produto_nome: '',
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
      console.log(data);
      try {
        // Preparando os dados básicos
        if (!data.produto_validade && selectedType === 'NAO PERECIVEL') {
          data.produto_validade = null;
        } else if (data.produto_garantia == '' && selectedType === 'PERECIVEL') {
          data.produto_garantia = null;
        }
        const dadosCompletos = {
          ...data,
          usuario_id: user.id,
          produto_tipo: selectedType
        };
        // Se tiver imagem converter para base64
        if (data.produto_imagem && data.produto_imagem.length > 0) {
          const file = data.produto_imagem[0];
          const base64data = await convertToBase64(file);
          dadosCompletos.produto_imagem = base64data;  
        } else {
          dadosCompletos.produto_imagem = null;
        }

        // Envia para o backend
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
          setStep(3);
        }
      } catch (error) {
        console.error('Erro no cadastro:', error.response?.data || error.message);
        alert('Erro ao cadastrar produto');
      }
    };
      
    // Função para auxiliar na conversão para base64
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
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