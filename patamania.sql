-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: patamania
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `agendamento_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `animal_id` int NOT NULL,
  `servico_id` int NOT NULL,
  `agendamento_status` enum('PENDENTE','CONFIRMADO','CANCELADO','') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`agendamento_id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `animal_id` (`animal_id`),
  KEY `servico_id` (`servico_id`),
  CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuario` (`usuario_id`),
  CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`),
  CONSTRAINT `agendamento_ibfk_3` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
INSERT INTO `agendamento` VALUES (1,1,1,1,'CONFIRMADO'),(2,2,2,2,'CANCELADO'),(3,3,3,3,'PENDENTE');
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `animal_id` int NOT NULL AUTO_INCREMENT,
  `animal_nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `animal_dataNascimento` date NOT NULL,
  `animal_raca` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `animal_porte` varchar(1) COLLATE utf8mb4_general_ci NOT NULL,
  `animal_descricao` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `animal_pelagem` enum('CURTA','MEDIA','LONGA','PELADO') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`animal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` VALUES (1,'Max','2019-07-12','Labrador Retriever','G','Muito amigável e adora brincar com crianças','CURTA'),(2,'Mia','2021-03-05','Persa','P','Gosta de dormir em locais altos e é muito calma','CURTA'),(3,'Rocky','2018-11-20','Bulldog Francês','M','Adora passeios curtos e é muito carinhoso','CURTA');
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banhoetosa`
--

