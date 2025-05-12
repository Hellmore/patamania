-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/05/2025 às 15:49
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `patamania`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento`
--

CREATE TABLE `agendamento` (
  `agendamento_id` int(5) NOT NULL,
  `cliente_id` int(5) NOT NULL,
  `animal_id` int(5) NOT NULL,
  `servico_id` int(5) NOT NULL,
  `agendamento_status` enum('PENDENTE','CONFIRMADO','CANCELADO','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamento`
--

INSERT INTO `agendamento` (`agendamento_id`, `cliente_id`, `animal_id`, `servico_id`, `agendamento_status`) VALUES
(1, 1, 1, 1, 'CONFIRMADO'),
(2, 2, 2, 2, 'CANCELADO'),
(3, 3, 3, 3, 'PENDENTE');

-- --------------------------------------------------------

--
-- Estrutura para tabela `animal`
--

CREATE TABLE `animal` (
  `animal_id` int(5) NOT NULL,
  `animal_nome` varchar(100) NOT NULL,
  `animal_dataNascimento` date NOT NULL,
  `animal_raca` varchar(100) NOT NULL,
  `animal_porte` varchar(1) NOT NULL,
  `animal_descricao` varchar(200) NOT NULL,
  `animal_pelagem` enum('CURTA','MEDIA','LONGA','PELADO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `animal`
--

INSERT INTO `animal` (`animal_id`, `animal_nome`, `animal_dataNascimento`, `animal_raca`, `animal_porte`, `animal_descricao`, `animal_pelagem`) VALUES
(1, 'Max', '2019-07-12', 'Labrador Retriever', 'G', 'Muito amigável e adora brincar com crianças', 'CURTA'),
(2, 'Mia', '2021-03-05', 'Persa', 'P', 'Gosta de dormir em locais altos e é muito calma', 'CURTA'),
(3, 'Rocky', '2018-11-20', 'Bulldog Francês', 'M', 'Adora passeios curtos e é muito carinhoso', 'CURTA');

-- --------------------------------------------------------

--
-- Estrutura para tabela `banhoetosa`
--

CREATE TABLE `banhoetosa` (
  `banhoetosa_id` int(5) NOT NULL,
  `servico_id` int(5) NOT NULL,
  `banhoetosa_tipotosa` varchar(10) NOT NULL,
  `banhoetosa_produtosutilizados` varchar(100) NOT NULL,
  `animal_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrinho`
--

CREATE TABLE `carrinho` (
  `carrinho_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `compra`
--

CREATE TABLE `compra` (
  `compra_id` int(5) NOT NULL,
  `carrinho_id` int(5) NOT NULL,
  `usuario_id` int(5) NOT NULL,
  `compra_nometitular` varchar(100) NOT NULL,
  `compra_data` date NOT NULL,
  `compra_codigoseguranca` int(5) NOT NULL,
  `compra_valortotal` float NOT NULL,
  `compra_status` enum('PAGO','PENDENTE','NEGADO','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `consultaveterinaria`
--

CREATE TABLE `consultaveterinaria` (
  `consultaveterinaria_id` int(5) NOT NULL,
  `servico_id` int(5) NOT NULL,
  `consultaveterinaria_especialidade` varchar(20) NOT NULL,
  `consultaveterinaria_tipo` enum('ROTINA','QUEIXA','EMERGENCIA','') NOT NULL,
  `consultaveterinaria_vacinasaplicadas` varchar(200) DEFAULT NULL,
  `consultaveterinaria_examesrealizados` varchar(200) DEFAULT NULL,
  `animal_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `endereco_id` int(5) NOT NULL,
  `usuario_id` int(5) NOT NULL,
  `endereco_logradouro` varchar(200) NOT NULL,
  `endereco_numero` int(5) NOT NULL,
  `endereco_complemento` varchar(100) NOT NULL,
  `endereco_bairro` varchar(100) NOT NULL,
  `endereco_cidade` varchar(100) NOT NULL,
  `endereco_estado` varchar(15) NOT NULL,
  `endereco_cep` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`endereco_id`, `usuario_id`, `endereco_logradouro`, `endereco_numero`, `endereco_complemento`, `endereco_bairro`, `endereco_cidade`, `endereco_estado`, `endereco_cep`) VALUES
(1, 1, 'Rua dos Magos', 123, 'Apartamento 101', 'Centro', 'Londres', 'Inglaterra', 10001),
(2, 2, 'Calle del Sol', 456, 'Casa no deserto', 'Deserto de Tatooine', 'Mos Eisley', 'Tatooine', 12345),
(3, 3, 'Baker Street', 221, 'Apartamento de Sherlock', 'Marylebone', 'Londres', 'Inglaterra', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `historicoanimal`
--

CREATE TABLE `historicoanimal` (
  `historicoanimal_id` int(5) NOT NULL,
  `animal_id` int(5) NOT NULL,
  `agendamento_id` int(5) NOT NULL,
  `historicoanimal_datahora` datetime NOT NULL,
  `historicoanimal_descricao` varchar(200) NOT NULL,
  `historicoanimal_vacinas` varchar(100) NOT NULL,
  `historicoanimal_medicamentos` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `historicoanimal`
--

INSERT INTO `historicoanimal` (`historicoanimal_id`, `animal_id`, `agendamento_id`, `historicoanimal_datahora`, `historicoanimal_descricao`, `historicoanimal_vacinas`, `historicoanimal_medicamentos`) VALUES
(1, 1, 1, '2025-04-02 15:43:27', '2 anos, macho, saudavel', 'Nenhuma', 'Nenhum'),
(2, 2, 2, '2025-04-02 15:43:27', '1 ano, femea, fratura na pata dianteira direita em 2023.', 'Raiva', 'Cefalexina'),
(3, 3, 3, '2025-04-02 15:43:27', '1 ano, macho, saudavel', 'Raiva', 'Nenhum');

-- --------------------------------------------------------

--
-- Estrutura para tabela `hospedagem`
--

CREATE TABLE `hospedagem` (
  `hospedagem_id` int(5) NOT NULL,
  `servico_id` int(5) NOT NULL,
  `hospedagem_tipo` enum('HOTEL','RECUPERACAO','CRECHE','') NOT NULL,
  `hospedagem_necessidadesespeciais` varchar(200) NOT NULL,
  `animal_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `itemcarrinho`
--

CREATE TABLE `itemcarrinho` (
  `itemcarrinho_id` int(5) NOT NULL,
  `carrinho_id` int(5) NOT NULL,
  `produto_id` int(5) NOT NULL,
  `itemcarrinho_preco` float NOT NULL,
  `itemcarrinho_quantidade` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamento`
--

CREATE TABLE `pagamento` (
  `pagamento_id` int(5) NOT NULL,
  `compra_id` int(5) NOT NULL,
  `pagamento_forma` enum('CARTAO','BOLETO','PIX','') NOT NULL,
  `pagamento_status` enum('PAGO','PENDENTE','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `passeio`
--

CREATE TABLE `passeio` (
  `passeio_id` int(5) NOT NULL,
  `servico_id` int(5) NOT NULL,
  `passeio_duracao` int(11) NOT NULL,
  `passeio_tipo` enum('ATLETICO','COMUM','AQUATICO','') NOT NULL,
  `passeio_nivelatividade` enum('LEVE','INTERMEDIARIA','INTENSA','') NOT NULL,
  `animal_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `produto_id` int(5) NOT NULL,
  `produto_nome` varchar(100) NOT NULL,
  `produto_tipo` enum('PERECIVEL','NAO PERECIVEL','','','') NOT NULL,
  `produto_tamanho` varchar(1) NOT NULL,
  `produto_composicao` varchar(100) NOT NULL,
  `produto_marca` varchar(100) NOT NULL,
  `produto_lote` int(5) NOT NULL,
  `produto_fabricante` varchar(100) NOT NULL,
  `produto_origem` varchar(100) NOT NULL,
  `produto_instrucoes` varchar(200) NOT NULL,
  `produto_validade` date NOT NULL,
  `produto_imagem` blob NOT NULL,
  `produto_codigobarras` varchar(13) NOT NULL,
  `produto_estoque` int(5) NOT NULL,
  `produto_status` enum('DISPONIVEL','ESGOTADO','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `servico`
--

CREATE TABLE `servico` (
  `servico_id` int(5) NOT NULL,
  `servico_nome` varchar(100) NOT NULL,
  `servico_descricao` varchar(200) NOT NULL,
  `servico_categoria` enum('BANHO E TOSA','CONSULTA','PASSEIO','HOSPEDAGEM') NOT NULL,
  `servico_preco` float NOT NULL,
  `servico_disponibilidade` enum('DISPONIVEL','NAO DISPONIVEL','','') NOT NULL,
  `servico_localizacao` varchar(200) NOT NULL,
  `servico_profissionalresponsavel` varchar(100) NOT NULL,
  `servico_responsavelagendamento` int(5) NOT NULL,
  `servico_duracao` int(11) NOT NULL,
  `servico_taxa` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `servico`
--

INSERT INTO `servico` (`servico_id`, `servico_nome`, `servico_descricao`, `servico_categoria`, `servico_preco`, `servico_disponibilidade`, `servico_localizacao`, `servico_profissionalresponsavel`, `servico_responsavelagendamento`, `servico_duracao`, `servico_taxa`) VALUES
(1, 'Banho e Tosa', 'Serviço prestado por prestador de serviço.', 'BANHO E TOSA', 50, 'DISPONIVEL', 'Sede', 'Prestador de serviço', 1, 60, 0),
(2, 'Clinica', 'Consulta clinica', 'CONSULTA', 100, 'DISPONIVEL', 'Sede', 'Veterinário', 2, 60, 0),
(3, 'Passeio', 'Passeio de cachorro', 'PASSEIO', 50, 'DISPONIVEL', 'Sede', 'Prestador de serviço.', 3, 60, 0),
(4, 'Hospedagem', 'Serviço prestado pela Sede.', 'HOSPEDAGEM', 150, 'DISPONIVEL', 'Sede', 'Sede', 2, 1, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `usuario_id` int(5) NOT NULL,
  `usuario_nome` varchar(100) NOT NULL,
  `usuario_tipo` enum('ADMIN','CLIENTE','','') NOT NULL,
  `usuario_dataNascimento` date NOT NULL,
  `usuario_email` varchar(100) NOT NULL,
  `usuario_dataInscricao` date NOT NULL,
  `usuario_pais` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`usuario_id`, `usuario_nome`, `usuario_tipo`, `usuario_dataNascimento`, `usuario_email`, `usuario_dataInscricao`, `usuario_pais`) VALUES
(1, 'Tony Stark', 'ADMIN', '1970-05-29', 'tony.stark@starkindustries.com', '2025-03-21', 'EUA'),
(2, 'Hermione Granger', 'CLIENTE', '1979-09-19', 'hermione.granger@hogwarts.edu', '2025-03-21', 'Reino Unido'),
(3, 'Luke Skywalker', 'CLIENTE', '1977-05-25', 'luke.skywalker@rebellion.com', '2025-03-21', 'Tatooine'),
(4, 'Wonder Woman', 'ADMIN', '1980-07-03', 'diana.prince@amazon.com', '2025-03-21', 'Ilha Paraíso'),
(5, 'Sherlock Holmes', 'CLIENTE', '1854-01-06', 'sherlock.holmes@bakerstreet.com', '2025-03-21', 'Reino Unido'),
(6, 'Bruce Wayne', 'ADMIN', '1985-02-19', 'bruce.wayne@wayneenterprises.com', '2025-03-21', 'EUA');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`agendamento_id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `animal_id` (`animal_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`animal_id`);

--
-- Índices de tabela `banhoetosa`
--
ALTER TABLE `banhoetosa`
  ADD PRIMARY KEY (`banhoetosa_id`),
  ADD KEY `servico_id` (`servico_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Índices de tabela `carrinho`
--
ALTER TABLE `carrinho`
  ADD PRIMARY KEY (`carrinho_id`),
  ADD KEY `cliente_id` (`usuario_id`);

--
-- Índices de tabela `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`compra_id`),
  ADD KEY `carrinho_id` (`carrinho_id`),
  ADD KEY `cliente_id` (`usuario_id`);

--
-- Índices de tabela `consultaveterinaria`
--
ALTER TABLE `consultaveterinaria`
  ADD PRIMARY KEY (`consultaveterinaria_id`),
  ADD KEY `servico_id` (`servico_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`endereco_id`),
  ADD KEY `cliente_id` (`usuario_id`);

--
-- Índices de tabela `historicoanimal`
--
ALTER TABLE `historicoanimal`
  ADD PRIMARY KEY (`historicoanimal_id`),
  ADD KEY `animal_id` (`animal_id`),
  ADD KEY `agendamento_id` (`agendamento_id`);

--
-- Índices de tabela `hospedagem`
--
ALTER TABLE `hospedagem`
  ADD PRIMARY KEY (`hospedagem_id`),
  ADD KEY `servico_id` (`servico_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Índices de tabela `itemcarrinho`
--
ALTER TABLE `itemcarrinho`
  ADD PRIMARY KEY (`itemcarrinho_id`),
  ADD KEY `carrinho_id` (`carrinho_id`),
  ADD KEY `produto_id` (`produto_id`);

--
-- Índices de tabela `pagamento`
--
ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`pagamento_id`),
  ADD KEY `compra_id` (`compra_id`);

--
-- Índices de tabela `passeio`
--
ALTER TABLE `passeio`
  ADD PRIMARY KEY (`passeio_id`),
  ADD KEY `servico_id` (`servico_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`produto_id`);

--
-- Índices de tabela `servico`
--
ALTER TABLE `servico`
  ADD PRIMARY KEY (`servico_id`),
  ADD KEY `servico_responsavelagendamento` (`servico_responsavelagendamento`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `agendamento_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `animal`
--
ALTER TABLE `animal`
  MODIFY `animal_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `banhoetosa`
--
ALTER TABLE `banhoetosa`
  MODIFY `banhoetosa_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `carrinho`
--
ALTER TABLE `carrinho`
  MODIFY `carrinho_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `compra`
--
ALTER TABLE `compra`
  MODIFY `compra_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `consultaveterinaria`
--
ALTER TABLE `consultaveterinaria`
  MODIFY `consultaveterinaria_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `endereco_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `historicoanimal`
--
ALTER TABLE `historicoanimal`
  MODIFY `historicoanimal_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `hospedagem`
--
ALTER TABLE `hospedagem`
  MODIFY `hospedagem_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `itemcarrinho`
--
ALTER TABLE `itemcarrinho`
  MODIFY `itemcarrinho_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pagamento`
--
ALTER TABLE `pagamento`
  MODIFY `pagamento_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `passeio`
--
ALTER TABLE `passeio`
  MODIFY `passeio_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `produto_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `servico`
--
ALTER TABLE `servico`
  MODIFY `servico_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuario_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuario` (`usuario_id`),
  ADD CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`),
  ADD CONSTRAINT `agendamento_ibfk_3` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`);

--
-- Restrições para tabelas `banhoetosa`
--
ALTER TABLE `banhoetosa`
  ADD CONSTRAINT `banhoetosa_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  ADD CONSTRAINT `banhoetosa_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`);

--
-- Restrições para tabelas `carrinho`
--
ALTER TABLE `carrinho`
  ADD CONSTRAINT `carrinho_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Restrições para tabelas `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`carrinho_id`) REFERENCES `carrinho` (`carrinho_id`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Restrições para tabelas `consultaveterinaria`
--
ALTER TABLE `consultaveterinaria`
  ADD CONSTRAINT `consultaveterinaria_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  ADD CONSTRAINT `consultaveterinaria_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`);

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Restrições para tabelas `historicoanimal`
--
ALTER TABLE `historicoanimal`
  ADD CONSTRAINT `historicoanimal_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`),
  ADD CONSTRAINT `historicoanimal_ibfk_2` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamento` (`agendamento_id`);

--
-- Restrições para tabelas `hospedagem`
--
ALTER TABLE `hospedagem`
  ADD CONSTRAINT `hospedagem_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  ADD CONSTRAINT `hospedagem_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`);

--
-- Restrições para tabelas `itemcarrinho`
--
ALTER TABLE `itemcarrinho`
  ADD CONSTRAINT `itemcarrinho_ibfk_1` FOREIGN KEY (`carrinho_id`) REFERENCES `carrinho` (`carrinho_id`),
  ADD CONSTRAINT `itemcarrinho_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`produto_id`);

--
-- Restrições para tabelas `pagamento`
--
ALTER TABLE `pagamento`
  ADD CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compra` (`compra_id`);

--
-- Restrições para tabelas `passeio`
--
ALTER TABLE `passeio`
  ADD CONSTRAINT `passeio_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  ADD CONSTRAINT `passeio_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`);

--
-- Restrições para tabelas `servico`
--
ALTER TABLE `servico`
  ADD CONSTRAINT `servico_ibfk_1` FOREIGN KEY (`servico_responsavelagendamento`) REFERENCES `usuario` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
