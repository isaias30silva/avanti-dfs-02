# 📚 ${\color{#0162B3} \mathsf{SkillMatch}}$: O Ensino ao Seu Alcance.

![Status](https://img.shields.io/badge/Status-em_desenvolvimento-orange)
![License](https://img.shields.io/badge/License-proprietary-darkred)

## 📌 Introdução

O **SkillMatch** é um **Banco de Trocas de Conhecimento** desenvolvido como aplicação web para o curso de **Desenvolvimento Full Stack** da **Escola Atlântico Avanti**.

A plataforma surge como uma solução para a dificuldade enfrentada por pessoas que desejam aprender novas habilidades sem recursos financeiros, conectando-as a indivíduos dispostos a compartilhar seus conhecimentos de forma colaborativa e gratuita. O objetivo é democratizar o acesso ao aprendizado através da tecnologia.

---

## ⚠️ Back-end necessário

O SkillMatch utiliza uma **API REST** robusta para o gerenciamento de dados e autenticação.

🔗 **Link para o Back-end:** [SkillMatch API](https://github.com/LucasCavalheiro21/avanti-dfs-02.git)

---

## ❓ Problematização

Atualmente, a troca de conhecimentos ocorre de forma desorganizada em grupos de mensagens ou redes sociais. Isso gera:

* ❌ Falta de centralização das informações;
* ❌ Dificuldade de filtrar conteúdos específicos (por nível ou categoria);
* ❌ Perda de histórico das ofertas disponíveis;
* ❌ Comunicação ineficiente entre mentor e aluno.

Nossa solução visa **estruturar** essa conexão.

---

## 🎯 Objetivos

### Objetivo Geral

Desenvolver uma aplicação web funcional (Full Stack) que permita o **cadastro, visualização e gerenciamento** de ofertas de conhecimento.

### Objetivos Específicos

* ✅ **Cadastro de Usuários:** Registrar pessoas dispostas a compartilhar conhecimento.
* ✅ **Gestão de Ofertas:** Criar, editar e remover ofertas de ensino.
* ✅ **Busca Inteligente:** Filtrar conhecimentos por categoria e nível de dificuldade.
* ✅ **Interface Amigável:** Design intuitivo desenvolvido em ReactJS.

---

## ⚙️ Funcionalidades da Interface

O SkillMatch foi projetado para oferecer uma experiência fluida e intuitiva:

1.  **Navegação Inteligente:** Sistema de rotas dinâmicas para alternar entre a vitrine de conhecimentos e os formulários de cadastro
   
2.  **Filtros em Tempo Real:** Motores de busca que permitem encontrar mentores por categoria ou nível de conhecimento instantaneamente.
  
3.  **Design Responsivo:** Interface totalmente adaptável para dispositivos móveis e desktop, desenvolvida com TailwindCSS.
   
4.  **Integração em Tempo Real:** Comunicação via Axios com a API, garantindo que os dados exibidos estejam sempre atualizados.

5. **Feedback ao Usuário:** Notificações e modais que confirmam ações de sucesso ou alertam sobre erros de preenchimento.

---

## 🛠️ Stacks e Tecnologias

![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React DOM](https://img.shields.io/badge/React_DOM-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-005571?style=for-the-badge&logo=api&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

---

## 🚀 Como rodar o projeto

### 🔧 Instalação e Configuração

#### 1. Clone o repositório

No terminal, navegue até a pasta onde deseja salvar o projeto e execute:

```bash
git clone https://github.com/isaias30silva/avanti-dfs-02.git
```

#### 2. Acesse a pasta do projeto

Entre na pasta raiz do repositório clonado:

```bash
cd avanti-dfs-02
```

#### 3. Acesse o diretório do Front-End

As configurações do servidor estão na pasta Front-End. Navegue até ela:

```bash
cd frontend
```

#### 4. Instale as dependências

Execute o comando abaixo para instalar todas as bibliotecas necessárias listadas no package.json:

```bash
npm install
```

#### 4. Executando o Projeto

Com tudo configurado, inicie o servidor:

```bash
npm run dev
```

Acesse SkillMatch em: http://localhost:5173

---

## 👥 Equipe de Desenvolvimento

[@Lucas Cavalheiro](https://github.com/LucasCavalheiro21)
- Desenvolvimento de motores de filtragem dinâmica para otimizar a localização de registros e a experiência de busca na aplicação.
- Implementação da lógica de navegação e integração dos botões de ação (Edição/Exclusão) com as rotas de formulário.
- Responsável pela manutenção e estruturação do arquivo README, garantindo clareza na comunicação técnica e das contribuições.

[@Isaias Menezes Silva](https://github.com/isaias30silva)
- Inicialização do repositório frontend e configuração do Axios, incluindo a definição da BaseURL e interceptores para comunicação com a API REST.
- Configuração do sistema de roteamento dinâmico da aplicação e implementação da estrutura base das páginas principais (Home e Cadastro).

[@Matheus da Silva Carvalho](https://github.com/mc4rvalho)
- Desenvolvimento dos módulos de criação, edição e exclusão, incluindo a implementação de regras de validação de campos e manipulação de estado.
- Implementação de lógica para exibição controlada de usuários na Home Page, utilizando componentes de carrossel/slider para otimização de espaço e performance.

[@Pedro Fernandes](https://github.com/pedrofernandesx)
- Criação do componente de "Card" para ofertas, garantindo a exibição dinâmica de metadados e a consistência visual.
- Implementação de geradores de avatares aleatórios e ajustes de responsividade nos componentes para garantir a visualização em múltiplos dispositivos.

[@Giselle Thamyris Oliveira de Morais](https://github.com/giswolfie)
- Responsável pela concepção visual, definição da paleta de cores, tipografia e layout de todas as páginas, garantindo a fidelidade visual e usabilidade.
- Implementação de componentes de feedback (modais, loaders ou notificações) para melhorar a comunicação do sistema com o usuário.

---

## © Direitos Autorais

SkillMatch é propriedade intelectual da **Equipe 2** de desenvolvimento do Projeto DFS-2026.1 da **Escola Atlântico Avanti**.
**Todos os direitos reservados.** É proibida a cópia, redistribuição ou uso comercial sem autorização expressa dos autores.