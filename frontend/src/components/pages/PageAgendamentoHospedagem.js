import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PageAgendamento.module.css";

function PageAgendamentoHospedagem() {
  const { user, token } = useAuth();
  const { servicoId } = useParams();
  const [animais, setAnimais] = useState([]);
  const [animalId, setAnimalId] = useState("");
  const [tipoHospedagem, setTipoHospedagem] = useState("");
  const [necessidadesEspeciais, setNecessidadesEspeciais] = useState("");
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

    if (!animalId || !tipoHospedagem || !necessidadesEspeciais || !dataHora) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    const dados = {
      usuario_id: user.id,
      servico_id: 4, // ID fixo da Hospedagem (ajuste conforme seu banco)
      animal_id: animalId,
      agendamento_datahora: dataHora,
      agendamento_status: "PENDENTE",
      hospedagem_tipo: tipoHospedagem,
      hospedagem_necessidadesespeciais: necessidadesEspeciais,
    };

    axios
      .post("http://localhost:3001/agendamentos/hospedagem", dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMensagem("Agendamento de hospedagem realizado com sucesso!");
        setAnimalId("");
        setTipoHospedagem("");
        setNecessidadesEspeciais("");
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
        <h1 className={styles.titulo}>Agendar Hospedagem</h1>
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
            <label>Tipo de Hospedagem:</label>
            <select
              value={tipoHospedagem}
              onChange={(e) => setTipoHospedagem(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="HOTEL">Hotel</option>
              <option value="RECUPERACAO">Recuperação</option>
              <option value="CRECHE">Creche</option>
            </select>
          </div>

          <div className={styles.campo}>
            <label>Necessidades Especiais:</label>
            <input
              type="text"
              value={necessidadesEspeciais}
              onChange={(e) => setNecessidadesEspeciais(e.target.value)}
              placeholder="Informe se houver (Ex.: Medicamentos, dieta...)"
            />
          </div>

          <div className={styles.campo}>
            <label>Data e Hora da Entrada:</label>
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

export default PageAgendamentoHospedagem;