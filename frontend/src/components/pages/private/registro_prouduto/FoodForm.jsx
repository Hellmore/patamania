import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import styles from './styles.module.css';
import arrow_back from '../../../img/arrow_back.svg';

export default function FoodForm ({ onSubmit, initialData, onBack }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });
  
  return (
    <Container fluid className="p-0"> {/* fluid container for full width */}

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
          {...register('produto_nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Produto'
        />
        {errors.produto_nome && <span className={styles.error}>{errors.produto_nome.message}</span>}
      </Form.Group>

      {/* Outros campos comuns */}
      <Form.Group className={styles.formGroup} controlId='formFoodTamanho'>
        <Form.Label>
          Tamanho do Produto<span style={{ color: 'red' }}>*</span>
        </Form.Label>
        <Form.Select 
          aria-label="tamanho" 
          {...register('produto_tamanho', { required: 'Campo obrigatório' })} 
          defaultValue="" // Define a opção padrão como vazia
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="P">Pequeno</option>
          <option value="M">Médio</option>
          <option value="G">Grande</option>
        </Form.Select>
        {errors.produto_tamanho && <span className={styles.error}>{errors.produto_tamanho.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodComposicao'>
        <Form.Label>Composição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={3} 
          placeholder='Exemplo de composição: farinha de vísceras de aves, gordura suína...'
          {...register('produto_composicao', { required: 'Campo obrigatório' })}        
        />
        {errors.produto_composicao && <span className={styles.error}>{errors.produto_composicao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodMarca'>
        <Form.Label>Marca<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de marca: Royal Canin'
          {...register('produto_marca', { required: 'Campo obrigatório' })}
        />
        {errors.produto_marca && <span className={styles.error}>{errors.produto_marca.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodLote'>
        <Form.Label>Lote<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          type='number'
          min={0}
          placeholder='Exemplo de lote: 250522'
          {...register('produto_lote', { required: 'Campo obrigatório' })}
        />
        {errors.produto_lote && <span className={styles.error}>{errors.produto_lote.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodFabricante'>
        <Form.Label>Fabricante<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de fabricante: Mars Incorporated'
          {...register('produto_fabricante', { required: 'Campo obrigatório' })}
        />
        {errors.produto_fabricante && <span className={styles.error}>{errors.produto_fabricante.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodOrigem'>
        <Form.Label>Origem<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de origem: Fabricado no Brasil'
          {...register('produto_origem', { required: 'Campo obrigatório' })}
        />
        {errors.produto_origem && <span className={styles.error}>{errors.produto_origem.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodInstrucoes'>
        <Form.Label>Instruções<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de composição: Abra o produto, pegue apenas a quantidade necessária para seu pet...'
          {...register('produto_instrucoes', { required: 'Campo obrigatório' })}        
        />
        {errors.produto_instrucoes && <span className={styles.error}>{errors.produto_instrucoes.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodValidade'>
        <Form.Label>Validade<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          type='date' style={{width: '10em'}}
          {...register('produto_validade', { required: 'Campo obrigatório' })}
        />
        {errors.produto_validade && <span className={styles.error}>{errors.produto_validade.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodImagem'>
        <Form.Label>Imagem</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register('produto_imagem', {
            validate: {
              isImage: FileList => {
                if (!FileList?.[0]) return true;
                return FileList[0].type.startsWith('image/') || 'Apenas arquivos de imagem são permitidos';
              }
            }
          })}
        />
        {errors.produto_imagem && <span className={styles.error}>{errors.produto_imagem.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodCodBarras'>
        <Form.Label>Código de barras<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de código de barras: 7891234567897'
          {...register('produto_codigobarras', { required: 'Campo obrigatório' })}
        />
        {errors.produto_codigobarras && <span className={styles.error}>{errors.produto_codigobarras.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formFoodEstoque'>
        <Form.Label>Quantidade em estoque<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de estoque: 15'
          type='number' 
          min="0"
          {...register('produto_estoque', { 
            required: 'Campo obrigatório',
            min: {
              value: 0,
              message: 'A quantidade dever ser um número positivo!'
            },
            valueAsNumber: true // converte o valor para número
          })}
        />
        {errors.produto_estoque && <span className={styles.error}>{errors.produto_estoque.message}</span>}
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
              {...register('produto_preco', { required: 'Campo obrigatório' })}
            />
          </div>
          {errors.produto_preco && (<span className={styles.error}>{errors.produto_preco.message}</span>)}
        </div>
      </Form.Group>

      
      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </Form>
    </Container>

  );
};