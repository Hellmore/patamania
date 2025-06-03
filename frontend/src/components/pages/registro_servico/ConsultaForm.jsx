import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import styles from './styles.module.css';

export default function ConsultaForm ({ onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.servicoForm}>
      <h2>Cadastro de Serviço - Consulta Veterinária</h2>
      
      {/* Outros campos comuns */}
      
      <Form.Group className={styles.formGroup} controlId='formConsultaNome'>
        <Form.Label>Nome do Serviço<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Serviço'
        />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formConsultaDescricao'>
        <Form.Label>Descrição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de descrição: Oferecemos consulta completa para seu pet.'
          {...register('descricao', { required: 'Campo obrigatório' })}        
        />
        {errors.descricao && <span className={styles.error}>{errors.descricao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formConsultaPreco'>
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

      <Form.Group className={styles.formGroup} controlId='formConsultaLocalizacao'>
        <Form.Label>Localização<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de localização: Em toda região de Campinas - SP.'
          {...register('localizacao', { required: 'Campo obrigatório' })}
        />
        {errors.localizacao && <span className={styles.error}>{errors.localizacao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formConsultaResponsavel'>
        <Form.Label>Profissional Responsável<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de Profissional Responsável: Robert'
          {...register('responsavel', { required: 'Campo obrigatório' })}
        />
        {errors.responsavel && <span className={styles.error}>{errors.responsavel.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formPasseioDuracao'>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }}>Duração<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="time"
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

      <Form.Group className={styles.formGroup} controlId='formConsultaImagem'>
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
      <Form.Group className={styles.formGroup} controlId='formConsultaEspecialidade'>
        <Form.Label>Especialidade<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          {...register('especialidade', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de especialidade: consulta geral'
        />
        {errors.especialidade && <span className={styles.error}>{errors.especialidade.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formConsultaTipo'>
        <Form.Label>
          Tipo de consulta<span style={{ color: 'red' }}>*</span>
        </Form.Label>
        <Form.Select 
          aria-label="tipo_consulta" 
          {...register('tipo_consulta', { required: 'Campo obrigatório' })} 
          defaultValue="" // Define a opção padrão como vazia
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="1">Rotina</option>
          <option value="2">Queixa</option>
          <option value="3">Emergência</option>
        </Form.Select>
        {errors.tipo_consulta && <span className={styles.error}>{errors.tipo_consulta.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formConsultaVacinas'>
        <Form.Label>Vacinas aplicadas</Form.Label>
        <Form.Control as="textarea" rows={2} 
          placeholder='Exemplo de vacina aplicada: Vacina antirrábica.'
          {...register('vacinas_aplicadas')}        
        />
        {errors.vacinas_aplicadas && <span className={styles.error}>{errors.vacinas_aplicadas.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formConsultaExames'>
        <Form.Label>Exames realizados</Form.Label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de exames realizados: Exame de sangue (hemograma, perfil hepático, perfil renal), exames de imagem (radiografias e ultrassom), exames de fezes e urina, raspados de pele, e exames clínicos gerais.'
          {...register('exames_realizados')}        
        />
        {errors.exames_realizados && <span className={styles.error}>{errors.exames_realizados.message}</span>}
      </Form.Group>

      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};