DROP TABLE IF EXISTS `banhoetosa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banhoetosa` (
  `banhoetosa_id` int NOT NULL AUTO_INCREMENT,
  `servico_id` int NOT NULL,
  `banhoetosa_tipotosa` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `banhoetosa_produtosutilizados` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `animal_id` int NOT NULL,
  PRIMARY KEY (`banhoetosa_id`),
  KEY `servico_id` (`servico_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `banhoetosa_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  CONSTRAINT `banhoetosa_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banhoetosa`
--

LOCK TABLES `banhoetosa` WRITE;
/*!40000 ALTER TABLE `banhoetosa` DISABLE KEYS */;
/*!40000 ALTER TABLE `banhoetosa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `compra_id` int NOT NULL AUTO_INCREMENT,
  `carrinho_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `compra_nometitular` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `compra_data` date NOT NULL,
  `compra_codigoseguranca` int NOT NULL,
  `compra_valortotal` float NOT NULL,
  `compra_status` enum('PAGO','PENDENTE','NEGADO','') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`compra_id`),
  KEY `carrinho_id` (`carrinho_id`),
  KEY `cliente_id` (`usuario_id`),
  CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultaveterinaria`
--

DROP TABLE IF EXISTS `consultaveterinaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultaveterinaria` (
  `consultaveterinaria_id` int NOT NULL AUTO_INCREMENT,
  `servico_id` int NOT NULL,
  `consultaveterinaria_especialidade` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `consultaveterinaria_tipo` enum('ROTINA','QUEIXA','EMERGENCIA','') COLLATE utf8mb4_general_ci NOT NULL,
  `consultaveterinaria_vacinasaplicadas` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `consultaveterinaria_examesrealizados` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `animal_id` int NOT NULL,
  PRIMARY KEY (`consultaveterinaria_id`),
  KEY `servico_id` (`servico_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `consultaveterinaria_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  CONSTRAINT `consultaveterinaria_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultaveterinaria`
--

LOCK TABLES `consultaveterinaria` WRITE;
/*!40000 ALTER TABLE `consultaveterinaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultaveterinaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `endereco_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `endereco_logradouro` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco_numero` int NOT NULL,
  `endereco_complemento` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco_bairro` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco_cidade` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco_estado` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco_cep` int NOT NULL,
  PRIMARY KEY (`endereco_id`),
  KEY `cliente_id` (`usuario_id`),
  CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,1,'Rua dos Magos',123,'Apartamento 101','Centro','Londres','Inglaterra',10001),(2,2,'Calle del Sol',456,'Casa no deserto','Deserto de Tatooine','Mos Eisley','Tatooine',12345),(3,3,'Baker Street',221,'Apartamento de Sherlock','Marylebone','Londres','Inglaterra',0);
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historicoanimal`
--

DROP TABLE IF EXISTS `historicoanimal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicoanimal` (
  `historicoanimal_id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int NOT NULL,
  `agendamento_id` int NOT NULL,
  `historicoanimal_datahora` datetime NOT NULL,
  `historicoanimal_descricao` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `historicoanimal_vacinas` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `historicoanimal_medicamentos` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`historicoanimal_id`),
  KEY `animal_id` (`animal_id`),
  KEY `agendamento_id` (`agendamento_id`),
  CONSTRAINT `historicoanimal_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`),
  CONSTRAINT `historicoanimal_ibfk_2` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamento` (`agendamento_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historicoanimal`
--

LOCK TABLES `historicoanimal` WRITE;
/*!40000 ALTER TABLE `historicoanimal` DISABLE KEYS */;
INSERT INTO `historicoanimal` VALUES (1,1,1,'2025-04-02 15:43:27','2 anos, macho, saudavel','Nenhuma','Nenhum'),(2,2,2,'2025-04-02 15:43:27','1 ano, femea, fratura na pata dianteira direita em 2023.','Raiva','Cefalexina'),(3,3,3,'2025-04-02 15:43:27','1 ano, macho, saudavel','Raiva','Nenhum');
/*!40000 ALTER TABLE `historicoanimal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospedagem`
--

DROP TABLE IF EXISTS `hospedagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospedagem` (
  `hospedagem_id` int NOT NULL AUTO_INCREMENT,
  `servico_id` int NOT NULL,
  `hospedagem_tipo` enum('HOTEL','RECUPERACAO','CRECHE','') COLLATE utf8mb4_general_ci NOT NULL,
  `hospedagem_necessidadesespeciais` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `animal_id` int NOT NULL,
  PRIMARY KEY (`hospedagem_id`),
  KEY `servico_id` (`servico_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `hospedagem_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  CONSTRAINT `hospedagem_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospedagem`
--

LOCK TABLES `hospedagem` WRITE;
/*!40000 ALTER TABLE `hospedagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospedagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento`
--

DROP TABLE IF EXISTS `pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamento` (
  `pagamento_id` int NOT NULL AUTO_INCREMENT,
  `compra_id` int NOT NULL,
  `pagamento_forma` enum('CARTAO','BOLETO','PIX','') COLLATE utf8mb4_general_ci NOT NULL,
  `pagamento_status` enum('PAGO','PENDENTE','','') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`pagamento_id`),
  KEY `compra_id` (`compra_id`),
  CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compra` (`compra_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento`
--

LOCK TABLES `pagamento` WRITE;
/*!40000 ALTER TABLE `pagamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passeio`
--

DROP TABLE IF EXISTS `passeio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passeio` (
  `passeio_id` int NOT NULL AUTO_INCREMENT,
  `servico_id` int NOT NULL,
  `passeio_duracao` int NOT NULL,
  `passeio_tipo` enum('ATLETICO','COMUM','AQUATICO','') COLLATE utf8mb4_general_ci NOT NULL,
  `passeio_nivelatividade` enum('LEVE','INTERMEDIARIA','INTENSA','') COLLATE utf8mb4_general_ci NOT NULL,
  `animal_id` int NOT NULL,
  PRIMARY KEY (`passeio_id`),
  KEY `servico_id` (`servico_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `passeio_ibfk_1` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`servico_id`),
  CONSTRAINT `passeio_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passeio`
--

LOCK TABLES `passeio` WRITE;
/*!40000 ALTER TABLE `passeio` DISABLE KEYS */;
/*!40000 ALTER TABLE `passeio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `produto_id` int NOT NULL AUTO_INCREMENT,
  `produto_nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_tipo` enum('PERECIVEL','NAO PERECIVEL') COLLATE utf8mb4_general_ci NOT NULL,
  `produto_tamanho` varchar(1) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_composicao` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_marca` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_lote` int NOT NULL,
  `produto_fabricante` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_origem` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_instrucoes` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_validade` date NOT NULL,
  `produto_imagem` longtext COLLATE utf8mb4_general_ci,
  `produto_codigobarras` varchar(13) COLLATE utf8mb4_general_ci NOT NULL,
  `produto_estoque` int NOT NULL,
  `produto_status` enum('DISPONIVEL','ESGOTADO') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `servico_id` int NOT NULL AUTO_INCREMENT,
  `servico_nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `servico_descricao` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `servico_categoria` enum('BANHO E TOSA','CONSULTA','PASSEIO','HOSPEDAGEM') COLLATE utf8mb4_general_ci NOT NULL,
  `servico_preco` float NOT NULL,
  `servico_disponibilidade` enum('DISPONIVEL','NAO DISPONIVEL','','') COLLATE utf8mb4_general_ci NOT NULL,
  `servico_localizacao` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `servico_profissionalresponsavel` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `servico_responsavelagendamento` int NOT NULL,
  `servico_duracao` int NOT NULL,
  `servico_taxa` float NOT NULL,
  PRIMARY KEY (`servico_id`),
  KEY `servico_responsavelagendamento` (`servico_responsavelagendamento`),
  CONSTRAINT `servico_ibfk_1` FOREIGN KEY (`servico_responsavelagendamento`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (1,'Banho e Tosa','Serviço prestado por prestador de serviço.','BANHO E TOSA',50,'DISPONIVEL','Sede','Prestador de serviço',1,60,0),(2,'Clinica','Consulta clinica','CONSULTA',100,'DISPONIVEL','Sede','Veterinário',2,60,0),(3,'Passeio','Passeio de cachorro','PASSEIO',50,'DISPONIVEL','Sede','Prestador de serviço.',3,60,0),(4,'Hospedagem','Serviço prestado pela Sede.','HOSPEDAGEM',150,'DISPONIVEL','Sede','Sede',2,1,0);
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `usuario_nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_tipo` enum('ADMIN','CLIENTE') COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_dataNascimento` date NOT NULL,
  `usuario_email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_dataInscricao` date NOT NULL,
  `usuario_pais` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `usuario_senha` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Tony Stark','ADMIN','1970-05-29','tony.stark@starkindustries.com','2025-03-21','EUA',''),(2,'Hermione Granger','CLIENTE','1979-09-19','hermione.granger@hogwarts.edu','2025-03-21','Reino Unido',''),(3,'Luke Skywalker','CLIENTE','1977-05-25','luke.skywalker@rebellion.com','2025-03-21','Tatooine',''),(4,'Wonder Woman','ADMIN','1980-07-03','diana.prince@amazon.com','2025-03-21','Ilha Paraíso',''),(5,'Sherlock Holmes','CLIENTE','1854-01-06','sherlock.holmes@bakerstreet.com','2025-03-21','Reino Unido',''),(6,'Bruce Wayne','ADMIN','1985-02-19','bruce.wayne@wayneenterprises.com','2025-03-21','EUA',''),(7,'João Silva','CLIENTE','1990-05-15','joao@gmail.com','2025-05-11','Brasil','$2b$10$Cx0k1lvk/SygltOvft2AZuuvQFPyB07QT1B3eLmrVy/J/N7XAys/m');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-25 15:52:10
