import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import styles from './styles.module.css';

export default function PasseioForm  ({ onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.servicoForm}>
      <h2>Cadastro de Serviço - Passeio</h2>
      
      {/* Outros campos comuns */}
      
      <Form.Group className={styles.formGroup} controlId='formPasseioNome'>
        <Form.Label>Nome do Serviço<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Serviço'
        />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioDescricao'>
        <Form.Label>Descrição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de descrição: Oferecemos caminha de longa duração para seu pet ficar saudável...'
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
              placeholder="59,00"
              className={styles.input_preco}
              {...register('preco', { required: 'Campo obrigatório' })}
            />
          </div>
          {errors.preco && (<span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.preco.message}</span>)}
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
          {errors.taxa && (<span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.taxa.message}</span>)}
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioLocalizacao'>
        <Form.Label>Localização<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de localização: Em toda região de Campinas - SP.'
          {...register('localizacao', { required: 'Campo obrigatório' })}
        />
        {errors.localizacao && <span className={styles.error}>{errors.localizacao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioResponsavel'>
        <Form.Label>Profissional Responsável<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de Profissional Responsável: Lilly'
          {...register('responsavel', { required: 'Campo obrigatório' })}
        />
        {errors.responsavel && <span className={styles.error}>{errors.responsavel.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioDuracao'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Duração<span style={{ color: 'red' }}>*</span></Form.Label>
          <div className={styles.div_preco}>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              placeholder='30'
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
            <span style={{ userSelect: 'none', color: '#555' }}>min</span>
          </div>
          {errors.duracao && (<span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.duracao.message}</span>)}
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
                return FileList[0].type.startsWith('image/') || 'Apenas arquivos de imagem são permitidos';
              }
            }
          })}
        />
        {errors.imagem && <span className={styles.error}>{errors.imagem.message}</span>}
      </Form.Group>

      {/* Campo específico para serviços de passeio */}
      <Form.Group className={styles.formGroup} controlId='formPasseioTipo'>
        <Form.Label>
          Tipo de passeio<span style={{ color: 'red' }}>*</span>
        </Form.Label>
        <Form.Select 
          aria-label="tipo_passeio" 
          {...register('tipo_passeio', { required: 'Campo obrigatório' })} 
          defaultValue="" // Define a opção padrão como vazia
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="1">Atlético</option>
          <option value="2">Comum</option>
          <option value="3">Aquático</option>
        </Form.Select>
        {errors.tipo_passeio && <span className={styles.error}>{errors.tipo_passeio.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioIntensidade'>
        <Form.Label>
          Intensidade de atividade<span style={{ color: 'red' }}>*</span>
        </Form.Label>
        <Form.Select 
          aria-label="nivelamento" 
          {...register('nivelamento', { required: 'Campo obrigatório' })} 
          defaultValue="" // Define a opção padrão como vazia
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="1">Leve</option>
          <option value="2">Intermediária</option>
          <option value="3">Intensa</option>
        </Form.Select>
        {errors.nivelamento && <span className={styles.error}>{errors.nivelamento.message}</span>}
      </Form.Group>

      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </Form>
  );
};