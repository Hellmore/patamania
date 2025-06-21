import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PageAgendamento.module.css";

function PageAgendamentoConsultaVeterinaria() {
  const { user, token } = useAuth();
  const { servicoId } = useParams();
  const [animais, setAnimais] = useState([]);
  const [animalId, setAnimalId] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [vacinas, setVacinas] = useState("");
  const [exames, setExames] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:3001/animais/lista-por-usuario/${user.id}`)
        .then((response) => {
          setAnimais(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar animais:", error);
        });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!animalId || !especialidade || !tipoConsulta || !dataHora) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    const dados = {
      usuario_id: user.id,
      servico_id: 3, // ID fixo da Consulta Veterinária, ajuste se for diferente
      animal_id: animalId,
      agendamento_datahora: dataHora,
      agendamento_status: "PENDENTE",
      consultaveterinaria_especialidade: especialidade,
      consultaveterinaria_tipo: tipoConsulta,
      consultaveterinaria_vacinasaplicadas: vacinas,
      consultaveterinaria_examesrealizados: exames,
    };

    axios
      .post("http://localhost:3001/agendamentos/consulta-veterinaria", dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMensagem("Agendamento realizado com sucesso!");
        setAnimalId("");
        setEspecialidade("");
        setTipoConsulta("");
        setVacinas("");
        setExames("");
        setDataHora("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar agendamento:", error);
        setMensagem("Erro ao cadastrar. Verifique os dados.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.titulo}>Agendar Consulta Veterinária</h1>
        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <div className={styles.campo}>
            <label>Selecione seu Pet:</label>
            <select
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
            >
              <option value="">Selecione</option>
              {animais.map((animal) => (
                <option key={animal.animal_id} value={animal.animal_id}>
                  {animal.animal_nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.campo}>
            <label>Especialidade:</label>
            <input
              type="text"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              placeholder="Ex.: Clínica Geral, Cardiologia..."
            />
          </div>

          <div className={styles.campo}>
            <label>Tipo de Consulta:</label>
            <select
              value={tipoConsulta}
              onChange={(e) => setTipoConsulta(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="ROTINA">Rotina</option>
              <option value="QUEIXA">Queixa</option>
              <option value="EMERGENCIA">Emergência</option>
            </select>
          </div>

          <div className={styles.campo}>
            <label>Vacinas Aplicadas:</label>
            <input
              type="text"
              value={vacinas}
              onChange={(e) => setVacinas(e.target.value)}
              placeholder="Opcional"
            />
          </div>

          <div className={styles.campo}>
            <label>Exames Realizados:</label>
            <input
              type="text"
              value={exames}
              onChange={(e) => setExames(e.target.value)}
              placeholder="Opcional"
            />
          </div>

          <div className={styles.campo}>
            <label>Data e Hora do Agendamento:</label>
            <input
              type="datetime-local"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.botao}>
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PageAgendamentoConsultaVeterinaria;
