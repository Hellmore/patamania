import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import styles from './styles.module.css';
import arrow_back from '../../img/arrow_back.svg';

export default function HospedagemSForm ({ onSubmit, initialData, onBack }) {
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
      <h2>Cadastro de Serviço - Hospedagem</h2>
      
      <Form.Group className={styles.formGroup}>
        <Form.Label>Nome do Serviço<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control
          type="text" 
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Serviço'
        />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </Form.Group>

      {/* Outros campos comuns */}
      <Form.Group className={styles.formGroup}>
        <Form.Label>Descrição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          as="textarea" 
          rows={4} 
          placeholder='Exemplo de descrição: Oferecemos conforto e alimentação sempre a disposição de seu pet.'
          {...register('descricao', { required: 'Campo obrigatório' })}        
        />
        {errors.descricao && <span className={styles.error}>{errors.descricao.message}</span>}
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
              {...register('preco', { required: 'Campo obrigatório' })}
            />
          </div>
          {errors.preco && (<span className={styles.error}>{errors.preco.message}</span>)}
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioTaxa'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Taxa</Form.Label>
          <div className={styles.div_preco}>
            <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              placeholder="59,00"
              className={styles.input_preco}
              {...register('taxa')}
            />
          </div>
          {errors.taxa && (<span className={styles.error}>{errors.taxa.message}</span>)}
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup}>
        <Form.Label>Localização<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control
          type="text" 
          placeholder='Exemplo de localização: Em toda região de Campinas - SP.'
          {...register('localizacao', { required: 'Campo obrigatório' })}
        />
        {errors.localizacao && <span className={styles.error}>{errors.localizacao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup}>
        <Form.Label>Profissional Responsável<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control
          type="text" 
          placeholder='Exemplo de Profissional Responsável: Max'
          {...register('responsavel', { required: 'Campo obrigatório' })}
        />
        {errors.responsavel && <span className={styles.error}>{errors.responsavel.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioDuracao'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Duração<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="time"
              // step={60} // passo de 1 minuto
              step="2"
              min="0"
              defaultValue="00:00"
              className={styles.input_duracao}
              {...register('estoque', { 
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

      <Form.Group className={styles.formGroup} controlId='formPasseioImagem'>
        <Form.Label>Imagem</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register('imagem', {
            validate: {
              isImage: FileList => {
                if (!FileList?.[0]) return true;
                return FileList[0].type.startsWith('image/') || 'Apenas arquivo de imagem é permitido';
              }
            }
          })}
        />
        {errors.imagem && <span className={styles.error}>{errors.imagem.message}</span>}
      </Form.Group>

      {/* Campo específico para serviços de hospedagem*/}
      <Form.Group className={styles.formGroup}>
        <Form.Label>
          Tipo de hospedagem<span style={{ color: 'red' }}>*</span>
        </Form.Label>
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
      </Form.Group>

      <Form.Group className={styles.formGroup}>
        <Form.Label>Necessidades Especiais</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={4} 
          placeholder='Exemplo de necessidades especiais: Oferecemos serviços especiais para pets com alguma deficiência.'
          {...register('necessidades_esp')}        
        />
        {errors.necessidades_esp && <span className={styles.error}>{errors.necessidades_esp.message}</span>}
      </Form.Group>

      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </Form>
  );
};