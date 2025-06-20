import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import styles from './styles.module.css';
import arrow_back from '../../../img/arrow_back.svg';

export default function ConsultaForm ({ onSubmit, initialData, onBack, profissionais }) {
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
      <h2>Cadastro de Serviço - Consulta Veterinária</h2>
      
      <Form.Group className={styles.formGroup} controlId='formPasseioNome'>
        <Form.Label>Nome do Serviço<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          {...register('servico_nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Serviço'
        />
        {errors.servico_nome && <span className={styles.error}>{errors.servico_nome.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioDescricao'>
        <Form.Label>Descrição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de descrição: Oferecemos caminhada de longa duração para seu pet ficar saudável...'
          {...register('servico_descricao', { required: 'Campo obrigatório' })}        
        />
        {errors.servico_descricao && <span className={styles.error}>{errors.servico_descricao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioPreco'>
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
              {...register('servico_preco', { required: 'Campo obrigatório' })}
            />
          </div>
          {errors.servico_preco && (<span className={styles.error}>{errors.servico_preco.message}</span>)}
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioTaxa'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Taxa<span style={{ color: 'red' }}>*</span></Form.Label>
          <div className={styles.div_preco}>
            <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              placeholder="59,00"
              className={styles.input_preco}
              {...register('servico_taxa', { required: 'Campo obrigatório' })}
            />
          </div>
          {errors.servico_taxa && (<span className={styles.error}>{errors.servico_taxa.message}</span>)}
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioLocalizacao'>
        <Form.Label>Localização<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de localização: Em toda região de Campinas - SP.'
          {...register('servico_localizacao', { required: 'Campo obrigatório' })}
        />
        {errors.servico_localizacao && <span className={styles.error}>{errors.servico_localizacao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioResponsavel'>
        <Form.Label>Profissional Responsável<span style={{ color: 'red' }}>*</span></Form.Label>
        {profissionais && profissionais.length > 0 ? (
          <Form.Select 
            {...register('servico_profissionalresponsavel', { required: 'Campo obrigatório' })}
          >
            <option value="">Selecione um profissional</option>
            {profissionais.map(prof => (
              <option key={prof.usuario_id} value={prof.usuario_id}>
                {prof.usuario_nome} ({prof.usuario_email})
              </option>
            ))}
          </Form.Select>
        ) : (
          <div className={styles.error}>
            Nenhum profissional disponível. Contate o suporte.
          </div>
        )}
        {errors.servico_profissionalresponsavel && 
          <span className={styles.error}>{errors.servico_profissionalresponsavel.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioDuracao'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Duração<span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="time"
            step={60}
            defaultValue="00:00"
            className={styles.input_duracao}
            {...register('servico_duracao', { 
              required: 'Campo obrigatório',
              validate: {
                validTime: value => {
                  // Valida se está no formato HH:MM
                  return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || 
                    'Formato de hora inválido (use HH:MM)';
                }
              }
            })}
            />
          {errors.servico_duracao && (<span className={styles.error}>{errors.servico_duracao.message}</span>)}
        </div>
      </Form.Group>

      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </Form>
  );
};