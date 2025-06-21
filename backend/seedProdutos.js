const db = require('./src/utils/db');

const produtos = [
  {
    produto_nome: 'Ração Premium Cães Adultos',
    produto_tipo: 'PERECIVEL',
    produto_tamanho: 'G',
    produto_composicao: 'Proteína animal, vegetais',
    produto_marca: 'PetLife',
    produto_lote: 101,
    produto_fabricante: 'NutriPet Indústria',
    produto_origem: 'Nacional',
    produto_instrucoes: 'Manter em local seco e fresco',
    produto_validade: '2025-12-31',
    produto_imagem: 'https://exemplo.com/imagens/racao.jpg',
    produto_codigobarras: '7891234567890',
    produto_estoque: 50,
    produto_status: 'DISPONIVEL',
    produto_preco: 129.90
  },
  {
    produto_nome: 'Coleira Antipulgas',
    produto_tipo: 'NAO PERECIVEL',
    produto_tamanho: 'M',
    produto_composicao: 'Plástico, substância ativa',
    produto_marca: 'PataProtect',
    produto_lote: 102,
    produto_fabricante: 'Segurança Pet Ltda',
    produto_origem: 'Importado',
    produto_instrucoes: 'Ajustar no pescoço do animal',
    produto_validade: '2026-01-15',
    produto_imagem: 'https://exemplo.com/imagens/coleira.jpg',
    produto_codigobarras: '7890987654321',
    produto_estoque: 20,
    produto_status: 'DISPONIVEL',
    produto_preco: 45.00
  },
  {
    produto_nome: 'Shampoo Neutro',
    produto_tipo: 'NAO PERECIVEL',
    produto_tamanho: 'P',
    produto_composicao: 'Água, essência floral',
    produto_marca: 'PetClean',
    produto_lote: 103,
    produto_fabricante: 'Higiene Animal S/A',
    produto_origem: 'Nacional',
    produto_instrucoes: 'Aplicar no banho',
    produto_validade: '2025-08-10',
    produto_imagem: 'https://exemplo.com/imagens/shampoo.jpg',
    produto_codigobarras: '7895678901234',
    produto_estoque: 30,
    produto_status: 'ESGOTADO',
    produto_preco: 28.50
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
