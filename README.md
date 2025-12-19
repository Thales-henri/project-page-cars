Digital MarketCars — Plataforma de E-commerce Automotivo

O Digital MarketCars é um projeto full stack para gerenciamento e exibição de veículos, incluindo catálogo, detalhes, reserva, autenticação e painel administrativo.
O foco é oferecer uma base sólida para estudos de Node.js + Express + JavaScript Vanilla com upload de imagens e API completa.

📌 Visão Geral

Este projeto contém:

Frontend completo (HTML, CSS e JS)

Backend Node.js com rotas REST

Sistema de login

Cadastro e gerenciamento de veículos

Upload de imagens (uma ou múltiplas)

Reserva de carros

Banco de dados simples baseado em arquivos JSON

🛠 Tecnologias Utilizadas
Frontend

HTML5

CSS3

JavaScript (ES6)

Fetch API

Backend

Node.js

Express

Multer (upload)

Nodemon

Banco JSON

📂 Estrutura do Projeto
/api
 ├── server.js
 ├── database.js
 ├── package.json
 ├── /routes
 │     ├── cadastrarcarros.js
 │     ├── cadastrarusuarios.js
 │     ├── deletarcarros.js
 │     ├── editarcarros.js
 │     ├── efetuarl o g i n.js
 │     ├── listarcarros.js
 │     ├── reservarcarro.js
 │     ├── uploadcarro.js
 │     ├── uploadMultiplasImagens.js
 └── /upload
      (imagens enviadas pelo backend)

Frontend:
 ├── home.html
 ├── carros.html
 ├── carro.html
 ├── login.html
 ├── cadastro_usuarios.html
 ├── cadastro_carros.html
 ├── script.js
 ├── style.css
 ├── style_home.css
 ├── style_carros.css
 ├── style_carro.css

⚙️ Funcionalidades
Usuário

Visualizar lista de carros

Acessar página com detalhes completos

Fazer login

Reservar um veículo

Navegação em layout responsivo

Administrador

Cadastrar novos veículos

Editar veículos existentes

Excluir veículos

Upload de imagens (1 ou múltiplas fotos)

Cadastrar usuários do sistema

📡 API – Endpoints Principais
Autenticação

POST /login
Realiza login no sistema.

Usuários
Método	Endpoint	Descrição
POST	/usuarios/cadastrar	Cadastra um novo usuário
Carros
Método	Endpoint	Descrição
GET	/carros/listar	Lista todos os carros
GET	/carros/:id	Obtém dados de um único carro
POST	/carros/cadastrar	Cadastra novo carro
PUT	/carros/editar/:id	Edita informações do carro
DELETE	/carros/deletar/:id	Remove um carro
Upload
Método	Endpoint	Descrição
POST	/upload/single	Upload de uma imagem
POST	/upload/multiple	Upload de múltiplas imagens
▶️ Como Executar
1. Iniciar o Backend
cd api
npm install
npm start


O servidor ficará disponível em:

http://localhost:3004

2. Abrir o Frontend

Basta abrir o arquivo:

home.html


ou usar uma extensão como Live Server no VSCode.

🧭 Roadmap (Melhorias Planejadas)

Implementar JWT no login

Criar dashboard administrativo

Sistema de carrinho de compras

Histórico de reservas

Tema escuro (dark mode)

Deploy completo (API + Frontend)

📷 Screenshots (Opcional)


imagens:


 Home
     <img width="1900" height="866" alt="image" src="https://github.com/user-attachments/assets/73ae3007-f2f8-4e4e-ad3e-1d2efb07d5fb" />
 Carros  
   <img width="1896" height="864" alt="image" src="https://github.com/user-attachments/assets/b0a5bb2c-b3c9-4486-b006-9348d7c24001" />
 Login
   <img width="1919" height="860" alt="image" src="https://github.com/user-attachments/assets/46da4d24-5d54-43b7-8cd1-1cc0231acaa5" />
 Cadastro
   <img width="1902" height="860" alt="image" src="https://github.com/user-attachments/assets/b9d21e6d-4fd0-4641-9324-a7286f7e502a" />


🤝 Contribuição

Contribuições são bem-vindas.


