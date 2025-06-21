const db = require('./src/utils/db');

const produtos = [
  // RAÇÕES
  {
    produto_nome: 'Ração Premium Cães Adultos',
    produto_tipo: 'PERECIVEL',
    produto_tamanho: 'U',
    produto_composicao: 'Carne, vegetais e cereais',
    produto_marca: 'Golden',
    produto_lote: 2334,
    produto_fabricante: 'Campinas Nutrições',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Manter em local seco e fresco',
    produto_validade: '2026-06-21',
    produto_imagem: 'https://exemplo.com/imagens/racao1.jpg',
    produto_codigobarras: '7891000100011',
    produto_estoque: 50,
    produto_status: 'DISPONIVEL',
    produto_preco: 129.90
  },
  {
    produto_nome: 'Ração Light Gatos Adultos',
    produto_tipo: 'PERECIVEL',
    produto_tamanho: 'M',
    produto_composicao: 'Frango, arroz e fibras',
    produto_marca: 'Whiskas',
    produto_lote: 2456,
    produto_fabricante: 'Mars Petcare',
    produto_origem: 'Argentina',
    produto_instrucoes: 'Servir conforme indicado na embalagem',
    produto_validade: '2026-10-01',
    produto_imagem: 'https://exemplo.com/imagens/racao2.jpg',
    produto_codigobarras: '7891000100028',
    produto_estoque: 40,
    produto_status: 'DISPONIVEL',
    produto_preco: 89.90
  },
  {
    produto_nome: 'Ração Filhotes Raças Pequenas',
    produto_tipo: 'PERECIVEL',
    produto_tamanho: 'P',
    produto_composicao: 'Proteína animal, vitaminas',
    produto_marca: 'Premier Pet',
    produto_lote: 2789,
    produto_fabricante: 'Premier Indústria',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Armazenar bem fechado',
    produto_validade: '2027-01-01',
    produto_imagem: 'https://exemplo.com/imagens/racao3.jpg',
    produto_codigobarras: '7891000100035',
    produto_estoque: 30,
    produto_status: 'DISPONIVEL',
    produto_preco: 105.00
  },

  // HIGIENE
  {
    produto_nome: 'Shampoo Antipulgas Pet',
    produto_tipo: 'NAO PERECIVEL',
    produto_tamanho: 'U',
    produto_composicao: 'Extrato de citronela',
    produto_marca: 'PetClean',
    produto_lote: 3001,
    produto_fabricante: 'Limppets Ltda',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Aplicar no banho, evitar olhos',
    produto_validade: null,
    produto_imagem: 'https://exemplo.com/imagens/shampoo1.jpg',
    produto_codigobarras: '7891000100042',
    produto_estoque: 20,
    produto_status: 'DISPONIVEL',
    produto_preco: 32.50
  },
  {
    produto_nome: 'Sabonete Antisséptico para Pets',
    produto_tipo: 'NAO PERECIVEL',
    produto_tamanho: 'P',
    produto_composicao: 'Clorexidina',
    produto_marca: 'VetSoap',
    produto_lote: 3002,
    produto_fabricante: 'VetHigiene S.A.',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Usar em banhos semanais',
    produto_validade: null,
    produto_imagem: 'https://exemplo.com/imagens/sabonete.jpg',
    produto_codigobarras: '7891000100059',
    produto_estoque: 25,
    produto_status: 'DISPONIVEL',
    produto_preco: 15.00
  },
  {
    produto_nome: 'Lenço Umedecido para Cães e Gatos',
    produto_tipo: 'NAO PERECIVEL',
    produto_tamanho: 'M',
    produto_composicao: 'Aloe vera e camomila',
    produto_marca: 'PetSoft',
    produto_lote: 3003,
    produto_fabricante: 'PetSoft Brasil',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Usar para limpeza externa',
    produto_validade: null,
    produto_imagem: 'https://exemplo.com/imagens/lenco.jpg',
    produto_codigobarras: '7891000100066',
    produto_estoque: 60,
    produto_status: 'DISPONIVEL',
    produto_preco: 19.90
  },

  // FARMÁCIA
  {
    produto_nome: 'Vermífugo Canino 500mg',
    produto_tipo: 'PERECIVEL',
    produto_tamanho: 'P',
    produto_composicao: 'Febantel, praziquantel',
    produto_marca: 'VetPharma',
    produto_lote: 4001,
    produto_fabricante: 'Farmapet S.A.',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Administrar via oral 1x ao mês',
    produto_validade: '2026-08-30',
    produto_imagem: 'https://exemplo.com/imagens/vermifugo.jpg',
    produto_codigobarras: '7891000100073',
    produto_estoque: 35,
    produto_status: 'DISPONIVEL',
    produto_preco: 24.90
  },
  {
    produto_nome: 'Antibiótico PetVet 250mg',
    produto_tipo: 'PERECIVEL',
    produto_tamanho: 'P',
    produto_composicao: 'Amoxicilina',
    produto_marca: 'PetVet',
    produto_lote: 4002,
    produto_fabricante: 'LabPet Brasil',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Usar conforme prescrição',
    produto_validade: '2027-03-01',
    produto_imagem: 'https://exemplo.com/imagens/antibiotico.jpg',
    produto_codigobarras: '7891000100080',
    produto_estoque: 15,
    produto_status: 'DISPONIVEL',
    produto_preco: 59.90
  },
  {
    produto_nome: 'Spray Cicatrizante para Feridas',
    produto_tipo: 'PERECIVEL',
    produto_tamanho: 'U',
    produto_composicao: 'Clorexidina e Aloe Vera',
    produto_marca: 'CicatrizPet',
    produto_lote: 4003,
    produto_fabricante: 'HealthPet S.A.',
    produto_origem: 'Brasil',
    produto_instrucoes: 'Aplicar diretamente na ferida 2x ao dia',
    produto_validade: '2026-09-15',
    produto_imagem: 'https://exemplo.com/imagens/spray.jpg',
    produto_codigobarras: '7891000100097',
    produto_estoque: 18,
    produto_status: 'DISPONIVEL',
    produto_preco: 39.90
  }
];

async function seedProdutos() {
  try {
    await Promise.all(produtos.map(produto => {
      return new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO produto (
            produto_nome,
            produto_tipo,
            produto_tamanho,
            produto_composicao,
            produto_marca,
            produto_lote,
            produto_fabricante,
            produto_origem,
            produto_instrucoes,
            produto_validade,
            produto_imagem,
            produto_codigobarras,
            produto_estoque,
            produto_status,
            produto_preco
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            produto.produto_nome,
            produto.produto_tipo,
            produto.produto_tamanho,
            produto.produto_composicao,
            produto.produto_marca,
            produto.produto_lote,
            produto.produto_fabricante,
            produto.produto_origem,
            produto.produto_instrucoes,
            produto.produto_validade,
            produto.produto_imagem,
            produto.produto_codigobarras,
            produto.produto_estoque,
            produto.produto_status,
            produto.produto_preco
          ],
          (err, results) => {
            if (err) reject(err);
            else resolve(results);
          }
        );
      });
    }));

    console.log('Produtos inseridos com sucesso!');
    db.end();
  } catch (error) {
    console.error('Erro ao cadastrar produtos:', error);
    db.end();
  }
}

seedProdutos();
