import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import arrow_back from '../../img/arrow_back.svg';

export default function FoodForm ({ onSubmit, initialData, onBack }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.productForm}>
      <div
        className={styles.arrow_back}
        onClick={() => onBack()}  
      >
        <img src={arrow_back} alt="Voltar" />
      </div>
      <h2>Cadastro de Alimento</h2>
      
      <Form.Group className={styles.formGroup} controlId='formFoodNome'>
        <Form.Label>Nome do Produto<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Produto'
        />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </Form.Group>

      {/* Outros campos comuns */}
      <Form.Group className={styles.formGroup} controlId='formFoodTamanho'>
        <Form.Label>
          Tamanho do Produto<span style={{ color: 'red' }}>*</span>
        </Form.Label>
        <Form.Select 
          aria-label="tamanho" 
          {...register('tamanho', { required: 'Campo obrigatório' })} 
          defaultValue="" // Define a opção padrão como vazia
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="1">Pequeno</option>
          <option value="2">Médio</option>
          <option value="3">Grande</option>
        </Form.Select>
        {errors.tamanho && <span className={styles.error}>{errors.tamanho.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodComposicao'>
        <Form.Label>Composição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={3} 
          placeholder='Exemplo de composição: farinha de vísceras de aves, gordura suína...'
          {...register('composicao', { required: 'Campo obrigatório' })}        
        />
        {errors.composicao && <span className={styles.error}>{errors.composicao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodMarca'>
        <Form.Label>Marca</Form.Label>
        <Form.Control 
          placeholder='Exemplo de marca: Royal Canin'
          {...register('marca')}
        />
        {errors.marca && <span className={styles.error}>{errors.marca.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodLote'>
        <Form.Label>Lote<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de lote: 250522'
          {...register('lote', { required: 'Campo obrigatório' })}
        />
        {errors.lote && <span className={styles.error}>{errors.lote.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodFabricante'>
        <Form.Label>Fabricante<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de fabricante: Mars Incorporated'
          {...register('fabricante', { required: 'Campo obrigatório' })}
        />
        {errors.fabricante && <span className={styles.error}>{errors.fabricante.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodOrigem'>
        <Form.Label>Origem<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de origem: Fabricado no Brasil'
          {...register('origem', { required: 'Campo obrigatório' })}
        />
        {errors.origem && <span className={styles.error}>{errors.origem.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodInstrucoes'>
        <Form.Label>Instruções</Form.Label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de composição: Abra o produto, pegue apenas a quantidade necessária para seu pet...'
          {...register('instrucoes')}        
        />
        {errors.instrucoes && <span className={styles.error}>{errors.instrucoes.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodValidade'>
        <Form.Label>Validade<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          type='date' style={{width: '10em'}}
          {...register('validade', { required: 'Campo obrigatório' })}
        />
        {errors.validade && <span className={styles.error}>{errors.validade.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodImagem'>
        <Form.Label>Imagem</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register('imagem', {
            validate: {
              isImage: FileList => {
                if (!FileList?.[0]) return true;
                return FileList[0].type.startsWith('image/') || 'Apenas arquivos de imagem são permitidos';
              }
            }
          })}
        />
        {errors.imagem && <span className={styles.error}>{errors.imagem.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodCodBarras'>
        <Form.Label>Código de barras<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de código de barras: 7891234567897'
          {...register('codigo_barras', { required: 'Campo obrigatório' })}
        />
        {errors.codigo_barras && <span className={styles.error}>{errors.codigo_barras.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodEstoque'>
        <Form.Label>Quantidade em estoque<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de estoque: 15'
          type='number' 
          min="0"
          {...register('estoque', { 
            required: 'Campo obrigatório',
            min: {
              value: 0,
              message: 'A quantidade dever ser um número positivo!'
            },
            valueAsNumber: true // converte o valor para número
          })}
        />
        {errors.estoque && <span className={styles.error}>{errors.estoque.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishablePreco'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Preço<span style={{ color: 'red' }}>*</span></Form.Label>
          <div className={styles.div_preco}>
            <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
            <Form.Control
              type="number"
              min="0.00"
              step="0.01"
              placeholder="59,00"
              className={styles.input_preco}
              {...register('preco', { required: 'Campo obrigatório' })}
            />
          </div>
          {errors.preco && (<span className={styles.error}>{errors.preco.message}</span>)}
        </div>
      </Form.Group>

      
      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </Form>
  );
};