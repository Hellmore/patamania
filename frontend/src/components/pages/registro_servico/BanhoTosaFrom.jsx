import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import styles from './styles.module.css';
import arrow_back from '../../img/arrow_back.svg';

export default function BanhoTosaForm  ({ onSubmit, initialData, onBack }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.servicoForm}>
      <div
        className={styles.arrow_back}
        onClick={() => onBack()}  
      >
        <img src={arrow_back} alt="Voltar" />
      </div>
      <h2>Cadastro de Serviço - Banho & Tosa</h2>
      
      {/* Outros campos comuns */}

      <Form.Group className={styles.formGroup} controlId='formBanhoTosaNome'>
        <Form.Label>Nome do Serviço<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Serviço'
        />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formBanhoTosaDescricao'>
        <Form.Label>Descrição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          as="textarea" 
          rows={4} 
          placeholder='Exemplo de descrição: Oferecemos higienização completa para seu animal de estimação...'
          {...register('descricao', { required: 'Campo obrigatório' })}        
        />
        {errors.descricao && <span className={styles.error}>{errors.descricao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formBanhoTosaPreco'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Preço<span style={{ color: 'red' }}>*</span></Form.Label>
          <div className={styles.div_preco}>
            <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
            <Form.Control
              type="number"
              step="0.01"
              min={0}
              placeholder="59,00"
              className={styles.input_preco}
              {...register('preco', { 
                required: 'Campo obrigatório',
                min: {
                  value: 0,
                  message: 'A quantidade dever ser um número positivo!'
                },
                valueAsNumber: true // converte o valor para número
              })}             />
          </div>
          {errors.preco && (<span className={styles.error}>{errors.preco.message}</span>)}
        </div>
      </Form.Group>

            <Form.Group className={styles.formGroup} controlId='formBanhoTosaTaxa'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Taxa</Form.Label>
          <div className={styles.div_preco}>
            <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
            <Form.Control
              type="number"
              step="0.01"
              min={0}
              placeholder="59,00"
              className={styles.input_preco}
              {...register('taxa', {
                min: {
                  value: 0,
                  message: 'A quantidade dever ser um número positivo!'
                },
                valueAsNumber: true // converte o valor para número
              })} 
            />
          </div>
          {errors.taxa && (<span className={styles.error}>{errors.taxa.message}</span>)}
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formBanhoTosaLocalizacao'>
        <Form.Label>Localização<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de localização: Em toda região de Campinas - SP.'
          {...register('localizacao', { required: 'Campo obrigatório' })}
        />
        {errors.localizacao && <span className={styles.error}>{errors.localizacao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formBanhoTosaResponsavel'>
        <Form.Label>Profissional Responsável<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de Profissional Responsável: lolla'
          {...register('responsavel', { required: 'Campo obrigatório' })}
        />
        {errors.responsavel && <span className={styles.error}>{errors.responsavel.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioDuracao'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Duração<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="time"
              min="0"
              step={60} // permite apenas minutos inteiros
              defaultValue="00:00"
              className={styles.input_duracao}
              {...register('duracao', { 
                required: 'Campo obrigatório',
                min: {
                  value: 0,
                  message: 'A quantidade dever ser um número positivo!'
                },
                valueAsNumber: true // converte o valor para número
              })} 
            />
          {errors.duracao && (<span className={styles.error}>{errors.duracao.message}</span>)}
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formBanhoTosaImagem'>
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

      {/* Campo específico para serviços de consulta */}
      <Form.Group className={styles.formGroup} controlId='formBanhoTosaTipoTosa'>
        <Form.Label>Tipo de tosa</Form.Label>
        <Form.Control 
          {...register('tipo_tosa')}
          placeholder='Exemplo de tosa: Tosa higiênica'
        />
        {errors.tipo_tosa && <span className={styles.error}>{errors.tipo_tosa.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formBanhoTosaProdutosUtilizados'>
        <Form.Label>Produtos utilizados<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={3} 
          placeholder='Exemplo de produtos utilizados: máquina de tosa com lâminas de diferentes tamanhos, xampu, condicionador, etc...'
          {...register('produtos_utilizados')}        
        />
        {errors.produtos_utilizados && <span className={styles.error}>{errors.produtos_utilizados.message}</span>}
      </Form.Group>

      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </Form>
  );
};