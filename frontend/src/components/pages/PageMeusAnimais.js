import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import styles from './PageMeusAnimais.module.css';

function PageMeusAnimais() {
  const { user, token } = useAuth();
  const [animais, setAnimais] = useState([]);
  const [animalId, setAnimalId] = useState(null);

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [raca, setRaca] = useState("");
  const [porte, setPorte] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pelagem, setPelagem] = useState("");

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (user && user.id) {
      carregarAnimais();
    }
  }, [user]);

  // Faz a mensagem sumir após 5 segundos
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  const carregarAnimais = () => {
    axios
      .get(`http://localhost:3001/animais/lista-por-usuario/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAnimais(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar animais:", error);
      });
  };

  const limparCampos = () => {
    setAnimalId(null);
    setNome("");
    setDataNascimento("");
    setRaca("");
    setPorte("");
    setDescricao("");
    setPelagem("");
    setMensagem("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !dataNascimento || !raca || !porte || !descricao || !pelagem) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const dados = {
      animal_nome: nome,
      animal_dataNascimento: dataNascimento,
      animal_raca: raca,
      animal_porte: porte,
      animal_descricao: descricao,
      animal_pelagem: pelagem,
      usuario_id: user.id,
    };

    if (animalId) {
      axios
        .put(`http://localhost:3001/animais/atualizar/${animalId}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setMensagem("Animal atualizado com sucesso!");
          carregarAnimais();
          limparCampos();
        })
        .catch((error) => {
          console.error("Erro ao atualizar animal:", error);
          setMensagem("Erro ao atualizar animal.");
        });
    } else {
      axios
        .post(`http://localhost:3001/animais/cadastro`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setMensagem("Animal cadastrado com sucesso!");
          carregarAnimais();
          limparCampos();
        })
        .catch((error) => {
          console.error("Erro ao cadastrar animal:", error);
          setMensagem("Erro ao cadastrar animal.");
        });
    }
  };

  const handleEditar = (animal) => {
    setAnimalId(animal.animal_id);
    setNome(animal.animal_nome);
    setDataNascimento(animal.animal_dataNascimento.split("T")[0]);
    setRaca(animal.animal_raca);
    setPorte(animal.animal_porte);
    setDescricao(animal.animal_descricao);
    setPelagem(animal.animal_pelagem);
    setMensagem("");
  };

const handleDeletar = (animal_id) => {
  const confirmacao = window.confirm(
    "Tem certeza que deseja deletar este animal? Todos os agendamentos relacionados serão excluídos!"
  );

  if (!confirmacao) return;

  axios
    .delete(`http://localhost:3001/animais/deletar/${animal_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setMensagem("Animal deletado com sucesso!");
      carregarAnimais();
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        setMensagem(error.response.data);
      } else {
        setMensagem("Erro ao deletar animal.");
      }
    });
};

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.titulo}>
          {animalId ? "Editar Animal" : "Cadastrar Animal"}
        </h1>

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
          <input
            type="text"
            placeholder="Raça"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          />
          <select value={porte} onChange={(e) => setPorte(e.target.value)}>
            <option value="">Selecione o porte</option>
            <option value="P">Pequeno</option>
            <option value="M">Médio</option>
            <option value="G">Grande</option>
          </select>
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <select value={pelagem} onChange={(e) => setPelagem(e.target.value)}>
            <option value="">Selecione a pelagem</option>
            <option value="CURTA">Curta</option>
            <option value="MEDIA">Média</option>
            <option value="LONGA">Longa</option>
            <option value="PELADO">Pelado</option>
          </select>

          <button type="submit" className={styles.botao}>
            {animalId ? "Atualizar" : "Cadastrar"}
          </button>
          {animalId && (
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={limparCampos}
            >
              Cancelar Edição
            </button>
          )}
        </form>
      </div>

      <div className={styles.lista}>
        <h2 className={styles.titulo}>Meus Animais</h2>
        {animais.length === 0 ? (
          <p>Você não possui animais cadastrados.</p>
        ) : (
          <ul>
            {animais.map((animal) => (
            <li key={animal.animal_id} className={styles.item}>
            <strong>{animal.animal_nome}</strong>
            <div>
                <button
                onClick={() => handleEditar(animal)}
                className={styles.botaoEditar}
                >
                Editar
                </button>
                <button
                className={styles.botaoDeletar}
                onClick={() => handleDeletar(animal.animal_id)}
                >
                Deletar
                </button>
            </div>
            </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PageMeusAnimais;