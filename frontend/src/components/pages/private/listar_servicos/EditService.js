import styles from './EditService.module.css';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Flex, Spin } from 'antd';
import { Button, Divider, notification, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';  
import TextArea from 'antd/es/input/TextArea';

export default function EditService() {
 const navigate = useNavigate();
    const { user: authUser } = useAuth();
    const [originalServiceData, setOriginalServiceData] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const { register, formState: { errors }, handleSubmit, getValues, setError, watch } = useForm();
    const [submitError, setSubmitError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [profissionais, setProfissionais] = useState([]);
        
    const tipo = watch('categoria');
    
    const { servico_id } = useParams();

    useEffect(() => {
        const fetchServicoData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/servicos/buscar/${servico_id}`, {
              headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setOriginalServiceData(response.data);
          setServiceData(response.data);
                
          } catch (error) {
            console.error('Erro ao buscar dados do serviços:', error);
          } finally {
            setLoading(false);
          }
        };
          const fetchProfissionais = async () => {
        try {
          // console.log("Iniciando busca por profissionais..."); // Código para teste
          const response = await axios.get('http://localhost:3001/usuarios/admin', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          // Código para teste
          // console.log("Resposta da API:", response.data);
          setProfissionais(response.data);
        } catch (error) {
          console.error("Erro detalhado:", {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
          });
        }
    }
        fetchProfissionais();
        fetchServicoData();
    }, [servico_id]);

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
        const [hours, minutes] = data.duracao.split(':').map(Number);
        const duracaoEmMinutos = hours * 60 + minutes;

        const updateData = {
            servico_nome: data.nome,
            servico_descricao: data.descricao,
            servico_categoria: data.categoria,
            servico_preco: parseFloat(data.preco),
            servico_disponibilidade: data.disponibilidade,
            servico_localizacao: data.localizacao,
            servico_profissionalresponsavel: data.profissionalresponsavel,
            servico_responsavelagendamento:data.responsavelagendamento,
            servico_duracao: duracaoEmMinutos,
            servico_taxa: parseFloat(data.taxa)
        };
        
        const response = await axios.put(
          `http://localhost:3001/servicos/${servico_id}`,
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
            navigate('/listar_servicos');
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

    const formatarDuracao = (minutos) => {
        const hours = Math.floor(minutos / 60);
        const mins = minutos % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;  
    }; 

    return ( 
        <Container fluid className={styles.background}>
            <div className={styles.content}>
            <h1 className={styles.title}>Editar Serviço</h1>
            { serviceData ? (
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="nome">
                    Nome
                    </Form.Label>
                    <Form.Control
                    className={styles.dados_info}
                    autoComplete="off"
                    defaultValue={serviceData.servico_nome || ''}
                    {...register("nome", {
                        required: "Campo obrigatório",
                        validate: (value) =>
                        value.trim() !== "" || "O campo não pode conter apenas espaços.",
                    })}
                    />
                    {errors.nome && <p className={styles.erro}>{errors.nome.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="descricao">Descrição</Form.Label>
                    <Form.Control 
                        className={styles.dados_info}
                        as="textarea" rows={4} 
                        autoComplete="off"
                        defaultValue={serviceData.servico_descricao || ''}
                        placeholder='Exemplo de descrição: Oferecemos caminhada de longa duração para seu pet ficar saudável...'
                        {...register('descricao', { required: 'Campo obrigatório' })}        
                    />
                    {errors.descricao && <span className={styles.error}>{errors.descricao.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="categoria">Categoria</Form.Label>
                    <Form.Select 
                    className={styles.dados_info}
                    aria-label="categoria" 
                    defaultValue={serviceData.servico_categoria || ''}
                    {...register('categoria', { required: 'Campo obrigatório' })} 
                    >
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="BANHO E TOSA">Banho e Tosa</option>
                    <option value="CONSULTA">Consulta Veterinária</option>
                    <option value="PASSEIO">Passeio</option>
                    <option value="HOSPEDAGEM">Hospedagem</option>
                    </Form.Select>
                    {errors.categoria && <span className={styles.error}>{errors.categoria.message}</span>}
                </Form.Group>

                <Form.Group>
                    <div style={{ marginBottom: '1rem' }}>
                    <Form.Label className={styles.label_dados} htmlFor="preco">Preço</Form.Label>
                    <div className={styles.div_preco}>
                        <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
                        <Form.Control
                            defaultValue={serviceData.servico_preco || ''}
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

                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="disponibilidade">Disponibilidade</Form.Label>
                    <Form.Select 
                    className={styles.dados_info}
                    aria-label="disponibilidade" 
                    defaultValue={serviceData.servico_disponibilidade || ''}
                    {...register('disponibilidade', { required: 'Campo obrigatório' })} 
                    >
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="DISPONIVEL">Disponível</option>
                    <option value="NAO DISPONIVEL">Indisponível</option>
                    </Form.Select>
                    {errors.disponibilidade && <span className={styles.error}>{errors.disponibilidade.message}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="localizacao">
                    Localização
                    </Form.Label>
                    <Form.Control
                    className={styles.dados_info}
                    autoComplete="off"
                    defaultValue={serviceData.servico_localizacao || ''}
                    {...register("localizacao", {
                        required: "Campo obrigatório",
                        validate: (value) =>
                        value.trim() !== "" || "O campo não pode conter apenas espaços.",
                    })}
                    />
                    {errors.localizacao && <p className={styles.erro}>{errors.localizacao.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="profissionaisresponsavel">Profissional Responsável</Form.Label>
                    {profissionais && profissionais.length > 0 ? (
                    <Form.Select 
                        defaultValue={serviceData.servico_profissionalresponsavel || ''}
                        {...register('profissionalresponsavel', { required: 'Campo obrigatório' })}
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

                <Form.Group>
                    <Form.Label className={styles.label_dados} htmlFor="responsavelagendamento">
                    Responsável pelo Agendamento
                    </Form.Label>
                    <Form.Control
                    className={styles.dados_info}
                    readOnly
                    defaultValue={serviceData.servico_responsavelagendamento || ''}
                    {...register("responsavelagendamento")}
                    />
                    {errors.responsavelagendamento && <p className={styles.erro}>{errors.responsavelagendamento.message}</p>}
                </Form.Group>

                <Form.Group className={styles.margin}>
                    <div style={{ marginBottom: '1rem' }}>
                    <Form.Label className={styles.label_dados} htmlFor="duracao">Duração</Form.Label>
                    <Form.Control
                        type="time"
                        step={60}
                        defaultValue={formatarDuracao(serviceData.servico_duracao) || '00:00'}
                        className={styles.input_duracao}
                        {...register('duracao', { 
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
                    {errors.duracao && (<span className={styles.error}>{errors.duracao.message}</span>)}
                    </div>
                </Form.Group>

                <Form.Group>
                    <div style={{ marginBottom: '1rem' }}>
                    <Form.Label className={styles.label_dados} htmlFor="taxa">Taxa</Form.Label>
                    <div className={styles.div_preco}>
                        <span style={{ userSelect: 'none', color: '#555' }}>R$</span>
                        <Form.Control
                            defaultValue={serviceData.servico_taxa || ''}
                            type="number"
                            min="0.00"
                            step="0.01"
                            placeholder="59,00"
                            className={styles.input_preco}
                            {...register('taxa', { required: 'Campo obrigatório' })}
                        />
                    </div>
                    {errors.taxa && (<span className={styles.error}>{errors.taxa.message}</span>)}
                    </div>
                </Form.Group>

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
};