const request = require('supertest');
const app = require('../../app');
const db = require('../../src/utils/db');

describe('Testes do CRUD de Produtos', () => {
    
    let produtoIdCriado; 

    it('Deve cadastrar um novo produto', async () => {
        const response = await request(app)
            .post('/produtos/cadastro')
            .send({
                produto_nome: 'Ração Premium para Gatos',
                produto_tipo: 'PERECIVEL',
                produto_tamanho: 'G',
                produto_composicao: 'Carne e vegetais',
                produto_marca: 'Whiskas',
                produto_lote: '123456',
                produto_fabricante: 'PetFoods Ltda',
                produto_origem: 'Brasil',
                produto_instrucoes: 'Armazenar em local seco e consumir em até 6 meses depois de aberto',
                produto_validade: '2025-12-31',
                produto_codigobarras: '789456123',
                produto_estoque: 50,
                produto_status: 'DISPONIVEL',
            });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Produto cadastrado com sucesso!');

        const lista = await request(app).get('/produtos/lista');
        const produtoCriado = lista.body.find(p => p.produto_nome === 'Ração Premium para Gatos');
        produtoIdCriado = produtoCriado ? produtoCriado.produto_id : null;

        expect(produtoIdCriado).toBeDefined();
    });

    it('Deve listar todos os produtos', async () => {
        const response = await request(app).get('/produtos/lista');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Deve buscar o produto pelo ID', async () => {
        const response = await request(app).get(`/produtos/lista/${produtoIdCriado}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('produto_id', produtoIdCriado);
    });

    it('Deve atualizar o produto pelo ID', async () => {
        const response = await request(app)
            .put(`/produtos/atualizar/${produtoIdCriado}`)
            .send({
                produto_nome: 'Ração Premium para Gatos Atualizada',
                produto_tipo: 'PERECIVEL',
                produto_tamanho: 'M',
                produto_composicao: 'Carne, vegetais, vitaminas',
                produto_marca: 'PetTop',
                produto_lote: '123456',
                produto_fabricante: 'PetFLovers Ltda',
                produto_origem: 'Brasil',
                produto_instrucoes: 'Armazenar em local seco',
                produto_validade: '2026-12-31',
                produto_codigobarras: '789456123',
                produto_estoque: 60,
                produto_status: 'DISPONIVEL',
            });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Produto atualizado com sucesso!');
    });

    it('Deve deletar o produto pelo ID', async () => {
        const response = await request(app).delete(`/produtos/deletar/${produtoIdCriado}`);

        expect(response.status).toBe(200);
        expect(response.text).toBe('Produto deletado com sucesso!');
    });

    it('Deve retornar 404 ao buscar produto deletado', async () => {
        const response = await request(app).get(`/produtos/lista/${produtoIdCriado}`);

        expect(response.status).toBe(404);
        expect(response.text).toBe('Produto não encontrado.');
    });

    afterAll(() => {
        db.end(); 
    });
});