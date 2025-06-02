import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

import styles from './styles.module.css';

export default function NonPerishableForm  ({ onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

   return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.productForm}>
      <h2>Cadastro de Produto Não Perecível</h2>
      
      <Form.Group className={styles.formGroup} controlId='formNonPerishableNome'>
        <Form.Label>Nome do Produto<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder='Exemplo de Produto'
        />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </Form.Group>

      {/* Outros campos comuns */}
      <Form.Group className={styles.formGroup} controlId='formNonPerishableTamanho'>
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

      <Form.Group className={styles.formGroup} controlId='formNonPerishableComposicao'>
        <Form.Label>Composição<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control as="textarea" rows={3} 
          placeholder='Exemplo de composição: plástico; algodão, etc...'
          {...register('composicao', { required: 'Campo obrigatório' })}        
        />
        {errors.composicao && <span className={styles.error}>{errors.composicao.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableMarca'>
        <Form.Label>Marca</Form.Label>
        <Form.Control 
          placeholder='Exemplo de marca: Chalesco'
          {...register('marca')}
        />
        {errors.marca && <span className={styles.error}>{errors.marca.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableLote'>
        <Form.Label>Lote<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de lote: 250522'
          {...register('lote', { required: 'Campo obrigatório' })}
        />
        {errors.lote && <span className={styles.error}>{errors.lote.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableFabricante'>
        <Form.Label>Fabricante<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de fabricante: Chalesco Comercial de Produtos para Animais LTDA'
          {...register('fabricante', { required: 'Campo obrigatório' })}
        />
        {errors.fabricante && <span className={styles.error}>{errors.fabricante.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableOrigem'>
        <Form.Label>Origem<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de origem: Fabricado no Brasil'
          {...register('origem', { required: 'Campo obrigatório' })}
        />
        {errors.origem && <span className={styles.error}>{errors.origem.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableInstrucoes'>
        <Form.Label>Instruções</Form.Label>
        <Form.Control as="textarea" rows={4} 
          placeholder='Exemplo de composição: Abra o produto, pegue apenas a quantidade necessária para seu pet...'
          {...register('instrucoes')}        
        />
        {errors.instrucoes && <span className={styles.error}>{errors.instrucoes.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableValidade'>
        <Form.Label>Validade</Form.Label>
        <Form.Control 
          type='date' style={{width: '10em'}}
          {...register('validade')}
        />
        {errors.validade && <span className={styles.error}>{errors.validade.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableImagem'>
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

      <Form.Group className={styles.formGroup} controlId='formNonPerishableCodBarra'>
        <Form.Label>Código de barras<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de código de barras: 7891234567897'
          {...register('codigo_barras', { required: 'Campo obrigatório' })}
        />
        {errors.codigo_barras && <span className={styles.error}>{errors.codigo_barras.message}</span>}
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId='formNonPerishableEstoque'>
        <Form.Label>Quantidade em Estoque<span style={{ color: 'red' }}>*</span></Form.Label>
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
          {errors.preco && (<span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.preco.message}</span>)}
        </div>
      </Form.Group>

      {/* Campo específico para produtos não perecíveis */}
      <Form.Group className={styles.formGroup} controlId='formNonPerishableGarantia'>
        <Form.Label>Garantia (meses)<span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control 
          placeholder='Exemplo de Garantia: 3'
          type="number" 
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
        {errors.garantia && <span className={styles.error}>{errors.garantia.message}</span>}
      </Form.Group>

      <div className={styles.formActions}>
        <button type="submit">Cadastrar</button>
      </div>
    </Form>
  );
};