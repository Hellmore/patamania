import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PageAgendamento.module.css";

function PageAgendamentoPasseio() {
  const { user, token } = useAuth();
  const { servicoId } = useParams();
  const [animais, setAnimais] = useState([]);
  const [animalId, setAnimalId] = useState("");
  const [tipoPasseio, setTipoPasseio] = useState("");
  const [nivelAtividade, setNivelAtividade] = useState("");
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

    if (!animalId || !tipoPasseio || !nivelAtividade || !dataHora) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    const dados = {
      usuario_id: user.id,
      servico_id: 2, // ID fixo do Passeio
      animal_id: animalId,
      agendamento_datahora: dataHora,
      agendamento_status: "PENDENTE",
      passeio_tipo: tipoPasseio,
      passeio_nivelatividade: nivelAtividade,
    };

    axios
      .post("http://localhost:3001/agendamentos/passeio", dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMensagem("Agendamento de passeio realizado com sucesso!");
        setAnimalId("");
        setTipoPasseio("");
        setNivelAtividade("");
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
        <h1 className={styles.titulo}>Agendar Passeio</h1>
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
            <label>Tipo de Passeio:</label>
            <select
              value={tipoPasseio}
              onChange={(e) => setTipoPasseio(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="ATLETICO">Atlético</option>
              <option value="COMUM">Comum</option>
              <option value="AQUATICO">Aquático</option>
            </select>
          </div>

          <div className={styles.campo}>
            <label>Nível de Atividade:</label>
            <select
              value={nivelAtividade}
              onChange={(e) => setNivelAtividade(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="LEVE">Leve</option>
              <option value="INTERMEDIARIA">Intermediária</option>
              <option value="INTENSA">Intensa</option>
            </select>
          </div>

          <div className={styles.campo}>
            <label>Data e Hora do Passeio:</label>
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

export default PageAgendamentoPasseio;
