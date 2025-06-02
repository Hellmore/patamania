# 🐾 PataMania E-commerce

Projeto do e-commerce **PataMania**, feito em Node.js e React.

## 🚀 Como rodar

1. **Clone o repositório:**
- `git clone https://github.com/Hellmore/patamania.git`
   
2. **Instale as dependências (pasta node_modules) na raíz do projeto:**
- `npm install`

3. **Crie um arquivo .env na raiz do projeto com as informações do banco (seguindo as configurações do Aiven no MySQL Workbench):**
- `DB_HOST`=patamania-patamania.k.aivencloud.com
- `DB_PORT`=25687
- `DB_USER`=avnadmin
- `DB_PASSWORD`=nossa_senha_compartilhada_aqui
- `DB_NAME`=patamania
- `DB_SSL_CA`=./ca.pem

4. **Coloque o arquivo `ca.pem` na raiz do projeto;**

5. **Inicie o back-end do projeto:**
 - `npm run dev`

   Se estiver tudo certo, deve aparecer algo como no terminal:
	"Servidor rodando na porta 3001!".

6. **Inicie o front-end do projeto:**
 - `npm start`

   Se estiver tudo certo, o navegador deve abrir o projeto automaticamente (na porta 3000).

# ⚠️ Importante!
### NÃO subir a pasta `node_modules`, o arquivo `.env` e o arquivo `ca.pem` para o repositório!
Esses itens já devem estar fora das mudanças rastreadas pelo git.
