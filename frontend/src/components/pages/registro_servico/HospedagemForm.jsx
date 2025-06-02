import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import styles from './styles.module.css';

export default function HospedagemSForm ({ onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.servicoForm}>
      <h2>Cadastro de Serviço - Hospedagem</h2>
      
      <div className={styles.formGroup}>
        <label>Nome do Serviço<span style={{ color: 'red' }}>*</span></label>
        <input 
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Serviço'
        />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </div>

      {/* Outros campos comuns */}
      <div className={styles.formGroup}>
        <label>Descrição<span style={{ color: 'red' }}>*</span></label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de descrição: Oferecemos conforto e alimentação a disposição para seu pet.'
          {...register('descricao', { required: 'Campo obrigatório' })}        
        />
        {errors.descricao && <span className={styles.error}>{errors.descricao.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Preço<span style={{ color: 'red' }}>*</span></label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '0 0.5rem',
            maxWidth: '200px'
          }}>
            <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
            <input
              type="number"
              step="0.01"
              placeholder="59,00"
              style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              padding: '0.5rem',
              fontSize: '1rem',
              marginLeft: '0.3rem'
              }}
              {...register('preco', { required: 'Campo obrigatório' })}
            />
          </div>
          {errors.preco && (<span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.preco.message}</span>)}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Localização<span style={{ color: 'red' }}>*</span></label>
        <input 
          placeholder='Exemplo de localização: Em toda região de Campinas - SP.'
          {...register('localizacao', { required: 'Campo obrigatório' })}
        />
        {errors.localizacao && <span className={styles.error}>{errors.localizacao.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Profissional Responsável<span style={{ color: 'red' }}>*</span></label>
        <input 
          placeholder='Exemplo de Profissional Responsável: Mark'
          {...register('responsavel', { required: 'Campo obrigatório' })}
        />
        {errors.responsavel && <span className={styles.error}>{errors.responsavel.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Duração<span style={{ color: 'red' }}>*</span></label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '0 0.5rem',
            maxWidth: '130px'
          }}>
            <input
              type="number"
              placeholder="30"
              style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              padding: '0.5rem',
              fontSize: '1rem',
              marginLeft: '0.3rem'
              }}
              {...register('duracao', { required: 'Campo obrigatório' })}
            />
            <span style={{ userSelect: 'none', color: '#555' }}>min</span>
          </div>
          {errors.duracao && (<span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.duracao.message}</span>)}
        </div>
      </div>

      <div className={styles.formGroup}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Taxa</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '0 0.5rem',
            maxWidth: '200px'
          }}>
            <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
            <input
              type="number"
              step="0.01"
              placeholder="59,00"
              style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              padding: '0.5rem',
              fontSize: '1rem',
              marginLeft: '0.3rem'
              }}
              {...register('taxa')}
            />
          </div>
          {errors.taxa && (<span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.taxa.message}</span>)}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Imagem</label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register('imagem')}
        />
        {errors.imagem && <span className={styles.error}>{errors.imagem.message}</span>}
      </div>

      {/* Campo específico para serviços de hospedagem*/}
      <div className={styles.formGroup}>
        <label>
          Tipo de hospedagem<span style={{ color: 'red' }}>*</span>
        </label>
        <Form.Select 
          aria-label="tipo_hospedagem" 
          {...register('tipo_hospedagem', { required: 'Campo obrigatório' })} 
          defaultValue="" // Define a opção padrão como vazia
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="1">Hotel</option>
          <option value="2">Recuperação</option>
          <option value="3">Creche</option>
        </Form.Select>
        {errors.tipo_hospedagem && <span className={styles.error}>{errors.tipo_hospedagem.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Necessidades Especiais</label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de necessidades especiais: Oferecemos serviços especiais para pet com alguma deficiência.'
          {...register('necessidades_esp')}        
        />
        {errors.necessidades_esp && <span className={styles.error}>{errors.necessidades_esp.message}</span>}
      </div>

      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};