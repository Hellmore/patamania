# 🐾 PataMania E-commerce

Backend do e-commerce **PataMania**, feito em Node.js.

## 🚀 Como rodar

1. **Clone o repositório**
   
2. **Instale as dependências (pasta node_modules):**
- `npm install`

3. **Crie um arquivo .env na raiz do projeto com as informações do banco (seguindo as configurações do Aiven no MySQL Workbench):**
- `DB_HOST` =patamania-patamania.k.aivencloud.com
- `DB_PORT` =25687
- `DB_USER` =avnadmin
- `DB_PASSWORD` =sua_senha_aqui
- `DB_NAME` = patamania
- `DB_SSL_CA` =./ca.pem

4. **Coloque o arquivo `ca.pem` na raiz do projeto**

5. **Inicie o projeto:**
 - `npm run dev`


# ⚠️ Importante!
### NÃO subir a pasta `node_modules`, o arquivo `.env` e o arquivo `ca.pem` para o repositório!
Esses itens já devem estar fora das mudanças rastreadas pelo git.
