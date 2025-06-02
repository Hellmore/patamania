import { useState } from 'react';
import ProductTypeSelection from './ProductTypeSelection';
import FoodForm from './FoodForm';
import NonPerishableForm from './NonPerishableForm';
import ConfirmationScreen from './ConfirmationScreen';
import styles from './styles.module.css';

export default function ProductRegistration() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    tamanho: '',
    composicao: '',
    marca: '',
    lote: '',
    fabricante: '',
    origem: '',
    instrucao: '',
    imagem: '',
    codigo_barras: '',
    estoque: '',
    status: '',
    preco: '',
    // dado específico para produto perecível
    validade: '',
    // dado específico para produto não perecível
    garantia: ''
    });
  
    const handleTypeSelect = (type) => {
      setSelectedType(type);
      setStep(2);
    };
  
    const handleSubmitForm = (data) => {
      const completeData = {
        ...formData,
        ...data,
        tipo: selectedType
      };
      
      console.log('Dados completos:', completeData);
      // Aqui você enviaria para a API
      // Após o sucesso, pode avançar para step 3 (confirmação)
      setStep(3);
    };
  
    const renderStep = () => {
      switch (step) {
        case 1:
          return <ProductTypeSelection onSelect={handleTypeSelect} />;
        case 2:
          return selectedType === 'alimento' 
            ? <FoodForm onSubmit={handleSubmitForm} initialData={formData} />
            : <NonPerishableForm onSubmit={handleSubmitForm} initialData={formData} />;
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