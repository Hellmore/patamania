import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PageAgendamento.module.css";

function PageAgendamentoBanhoTosa() {
  const { user, token } = useAuth();
  const { servicoId } = useParams();
  const [animais, setAnimais] = useState([]);
  const [animalId, setAnimalId] = useState("");
  const [tipoTosa, setTipoTosa] = useState("");
  const [produtosUtilizados, setProdutosUtilizados] = useState("");
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

    if (!animalId || !tipoTosa || !produtosUtilizados || !dataHora) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const dados = {
      usuario_id: user.id,
      servico_id: 1,
      animal_id: animalId,
      agendamento_datahora: dataHora,
      agendamento_status: "PENDENTE",
      banhoetosa_tipotosa: tipoTosa,
      banhoetosa_produtosutilizados: produtosUtilizados,
    };

    axios
      .post("http://localhost:3001/agendamentos/banho-e-tosa", dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMensagem("Agendamento realizado com sucesso!");
        setAnimalId("");
        setTipoTosa("");
        setProdutosUtilizados("");
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
        <h1 className={styles.titulo}>Agendar Banho e Tosa</h1>
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
            <label>Tipo de Tosa:</label>
            <select
              value={tipoTosa}
              onChange={(e) => setTipoTosa(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="HIGIÊNICA">Higiênica</option>
              <option value="PADRÃO">Padrão</option>
              <option value="TESOURA">Tesoura</option>
              <option value="RAÇA">Raça</option>
              <option value="NENHUMA">Nenhuma</option>
            </select>
          </div>

          <div className={styles.campo}>
            <label>Produtos Utilizados:</label>
            <input
              type="text"
              value={produtosUtilizados}
              onChange={(e) => setProdutosUtilizados(e.target.value)}
              placeholder="Ex.: Shampoo neutro, condicionador..."
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

export default PageAgendamentoBanhoTosa;
