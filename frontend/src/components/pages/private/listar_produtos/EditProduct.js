import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import { Button, Divider, notification, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';  
import styles from './EditProduct.module.css';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

export default function EditProduct() {
    const navigate = useNavigate();
    const { user: authUser } = useAuth();
    const [originalProductData, setOriginalProductData] = useState(null);
    const [productData, setProductData] = useState(null);
    const { register, formState: { errors }, handleSubmit, getValues, setError, watch } = useForm();
    const [submitError, setSubmitError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
        
    const tipo = watch('tipo');
    
    const { produto_id } = useParams();

    useEffect(() => {
        const fetchProductData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/produtos/buscar/${produto_id}`, {
              headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setOriginalProductData(response.data);
          setProductData(response.data);
                
          } catch (error) {
            console.error('Erro ao buscar dados do produto:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchProductData();
    }, [produto_id]);

    if (loading) {
        return (
            <Flex className={styles.content} align='center' justify='center' gap='middle'>
                <Spin size="large" />
            </Flex>
        )
    } 

    const onSubmit = async (data) => {
          setIsSubmitting(true);
      
      try {
        const updateData = {
            produto_nome: data.nome,
            produto_tipo: data.tipo,
            produto_tamanho: data.tamanho,
            produto_composicao: data.composicao,
            produto_marca: data.marca,
            produto_lote: data.lote,
            produto_fabricante: data.fabricante,
            produto_origem: data.origem,
            produto_instrucoes: data.instrucoes,
            produto_validade: data.validade ? new Date(data.validade).toISOString().split('T')[0] : null,
            produto_codigobarras: data.codigobarras,
            produto_estoque: data.estoque,
            produto_preco: data.preco,
            produto_garantia: data.tipo === "NAO PERECIVEL" ? data.garantia : null
        };

        // Tratamento especial para imagem
        if (data.imagem && data.imagem[0]) {
            const file = data.imagem[0];
            updateData.produto_imagem = await convertToBase64(file);
        } else {
          updateData.produto_imagem = productData.produto_imagem;
        }
        
        // Verifica e adiciona apenas campos alterados
        // if (data.nome !== productData.produto_nome) updateData.produto_nome = data.nome;
        // if (data.tipo !== productData.produto_tipo) updateData.produto_tipo = data.tipo;
        // if (data.tamanho !== productData.produto_tamanho) updateData.produto_tamanho = data.tamanho;
        // if (data.composicao !== productData.produto_composicao) updateData.produto_composicao = data.composicao;
        // if (data.marca !== productData.produto_marca) updateData.produto_marca = data.marca;
        // if (data.lote !== productData.produto_lote) updateData.produto_lote = data.lote;
        // if (data.fabricante !== productData.produto_fabricante) updateData.produto_fabricante = data.fabricante;
        // if (data.origem !== productData.produto_origem) updateData.produto_origem = data.origem;
        // if (data.instrucoes !== productData.produto_instrucoes) updateData.produto_instrucoes = data.instrucoes;
        // if (data.validade !== productData.produto_validade) updateData.produto_validade = data.validade;
        // if (data.imagem !== productData.produto_imagem) updateData.produto_imagem = data.imagem;
        // if (data.codigobarras !== productData.produto_codigobarras) updateData.produto_codigobarras = data.codigobarras;
        // if (data.estoque !== productData.produto_estoque) updateData.produto_estoque = data.estoque;
        // if (data.garantia !== productData.produto_garantia) updateData.produto_garantia = data.garantia;
        // if (data.preco !== productData.produto_preco) updateData.produto_preco = data.preco;
        
        // if (productData.produto_tipo !== data.tipo && data.tipo === "PERECIVEL") {
        //     updateData.garantia = null;    
        // }
    
        // Tratamento especial para data
        // const formattedDate = data.validade ? new Date(data.validade).toISOString().split('T')[0] : null;
        // if (formattedDate !== (productData.produto_validade?.split('T')[0] || null)) {
        //   updateData.produto_validade = formattedDate;
        // }   

        // if (!data.produto_validade && data.produto_tipo === 'NAO PERECIVEL') {
        //   updateData.produto_validade = null;
        // } else if (data.produto_garantia == '' && data.produto_tipo === 'PERECIVEL') {
        //   updateData.produto_garantia = null;
        // }
                
        // Se não há nada para atualizar
        // if (Object.keys(updateData).length === 0) {
        //   alert('Nenhuma alteração foi feita');
        //   setIsSubmitting(false);
        //   return;
        // }
        
        const response = await axios.put(
          `http://localhost:3001/produtos/atualizar/${produto_id}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.data.success) {
            alert(response.data.message);
            navigate('/listar_produtos');
        } else {
          throw new Error(response.data.message || 'Erro ao atualizar');
        }
      } catch (error) {
        console.error('Erro ao atualizar:', error);
        alert(error.response?.data?.message || error.message || 'Erro ao atualizar dados');
      } finally {
        setIsSubmitting(false);
      }
    };

    // Função para converter imagem para base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    return ( 
        <Container fluid className={styles.background}>
            <div className={styles.content}>
            <h1 className={styles.title}>Editar Produto</h1>
            { productData ? (
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="nome">
                    Nome
                    </Form.Label>
                    <Form.Control
                    className={styles.dados_info}
                    autoComplete="off"
                    defaultValue={productData.produto_nome || ''}
                    {...register("nome", {
                        required: "Campo obrigatório",
                        validate: (value) =>
                        value.trim() !== "" || "O campo não pode conter apenas espaços.",
                    })}
                    />
                    {errors.nome && <p className={styles.erro}>{errors.nome.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Tipo</Form.Label>
                    <Form.Select 
                    aria-label="tipo" 
                    {...register('tipo', { required: 'Campo obrigatório' })} 
                    className={styles.dados_info} 
                    defaultValue={productData.produto_tipo === "NAO PERECIVEL" ? "NAO PERECIVEL" : "PERECIVEL"}
                    >
                        <option value="PERECIVEL">Produto perecível</option>
                        <option value="NAO PERECIVEL">Produto não perecível</option>
                    </Form.Select>
                    {errors.tipo && <span className={styles.error}>{errors.tipo.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Tamanho</Form.Label>
                    <Form.Select 
                        aria-label="tamanho" 
                        {...register('tamanho', { required: 'Campo obrigatório' })} 
                        className={styles.dados_info} 
                        defaultValue={productData.produto_tamanho || ''}
                    >
                        <option value="P">Pequeno</option>
                        <option value="M">Médio</option>
                        <option value="G">Grande</option>
                    </Form.Select>
                    {errors.tamanho && <span className={styles.error}>{errors.tamanho.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="composicao">
                    Composição
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className={styles.dados_info}
                        autoComplete="off"
                        defaultValue={productData.produto_composicao || ''}
                        {...register("composicao", {
                            required: "Campo obrigatório",
                        })}
                    />
                    {errors.composicao && <p className={styles.erro}>{errors.composicao.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Marca</Form.Label>
                    <Form.Control 
                        className={styles.dados_info}
                        placeholder='Exemplo de marca: Chalesco'
                        defaultValue={productData.produto_marca || ''}
                        {...register('marca', { required: 'Campo obrigatório' })}
                    />
                    {errors.marca && <span className={styles.error}>{errors.marca.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Lote</Form.Label>
                    <Form.Control 
                        className={styles.dados_info}
                        type='number'
                        min={0}
                        defaultValue={productData.produto_lote || ''}
                        placeholder='Exemplo de lote: 250522'
                        {...register('lote', { required: 'Campo obrigatório' })}
                    />
                    {errors.lote && <span className={styles.error}>{errors.lote.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Fabricante</Form.Label>
                    <Form.Control 
                        className={styles.dados_info}
                        placeholder='Exemplo de fabricante: Chalesco Comercial de Produtos para Animais LTDA'
                        defaultValue={productData.produto_fabricante || ''}
                        {...register('fabricante', { required: 'Campo obrigatório' })}
                    />
                    {errors.fabricante && <span className={styles.error}>{errors.fabricante.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Origem</Form.Label>
                    <Form.Control 
                        className={styles.dados_info}
                        placeholder='Exemplo de origem: Fabricado no Brasil'
                        defaultValue={productData.produto_origem || ''}
                        {...register('origem', { required: 'Campo obrigatório' })}
                    />
                    {errors.origem && <span className={styles.error}>{errors.origem.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Instruções</Form.Label>
                    <Form.Control as="textarea" rows={4} 
                        className={styles.dados_info}
                        placeholder='Exemplo de composição: Abra o produto, pegue apenas a quantidade necessária para seu pet...'
                        defaultValue={productData.produto_instrucoes || ''}
                        {...register('instrucoes', { required: 'Campo obrigatório'})}        
                    />
                    {errors.instrucoes && <span className={styles.error}>{errors.instrucoes.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Validade</Form.Label>
                    <Form.Control 
                        className={styles.dados_info} 
                        type="date"
                        defaultValue={productData.produto_validade ? new Date(productData.produto_validade).toISOString().split('T')[0] : ''}
                        autoComplete="off"
                        {...register("validade", tipo === "PERECIVEL" ? { required: "Campo obrigatório" } : {})}
                    />
                    {errors.validade && <p className={styles.erro}>{errors.validade.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Imagem</Form.Label>
                    {productData.produto_imagem && (
                        <div className={styles.currentImage}>
                            <img 
                                src={productData.produto_imagem} 
                                alt="Imagem atual do produto" 
                                style={{ maxWidth: '200px', marginBottom: '10px' }}
                            />
                        </div>
                    )}
                    <Form.Control
                        className={styles.dados_info}
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

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Código de barras</Form.Label>
                    <Form.Control 
                        className={styles.dados_info}
                        defaultValue={productData.produto_codigobarras || ''}
                        placeholder='Exemplo de código de barras: 7891234567897'
                        {...register('codigobarras', { required: 'Campo obrigatório' })}
                    />
                    {errors.codigobarras && <span className={styles.error}>{errors.codigobarras.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados}>Quantidade em Estoque</Form.Label>
                    <Form.Control 
                        className={styles.dados_info}
                        defaultValue={productData.produto_estoque || ''}
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

                <Form.Group>
                    <div style={{ marginBottom: '1rem' }}>
                    <Form.Label style={{ display: 'block', marginBottom: '0.3rem' }} className={styles.label_dados}>Preço</Form.Label>
                    <div className={styles.div_preco}>
                        <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
                        <Form.Control
                            type="number"
                            min="0.00"
                            step="0.01"
                            placeholder="59,00"
                            defaultValue={productData.produto_preco || ''}
                            className={styles.input_preco}
                            {...register('preco', { required: 'Campo obrigatório' })}
                        />
                    </div>
                    {errors.preco && (<span className={styles.error}>{errors.preco.message}</span>)}
                    </div>
                </Form.Group>

                {tipo === "NAO PERECIVEL" && (
                    <Form.Group>
                        <Form.Label className={styles.label_dados}>Garantia (meses)</Form.Label>
                        <Form.Control 
                            placeholder='Exemplo de Garantia: 3'
                            type="number" 
                            defaultValue={productData.produto_garantia || ''}
                            min="0"
                            className={styles.dados_info}
                            {...register('garantia', { 
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
                )}

                <div className={styles.button}>
                    <div className={styles.cancel_button}>
                        <Link className={styles.cancel} to="/listar_produtos" alt="Cancelar alteração">
                        Cancelar
                        </Link>
                    </div>
                    <input 
                    className={styles.submit_button} 
                    type="submit" 
                    value={isSubmitting ? "Salvando..." : "Salvar"} 
                    disabled={isSubmitting}
                    />
                </div>
                </Form>
            ) : (
                <p>Carregando os dados...</p>
            )}
            </div>
        </Container>
    )
}